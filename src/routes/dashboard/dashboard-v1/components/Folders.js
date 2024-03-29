import React, { Component, Fragment } from 'react';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import { Media } from 'reactstrap';
import IconButton from 'material-ui/IconButton';
import axios from 'axios';
import { connect } from "react-redux";
import { CircularProgress } from 'material-ui/Progress';
import update from 'react-addons-update';
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import Button from 'material-ui/Button';
import Dialog, { DialogActions, DialogContent, DialogContentText, DialogTitle, } from 'material-ui/Dialog';
import Snackbar from 'material-ui/Snackbar';
import Avatar from 'material-ui/Avatar';
import moment from 'moment';
import { Route, withRouter } from 'react-router-dom';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import { Collapse } from 'reactstrap';
import { Player, BigPlayButton, ControlBar } from 'video-react';
import GridList, { GridListTile, GridListTileBar } from 'material-ui/GridList';
// page title bar
import PageTitleBar from '../../../../components/PageTitleBar/PageTitleBar';
import Editar from '../../../../components/editar/Editar';
import DatePicker, {registerLocale} from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
// intl messages
import IntlMessages from '../../../../util/IntlMessages';
import { NotificationManager } from 'react-notifications';

// rct card box
import RctCollapsibleCard from '../../../../components/RctCollapsibleCard/RctCollapsibleCard';

// app config
import AppConfig from '../../../../constants/AppConfig';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import Dropzone from 'react-dropzone';
import { WithContext as ReactTags } from 'react-tag-input';
import ModalTag from '../../../../components/ModalTag/ModalTag';
import Wrapper from '../../../components/utils/Wrapper';
import DivFocus from '../../../components/utils/DivFocus';
import esCl from 'date-fns/locale/es';
registerLocale('es', esCl);


// redux action
import {
  getUserDetails,
  getUserById,
  getFolders,
  createFolder,
  cambiarNombreObject,
  daleteObject,
  subirArchivo,
  addFavoritos,
  daleteFavoritos,
  getFavoritos,
  uploadMultipleFile,
  getObjectsByHideID,
  uploadMultipleFileDescription,
  compartirDashboard,
  moveDashboard,
  editObjectFolder
} from '../../../../actions';

import fileExtension from 'file-extension';

let id = 0;

function createData(num, contrato, estado, monto, estadoPago) {
  id += 1;
  return { id, num, contrato, estado, monto, estadoPago };
}

const data = [
  createData(1, '1111-01', 'Pendiente', '$ 500.000', 'Si'),
  createData(2, '1111-02', 'Pagado', '$ 800.000', 'Si'),
  createData(3, '1111-03', 'Atrasado', '$ 600.000', 'Si')
];

const styleDragFile = {
  'position': 'relative',
  'width': '100%',
  'height': '80px',
  'border-width': '2px',
  'border-color': 'rgb(102, 102, 102)',
  'border-style': 'dashed',
  'border-radius': '5px'
}

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const style = {
  marginTop: '-12rem'
};


const delimiters = [KeyCodes.comma, KeyCodes.enter];

class Folders extends Component {

  constructor() {
    super();
    this.state = {
      copyRight: 'free',
      startDate: new Date(),
      filePDF: [],
      selectObject: '-1',
      isAdmin: false,
      files: [],
      addNewCustomerForm: false,
      editCustomerModal: false,
      archivoModal: false,
      editCustomer: null,
      selectedDeletedCustomer: null,
      alertDialog: false,
      file: '',
      imagePreviewUrl: '',
      pdfPreviewUrl: '',
      nombreCliente: '',
      nombreFolder: '',
      collapse: '-1',
      posicion: -1,
      tipoObject: '',
      urlVideo: '',
      author: '',
      marginLeftCollap: '',
      addNewCustomerDetails: {
        email: '',
        password: '',
        name: '',
        role: '',
        workspace: '',
        clietntOwner: '',
        passwordRepeat: '',
        passInvalid: false
      },
      tags: [],
      suggestions: [],
      correoCompartir: '',
      idObjectCompartir: '',
      isMoveObject: false,
      isOpenModalTag: false,
      isOpenCollapse : true,
      isfavorite:'text-white',
      isLoadingCollapse:true
    }
    this.handleSubmitAdd = this.handleSubmitAdd.bind(this);
    this.handleSubmitEdit = this.handleSubmitEdit.bind(this);
    this.handleSubmitSubir = this.handleSubmitSubir.bind(this);
    this.handleSubmitCompartir = this.handleSubmitCompartir.bind(this);



    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
    this.handleTagClick = this.handleTagClick.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);

  }

  handleClickEditObject = (object) => {
    object.from = "folders";
    
    this.setState({ objectoEdit: object });

    this.props.editObjectFolder();
  }
  handleTagClick = (index) => {

    console.log('The tag at index ' + index + ' was clicked');
  }
  handleDelete = (i) => {
    console.log('handleDelete');
    const { tags } = this.state;
    this.setState({
      tags: tags.filter((tag, index) => index !== i),
    });
  }

  handleAddition = (tag) => {
    console.log('handleAddition');

    this.setState(state => ({ tags: [...state.tags, tag] }));
  }

  handleDrag = (tag, currPos, newPos) => {
    console.log('handleDrag');

    const tags = [...this.state.tags];
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    this.setState({ tags: newTags });
  }

  componentWillMount() {
    //this.props.getFavoritos();
    this.props.getFolders();
    //this.props.getUserDetails();

    const moveObject = localStorage.getItem('moveObject');
    const moveObjectJson = JSON.parse(moveObject);
    var isMoveObject = false;
    if(moveObjectJson){
      isMoveObject = true;
    }


    const clienteSelect = localStorage.getItem('clienteSelect');
    const clienteSelectJson = JSON.parse(clienteSelect);
    var tipoUsuario = localStorage.getItem('tipoUsuario');
    var isAdmin = false;
    if (tipoUsuario === 'admin') {
      isAdmin = true;
    }
    if (clienteSelectJson) {
      this.setState({ nombreCliente: clienteSelectJson.name, isAdmin: isAdmin,isMoveObject : isMoveObject });

    } else {
      this.setState({ nombreCliente: 'Bunkey', isAdmin: isAdmin, isMoveObject: isMoveObject });

    }


    /*  setTimeout(() => {
       const { items} = this.props;
       console.log('items',items);
       this.props.getUserById(items._id);
   }, 1000);*/
  }


  onAddCarpeta = () => {
    this.setState({
      editCustomerModal: true,
      addNewCustomerForm: true,
      editCustomer: null,
      addNewCustomerDetails: {
        email: '',
        password: '',
        name: '',
        role: 'client',
        workspace: '',
        clietntOwner: '',
        passwordRepeat: '',
        passInvalid: false
      }

    });


  }



  abrirCompartir = (n) => {
    console.log('abrirCompartir', n);
    this.setState({
      compartirModal: true,
      correoCompartir: '',
      idObjectCompartir: n._id
    });


  }


  cambiarAvatar = () => {
    console.log('ddd');
    this.setState({
      archivoModal: true,
      addNewCustomerForm: true,
      editCustomer: null,
      addNewCustomerDetails: {
        email: '',
        password: '',
        name: '',
        role: 'client',
        workspace: '',
        clietntOwner: '',
        passwordRepeat: '',
        passInvalid: false
      },
      tags: [],
      suggestions: [],
      files: [],
      copyRight: 'free',
      startDate: new Date(),
      filePDF: [],
      files: [],
      imagePreviewUrl: '',
      pdfPreviewUrl: ''
    });

    // this.props.changePassword();
  }

  moverObject = () => {
    console.log('moverObject');

    this.props.moveDashboard();


    this.setState({ isMoveObject: false });
    
  }

  handleSubmitEdit = (event) =>{
    event.preventDefault();
    this.onSubmitCustomerEditDetailForm();
  }
  handleSubmitAdd = (event) => {
    event.preventDefault();
    this.onSubmitAddNewCustomerForm();
  }


  handleSubmitSubir = (event) => {
    event.preventDefault();
    this.onSubmitAddArchiveForm();
  }


  handleSubmitCompartir = (event) => {
    event.preventDefault();
    this.onSubmitCompartirForm();
  }

  changeName = (name) => {
    this.setState({ author:name });
  }

  onEditCustomer = (customer) => {
    this.setState({ editCustomerModal: true, editCustomer: customer, addNewCustomerForm: false });
  }


  handleClickChangeName = (folder) => {
    console.log('handleClickChangeName', folder);
    this.onEditCustomer(folder);
    // this.props.cambiarNombreObject(folder, 'test');

  }

  handleClickMove = (folder) => {
   
    localStorage.setItem("moveObject", JSON.stringify(folder));
    NotificationManager.success('Selecciona la ruta en "acción" donde dejarás tu archivo!');
    this.setState({ isMoveObject: true });

  }


  handleClickFavoritos = (folder) => {

    console.log('click favorite');
    /** checking if the object exists in favorites */
    let favorites = JSON.parse(localStorage.getItem('objectFavorites'));

    if((favorites)&&(folder._id == favorites._id || (favorites.children && favorites.children.find(x => x._id == folder._id)))){
      this.props.daleteFavoritos(folder);
      this.setState({isfavorite:'text-white'})
    }else{
      this.props.addFavoritos(folder);
      this.setState({isfavorite:'text-yellow'})
    }

  }


  deleteCustomer = () => {
    this.setState({ alertDialog: false });

    console.log('this.state.selectedDeletedCustomer', this.state.selectedDeletedCustomer);
    this.props.daleteObject(this.state.selectedDeletedCustomer);




  }

  // close alert
  handleClose = () => {
    console.log('handleClose');
    this.setState({ alertDialog: false });
  }

  onSubmitCustomerEditDetailForm = () => {
    const { editCustomer } = this.state;
    console.log('editCustomer', editCustomer);
    if (editCustomer.name !== '') {
      this.setState({ editCustomerModal: false });
      console.log('editCustomer', editCustomer);
      this.props.cambiarNombreObject(editCustomer);


    }
  }
  onSubmitAddNewCustomerForm = () => {
    const { addNewCustomerDetails } = this.state;
    if (addNewCustomerDetails.name !== '') {
      this.setState({ editCustomerModal: false });
      console.log('addNewCustomerDetails', addNewCustomerDetails);
      this.props.createFolder(addNewCustomerDetails);

    }
  }





  onSubmitCompartirForm = () => {

    console.log('idObjectCompartir', this.state.idObjectCompartir);
    console.log('correoCompartir', this.state.correoCompartir);

    var objeto = {
      'idObjectCompartir': this.state.idObjectCompartir,
      'correoCompartir': this.state.correoCompartir
    }
    this.props.compartirDashboard(objeto);

    this.setState({
      compartirModal: !this.state.compartirModal
    });
  }


  onSubmitAddArchiveForm = () => {
    const { addNewCustomerDetails } = this.state;
    console.log('this.state.files', this.state.files);
    console.log('copyRight', this.state.copyRight);
    console.log('tags', this.state.tags);


    var arrTags = [];
    for (var i = 0; i < this.state.tags.length; i++) {

      arrTags.push(this.state.tags[i].text);
    }

    console.log('arrTags', arrTags);

    if (this.state.files.length > 0) {
      this.setState({ archivoModal: false });

      var objectDec = this.state;

      objectDec.descriptiveTags = arrTags;


      console.log('startDate', this.state.startDate);
      //descriptiveTags
      this.props.uploadMultipleFileDescription(objectDec);
      // this.state.files = [];
    }

  }


  onChangeCustomerAddNewForm = (key, value) => {
    this.setState({
      addNewCustomerDetails: {
        ...this.state.addNewCustomerDetails,
        [key]: value
      }
    })
  }

  toggleEditCustomerModal = () => {
    this.setState({
      editCustomerModal: !this.state.editCustomerModal
    });
  }
  toggleArchivoModal = () => {
    this.setState({
      archivoModal: !this.state.archivoModal
    });
  }

  toggleCompartirModal = () => {
    this.setState({
      compartirModal: !this.state.compartirModal
    });
  }


  onChangeCustomerDetails = (key, value) =>{
    this.setState({
      editCustomer: {
        ...this.state.editCustomer,
        [key]: value
      }
    });
  }

  handleClickDelete = (customer) =>{
    this.setState({ alertDialog: true, selectedDeletedCustomer: customer });
  }


  goToImagenes = (n) => {
    console.log('objecto', n);
    localStorage.setItem("folderSelect", JSON.stringify(n));
    const { match, history } = this.props;
    history.push('/app/exlporar');

  }

  handleImageChange = (e) => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
      console.log(this.state);
    }
    reader.readAsDataURL(file)

  }

  handlePDFChange = (e) => {
    e.preventDefault();

    let reader = new FileReader();
    let filePDF = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        filePDF: filePDF,
        pdfPreviewUrl: reader.result
      });
      console.log(this.state);
    }
    reader.readAsDataURL(filePDF)

  }


  mouseOver = (id) => {
    console.log("Mouse over!!!", id);

    this.refs['player' + id].play();
  }
  mouseOut(id) {
    console.log("Mouse out!!!", this.refs['player' + id]);
    this.refs['player' + id].pause();
  }



  onCollapse = (objecto, index) => {

    
    let favorites = JSON.parse(localStorage.getItem('objectFavorites'));

    if((favorites)&&(objecto._id == favorites._id || (favorites.children && favorites.children.find(x => x._id == objecto._id)))){
      this.setState({isfavorite:'text-yellow'})
      console.log('in if favorite');
      
    }else{
      this.setState({isfavorite:'text-white'})
      console.log('in else favorite');
    }

    if (this.state.collapse === objecto.rowCollapse && this.state.posicion === index) {
      if (this.state.tipoObject === 'video') {
        this.refs.playerCollapse.pause();
      }
      this.setState({ collapse: '-1', posicion: -1, tipoObject: 'none' });
    } else {
      this.props.getObjectsByHideID(objecto._id);

      if (objecto.type === 'video') {

        this.setState({ tipoObject: 'image' });


        setTimeout(() => {

          this.setState({ collapse: objecto.rowCollapse, urlVideo: objecto.originalURL, author: this.truncateTitle(objecto.name,objecto.lowQualityURL,objecto.type), marginLeftCollap: objecto.marginLeft, posicion: index, tipoObject: objecto.type, selectObject: objecto });


        }, 100);
      } else {
        this.setState({ collapse: objecto.rowCollapse, urlVideo: objecto.originalURL, author: this.truncateTitle(objecto.name,objecto.lowQualityURL,objecto.type), marginLeftCollap: objecto.marginLeft, posicion: index, tipoObject: objecto.type, selectObject: objecto });

      }

      setTimeout(() => {
        console.log('objecto[index].rowCollapse', objecto.rowCollapse);
        this.refs[objecto.rowCollapse].scrollIntoView({ block: 'center', behavior: 'smooth' });

      }, 500);


    }
    this.setState({isOpenCollapse: false})
  }

  closeCollapse = () => {
    console.log('close');
    

      if (this.state.tipoObject === 'video') {
        this.refs.playerCollapse.pause();
      }
  
      this.setState({ collapse: '-1', posicion: -1, tipoObject: 'none', isOpenCollapse: false, isfavorite:'text-white' });

  }

  onBack = () => {
    const { imageVideos } = this.props;

    console.log('bkacj imageVideos', imageVideos);

    if (this.state.posicion > 0) {
      var index = this.state.posicion - 1;
      console.log('entra', imageVideos[index].name);
      this.props.getObjectsByHideID(imageVideos[index]._id);

      if (imageVideos[index].type === 'video') {

        this.setState({ tipoObject: 'image' });


        setTimeout(() => {

          this.setState({ collapse: imageVideos[index].rowCollapse, urlVideo: imageVideos[index].originalURL, author: imageVideos[index].name, marginLeftCollap: imageVideos[index].marginLeft, posicion: index, tipoObject: imageVideos[index].type, selectObject: imageVideos[index] });


        }, 100);
      } else {
        this.setState({ collapse: imageVideos[index].rowCollapse, urlVideo: imageVideos[index].originalURL, author: imageVideos[index].name, marginLeftCollap: imageVideos[index].marginLeft, posicion: index, tipoObject: imageVideos[index].type, selectObject: imageVideos[index] });

      }


      setTimeout(() => {
        this.refs[imageVideos[index].rowCollapse].scrollIntoView({ block: 'center', behavior: 'smooth' });

      }, 500);

    }

  }
  onNext = () => {
    const { imageVideos } = this.props;
    console.log('next imageVideos', imageVideos);

    if (imageVideos.length - 1 > this.state.posicion) {



      var index = this.state.posicion + 1;
      console.log('next position',index);
      

      console.log('entra', imageVideos[index].name);
      this.props.getObjectsByHideID(imageVideos[index]._id);
      if (imageVideos[index].type === 'video') {

        this.setState({ tipoObject: 'image' });


        setTimeout(() => {

          this.setState({ collapse: imageVideos[index].rowCollapse, urlVideo: imageVideos[index].originalURL, author: imageVideos[index].name, marginLeftCollap: imageVideos[index].marginLeft, posicion: index, tipoObject: imageVideos[index].type, selectObject: imageVideos[index] });


        }, 100);
      } else {
        this.setState({ collapse: imageVideos[index].rowCollapse, urlVideo: imageVideos[index].originalURL, author: imageVideos[index].name, marginLeftCollap: imageVideos[index].marginLeft, posicion: index, tipoObject: imageVideos[index].type, selectObject: imageVideos[index] });

      }



      setTimeout(() => {
        this.refs[imageVideos[index].rowCollapse].scrollIntoView({ block: 'center', behavior: 'smooth' });
      }, 500);


    }

  }

  onDrop = (files) => {
    console.log('onDrop');
    this.setState({
      files
    });
  }


  onCancel = () =>{
    console.log('onCancel');

    this.setState({
      files: []
    })
  }

  handleChangeDate = (date) => {
   
    this.setState({
      startDate: date
    });
  }

  onShowMore = () => {
    this.setState({
      isOpenModalTag: true
    });
  }

  closeShowMore = () => {
    this.setState({
      isOpenModalTag:false
    })
  }

  truncateTitle = (name,src,type) => {

    let ext = fileExtension(src)
    let title = null;

    if(type!=='folder'){

      if (name.length > 20) {
        title = `${name.substr(0,20)}... .${ext}`
      }else{
        title = `${name}.${ext}`
      }
      
    }else{
      if (name.length > 20) {
        title = `${name.substr(0,20)}..`
      }else{
        title = `${name}`
      }
    }

    return title;

  }

  render() {
    const { items, loading, userById, parents, imageVideos, editarObjetoFolderModal } = this.props;
    const { collapse } = this.state;
    const { urlVideo } = this.state;
    const { posicion } = this.state;
    const { isAdmin } = this.state;
    const { author } = this.state;
    const { copyRight } = this.state;
    const { tags, suggestions } = this.state;
    const { startDate } = this.state;
    const { selectObject } = this.state;
    const { compartirModal } = this.state;
    const { correoCompartir } = this.state;

    const { isMoveObject } = this.state;
    const { objectoEdit } = this.state;
    const { tipoObject } = this.state;
    const { marginLeftCollap } = this.state;
    const { newCustomers, sectionReload, alertDialog, editCustomerModal, addNewCustomerForm, editCustomer, snackbar, successMessage, addNewCustomerDetails, archivoModal } = this.state;

    /** checking if the object exists in favorites */
    let favorites = JSON.parse(localStorage.getItem('objectFavorites'));
    /**Getting tag array */
    let tag = [];
    let truncateTag = [];

    if (selectObject && selectObject.metadata) {
      if (selectObject.metadata.descriptiveTags && selectObject.metadata.audiovisualTags) {

        tag = selectObject.metadata.descriptiveTags.concat(selectObject.metadata.audiovisualTags)
  
      }else if(selectObject.metadata.descriptiveTags && !selectObject.metadata.audiovisualTags){
  
        tag = selectObject.metadata.descriptiveTags
  
      }else{
  
        tag = selectObject.metadata.audiovisualTags
  
      }
    }

    
    if(tag.length > 5){
      truncateTag = tag.slice(0,4);
    }
    
    

    return (


      <div>
  
        <RctCollapsibleCard>
          <div className={'rct-block-title'}>

            <h4 className="titulo-vistas-nombre-cliente"><b>{this.state.nombreCliente}</b></h4>
            <div className="contextual-link">
              <UncontrolledDropdown className="list-inline-item rct-dropdown">
                <DropdownToggle caret nav className="dropdown-group-link">
                  <a href="javascript:void(0)">acción</a>

                </DropdownToggle>
                <DropdownMenu className="mt-15" right>
                  <ul className="list-unstyled mb-0">
                    <li>
                      <a href="javascript:void(0)" onClick={() => this.onAddCarpeta()}>
                        <i className="ti-folder"></i>
                        <IntlMessages id="Crear Carpeta" />
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0)" onClick={() => this.cambiarAvatar()}>
                        <i className="ti-archive"></i>
                        <IntlMessages id="Subir Archivo" />
                      </a>
                    </li>
                    {isMoveObject && 
                    <li>
                    <a href="javascript:void(0)" onClick={() => this.moverObject()}>
                      <i className="ti-arrow-right"></i>
                      <IntlMessages id="Mover aquí" />
                    </a>
                  </li>
                    }
                    
                  </ul>
                </DropdownMenu>
              </UncontrolledDropdown>

            </div>
          </div>


          {loading &&
            <div className="d-flex justify-content-center loader-overlay">
              <CircularProgress />
            </div>
          }

          <div className="gallery-wrapper">
            <div className="row row-eq-height text-center">
              {imageVideos.map((n, index) => {

                let title = this.truncateTitle(n.name,n.lowQualityURL,n.type);

                return n.type ?

                  <div key={index} className="col-sm-3 col-md-3 col-lg-3 col-xl-3 text-white" >
                    <ContextMenuTrigger id={index + 'imagevideo-home'} holdToDisplay={1000}>

                      {n.type === 'image' &&

                        <GridListTile key={index} onClick={() => this.onCollapse(n, index)}>
                          <div className="heigth-div-objetos">
                            <img className="image-colapse-max-width-height" src={n.lowQualityURL} alt={n.name} />
                          </div>
                        </GridListTile>

                      }
                      {
                        n.type === 'folder' &&
                          <GridListTile key={index} onClick={() => this.goToImagenes(n)}>
                            <div className="heigth-div-objetos">
                              <img className="image-colapse-max-width-height" src={require('../../../../assets/img/folder2.jpg')}/>
                            </div>
                          </GridListTile>
                      }
                      {n.type === 'video' &&
                        <GridListTile key={index} onClick={() => this.onCollapse(n, index)} onMouseOver={() => this.mouseOver(index)} onMouseOut={() => this.mouseOut(index)}>
                          <div className="heigth-div-objetos" >
                            <Player className="border-object-div" ref={'player' + index} fluid={false} width={'100%'} height={184} muted={true}>
                              <BigPlayButton position="center" />
                              <ControlBar disableDefaultControls={true} />
                              <source src={n.lowQualityURL} />
                            </Player>

                          </div>

                        </GridListTile>

                      }
                      {
                        n.type === 'document' &&
                          <GridListTile key={index}>
                            <div className="heigth-div-objetos">
                            <img className="image-colapse-max-width-height" src={require('../../../../assets/img/file.png')} alt={n.name} onClick={() => this.onCollapse(n, index)} />
                            </div>
                          </GridListTile>
                      }
                      
                      <p className="color-texto-carpetas-explorar">{title}</p>

                    </ContextMenuTrigger>

                    {
                      (n.type !== 'folder') ? 
                      <ContextMenu id={index + 'imagevideo-home'} className="click-derecho-bunkey color-texto-carpetas-explorar">
                      <MenuItem onClick={() => { window.open(n.originalURL, '_blank') }} data={{ item: { index } }}>
                        <i className="zmdi zmdi-download color-header-bunkey padding-click-derecho padding-top-click-derecho"></i>
                        <span className="padding-click-derecho">Descargar </span>
                      </MenuItem>
                      <MenuItem onClick={() => this.abrirCompartir(n)}>
                        <i className="zmdi zmdi-share color-header-bunkey padding-click-derecho padding-top-click-derecho"></i>
                        <span className="padding-click-derecho">Compartir</span>
                      </MenuItem>
                      <MenuItem onClick={() => this.handleClickEditObject(n)} data={{ item: 'item 2' }}>
                        <i className="zmdi zmdi-edit color-header-bunkey padding-click-derecho padding-top-click-derecho"></i>
                        <span className="padding-click-derecho">Editar</span>
                      </MenuItem>

                      <MenuItem onClick={() => this.handleClickMove(n)} data={{ item: 'item 2' }}>
                        <i className="zmdi zmdi-long-arrow-tab color-header-bunkey padding-click-derecho padding-top-click-derecho"></i>
                        <span className="padding-click-derecho">Mover</span>
                      </MenuItem>

                      <MenuItem onClick={() => this.handleClickFavoritos(n)} data={{ item: 'item 2' }}>
                        <i className="zmdi zmdi-star-outline color-header-bunkey padding-click-derecho padding-top-click-derecho"></i>
                        <span className="padding-click-derecho">Agregar a favoritos</span>
                      </MenuItem>
                      <MenuItem onClick={this.handleClick} data={{ item: 'item 2' }}>
                        <div className="line-click-derecho  padding-top-click-derecho"></div>

                      </MenuItem>
                      {isAdmin &&
                        <MenuItem onClick={() => this.handleClickDelete(n)} data={{ item: 'item 2' }}>
                          <i className="zmdi ti-trash color-header-bunkey padding-click-derecho padding-top-click-derecho padding-bottom-click-derecho"></i>
                          <span className="padding-click-derecho">Eliminar</span>
                        </MenuItem>
                      }
                    </ContextMenu>
                    :
                    <ContextMenu id={index + 'imagevideo-home'} className="click-derecho-bunkey color-texto-carpetas-explorar">

                      <MenuItem onClick={() => this.abrirCompartir(n)} data={{ item: 'item 2' }}>
                        <i className="zmdi zmdi-share color-header-bunkey padding-click-derecho padding-top-click-derecho"></i>
                        <span className="padding-click-derecho">Compartir</span>
                      </MenuItem>
                      <MenuItem onClick={() => this.handleClickChangeName(n)} data={{ item: 'item 2' }}>
                        <i className="zmdi zmdi-edit color-header-bunkey padding-click-derecho padding-top-click-derecho"></i>
                        <span className="padding-click-derecho">Cambiar Nombre</span>
                      </MenuItem>

                      <MenuItem  onClick={() => this.handleClickMove(n)} data={{ item: 'item 2' }}>
                        <i className="zmdi zmdi-long-arrow-tab color-header-bunkey padding-click-derecho padding-top-click-derecho"></i>
                        <span className="padding-click-derecho">Mover</span>
                      </MenuItem>

                      <MenuItem onClick={() => this.handleClickFavoritos(n)} data={{ item: 'item 2' }}>
                        <i className="zmdi zmdi-star-outline color-header-bunkey padding-click-derecho padding-top-click-derecho"></i>
                        <span className="padding-click-derecho">Agregar a favoritos</span>
                      </MenuItem>
                      <MenuItem onClick={this.handleClick} data={{ item: 'item 2' }}>
                        <div className="line-click-derecho  padding-top-click-derecho"></div>

                      </MenuItem>
                      {isAdmin &&

                        <MenuItem onClick={() => this.handleClickDelete(n)} data={{ item: 'item 2' }}>
                          <i className="zmdi ti-trash color-header-bunkey padding-click-derecho padding-top-click-derecho padding-bottom-click-derecho"></i>
                          <span className="padding-click-derecho">Eliminar</span>
                        </MenuItem>
                      }

                    </ContextMenu>
                    }

                    {(posicion === index && !n.createRowCollapse) &&
                      <div className={"paddin-center-trinagulo-rows"}>
                        <div className="triangulo-equilatero-bottom"></div>
                      </div>
                    }

                    {/* {n.createRowCollapse &&
                      <DivFocus name={`${n._id}`}
                        current={n}
                      >
                        <Wrapper
                        collapse={collapse}
                        element={n}
                        position={posicion}
                        indexElement={index}
                        clickFavorites={this.handleClickFavoritos}
                        clickEditObject={this.handleClickEditObject}
                        openShared={this.abrirCompartir}
                        tag={tag}
                        truncateTag={truncateTag}
                        showMore={this.onShowMore}
                        onBack={this.onBack}
                        onNext={this.onNext}
                        author={this.truncateTitle(author,ext,n.type)}
                        closeCollapse={this.closeCollapse}
                        Style={{display: this.state.isOpenCollape, marginLeft: n.marginLeft}}
                        isfavorite={this.state.isfavorite}
                        isOpenCollapse={this.state.isOpenCollapse}
                        selectedObject={selectObject}
                        type={tipoObject}
                        >
                        </Wrapper>
                      </DivFocus>
 
                    } */}

                    {
                      n.createRowCollapse &&
                      <Collapse style={{display: this.state.isOpenCollape, marginLeft: n.marginLeft}} isOpen={collapse === n.rowCollapse} className="anchoCollapseExplorar padding-top-triangulo-collapse">
                          {(posicion === index && n.createRowCollapse) &&
                            <div className="padding-left-first-row-collapse-triangulo">
                              <div className="triangulo-equilatero-bottom"></div>
                            </div>

                          }

                          <div ref={n.rowCollapse} className="row row-eq-height text-center fondo-videos-seleccionado collapse " id="collapseExample"
                          >

                            <div className="col-sm-2 col-md-1 col-lg-2">
                              <div className="volver-collap-video-image-left">
                                <i onClick={() => this.onBack()} className="zmdi ti-angle-left text-white"></i>

                              </div>

                            </div>
                            <div className="col-sm-6 col-md-5 col-lg-6 zindex-collapse-next-close height-image-colapse-div-col" >
                              
                                {tipoObject === 'image' && collapse === n.rowCollapse &&

                                  <img className="image-colapse-max-width-height" src={urlVideo}></img>

                                }


                                {tipoObject === 'video' && collapse === n.rowCollapse &&

                                  <Player ref="playerCollapse" autoPlay fluid={false} width={'100%'} height={351} >
                                    <BigPlayButton position="center" />
                                    <source  src={selectObject.mediaQualityURL} />
                                  </Player>

                                }
                                {
                                  tipoObject === 'document'  && collapse === n.rowCollapse &&
                                  <img  className="image-colapse-max-width-height" src={require('../../../../assets/img/file.png')}></img>
                                }
                              
                            </div>
                            <div className="col-sm-4 col-md-3 col-lg-4 zindex-collapse-next-close">
                            <div>
                            <i onClick={() => this.closeCollapse()} className="zmdi   ti-close text-white volver-collap-video-image-right-close-aux"></i>
                            <i onClick={() => this.onNext()} className="zmdi   ti-angle-right text-white volver-collap-video-image-right-aux"></i>

                            </div>
                              <div className="fondo-videos-padding-top-desc">
                                <h3 className="text-white">{author}</h3>

                              </div>
                          
                              <div>
                                <b className="text-white"></b>
                                <IconButton onClick={() => this.handleClickEditObject(selectObject)}> <i className="zmdi zmdi-edit text-white"></i></IconButton>
                                <IconButton onClick={() => this.handleClickFavoritos(selectObject)}> <i id="folderFavoriteIcon" className={`zmdi zmdi-star-outline ${this.state.isfavorite}`}></i></IconButton>
                                <IconButton onClick={() => this.abrirCompartir(selectObject)}> <i className="zmdi zmdi-share text-white"></i></IconButton>
                                <IconButton onClick={() => { window.open(selectObject.originalURL, '_blank') }}> <i className="zmdi zmdi-download text-white"></i></IconButton>
                              </div>



                              {selectObject !== '-1' &&
                                <div>


                                  <div>
                                    {
                                      truncateTag.length > 0 && 
                                      <Fragment>
                                      {
                                          truncateTag.map((tags, numTag) => (
                                            <span key={'tags-' + numTag} className="text-white tags-collapse-border"> {tags}</span>
                                          ))
                                          
                                        }
                                        <button type="button" onClick={this.onShowMore} class="btn btn-sm btn-outline-light">Ver más</button>
                                      </Fragment>
                                    }
                                    {
                                      truncateTag.length === 0 && tag.length > 0 && tag.map((tags, numTag) => (
                                        <span key={'tags-' + numTag} className="text-white tags-collapse-border"> {tags}</span>
                                      ))
                                    }
                                  </div>


                                  <div>
                                    {selectObject.metadata.copyRight === 'free' &&
                                      <span className="text-white">Copy Right: Libre</span>
                                    }

                                    {selectObject.metadata.copyRight === 'limited' &&
                                      <span className="text-white">Copy Right: Limitado</span>
                                    }
                                    {selectObject.metadata.copyRight === 'own' &&
                                      <span className="text-white">Copy Right: Propio</span>
                                    }

                                  </div>
                                  <div>
                                    {selectObject.metadata.createdDate &&
                                      <span className="text-white">Fecha de creación: {moment(new Date(selectObject.metadata.createdDate)).format('YYYY-MM-DD')} </span>
                                    }
                                  </div>

                                  {selectObject.metadata.licenseFile &&
                                    <div onClick={() => { window.open(selectObject.metadata.licenseFile, '_blank') }}>
                                      <a href="javascript:void(0)">
                                        Copy Right: CopyRight.pdf  </a>
                                    </div>
                                  }


                                </div>
                              }


                              <div className=" ">


                              </div>

                            </div>

                          </div>
                          </Collapse>
                    }

                  </div>

                  : ''
              })}

            </div>
          </div>

        </RctCollapsibleCard>


        <Dialog
          open={alertDialog}
          onClose={this.handleClose}
        >
          <DialogTitle>{"Estas seguro de eliminarlo?"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Estas seguro de eliminarlo de forma permanente.
                        </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="raised" onClick={this.handleClose} className="btn-danger text-white">
              <IntlMessages id="button.cancel" />
            </Button>
            <Button variant="raised" onClick={() => this.deleteCustomer()} className="btn-primary text-white" autoFocus>
              <IntlMessages id="button.yes" />
            </Button>
          </DialogActions>
        </Dialog>

        {editCustomerModal &&
          <Modal
            isOpen={editCustomerModal}
            toggle={this.toggleEditCustomerModal}
          >
            <ModalHeader toggle={this.toggleEditCustomerModal}>
              {addNewCustomerForm ? 'Crear Carpeta' : 'Cambiar Nombre'}
            </ModalHeader>
            <ModalBody>
              {addNewCustomerForm ?
                <Form id="formAdd" onSubmit={this.handleSubmitAdd}>
                  <FormGroup>
                    <Label for="name">Nombre</Label>
                    <Input
                      autofocus="true"
                      required="true"
                      type="text"
                      name="name"
                      id="name"
                      value={addNewCustomerDetails.name}
                      onChange={(e) => this.onChangeCustomerAddNewForm('name', e.target.value)}
                    />
                  </FormGroup>


                </Form>
                : <Form id="formEdit" onSubmit={this.handleSubmitEdit} >
                  <FormGroup>
                    <Label for="name">Nombre</Label>
                    <Input
                    autofocus="true"
                      required="true"
                      type="text"
                      name="name"
                      id="name"
                      value={editCustomer.name}
                      onChange={(e) => this.onChangeCustomerDetails('name', e.target.value)}
                    />
                  </FormGroup>

                </Form>
              }
            </ModalBody>
            <ModalFooter>
              {addNewCustomerForm ?
                <div>
                  <Button variant="raised" className="btn-danger text-white alert-botton-cancel-margin" onClick={this.toggleEditCustomerModal}><IntlMessages id="button.cancel" /></Button>
                  <Button form="formAdd" type="submit" variant="raised" className="btn-primary text-white"><IntlMessages id="button.add" /></Button>{' '}
                </div>
                : <div><Button variant="raised" className="btn-danger text-white alert-botton-cancel-margin" onClick={this.toggleEditCustomerModal}><IntlMessages id="button.cancel" /></Button>
                  <Button form="formEdit" type="submit" variant="raised" className="btn-primary text-white"><IntlMessages id="button.update" /></Button>{' '}</div>
              }


            </ModalFooter>
          </Modal>
        }

        {archivoModal &&
          <Modal
            isOpen={archivoModal}
            toggle={this.toggleArchivoModal}
            style={{marginTop:'-10%'}}
          >
            <ModalHeader toggle={this.toggleArchivoModal}>
              Subir Archivo
        </ModalHeader>
            <ModalBody>
              <Form id="formSubir" onSubmit={this.handleSubmitSubir} >

                <FormGroup>
                  <div>


                    <ReactTags tags={tags}
                      allowDragDrop={false}
                      suggestions={suggestions}
                      handleDelete={this.handleDelete}
                      handleAddition={this.handleAddition}
                      handleTagClick={this.handleTagClick}
                      delimiters={delimiters}
                      placeholder={'Agregar nuevo tag'}
                      
                    >

                    </ReactTags>
                  </div>
                </FormGroup>


                <FormGroup>
                  <Label for="copyRight:">Copy Right:</Label>
                  <Input type="select"
                    name="copyRight"
                    id="copyRight"
                    required="true"
                    value={copyRight}
                    onChange={(event) => this.setState({ copyRight: event.target.value })}
                  >
                    <option value="free">Libre</option>
                    <option value="limited">Limitado</option>
                    <option value="own">Propio</option>
                  </Input>
                </FormGroup>


                {(copyRight === 'limited' || copyRight === 'own') &&
                  <FormGroup>
                    <Label for="pdfCopy">PDF Copy Right:</Label>
                    <Input required="true" name="pdfCopy" className="fileInput"
                      type="file"
                      accept=".pdf"
                      onChange={(e) => this.handlePDFChange(e)} />
                  </FormGroup>

                }

                <FormGroup>
                  <Label for="startDate">Fecha de creación</Label>
                  <DatePicker  required="true" name="startDate" locale="es" className="input-field date form-control" placeholderText="Fecha de creación"  selected={moment(startDate).format('YYYY-MM-DD')} onChange={this.handleChangeDate}   />

                 
                </FormGroup>

                <section>
                  <div className="dropzone">
                    <Dropzone
                      style={styleDragFile}
                      onDrop={this.onDrop.bind(this)}
                      onFileDialogCancel={this.onCancel.bind(this)}
                    >
                      <p className="padding-10-px">Intente arrastrar algunos archivos aquí o haga click para seleccionar los archivos que desea cargar.</p>
                    </Dropzone>
                  </div>
                  <aside>
                    <h2>Archivos seleccionados</h2>
                    <ul className="padding-10-px">
                      {
                        this.state.files.map(f => <li key={f.name}>{f.name}</li>)
                      }
                    </ul>
                  </aside>
                </section>
              </Form>


            </ModalBody>
            <ModalFooter>

              <div><Button variant="raised" className="btn-danger text-white alert-botton-cancel-margin" onClick={this.toggleArchivoModal}><IntlMessages id="button.cancel" /></Button>
                <Button form="formSubir" type="submit" variant="raised" className="btn-primary text-white"><IntlMessages id="Subir" /></Button>{' '}</div>



            </ModalFooter>
          </Modal>


        }



        {compartirModal &&
          <Modal
            isOpen={compartirModal}
            toggle={this.toggleCompartirModal}
          >
            <ModalHeader toggle={this.toggleCompartirModal}>
              Compartir
        </ModalHeader>
            <ModalBody>
              <Form id="formCompartir" onSubmit={this.handleSubmitCompartir} >

                <FormGroup>
                  <Label for="name">Email</Label>
                  <Input
                  autofocus="true"
                    required="true"
                    type="email"
                    name="correoCompartir"
                    id="correoCompartir"
                    value={correoCompartir}
                    onChange={(event) => this.setState({ correoCompartir: event.target.value })}
                  />
                </FormGroup>



              </Form>


            </ModalBody>
            <ModalFooter>

              <div><Button variant="raised" className="btn-danger text-white alert-botton-cancel-margin" onClick={this.toggleCompartirModal}><IntlMessages id="button.cancel" /></Button>
                <Button form="formCompartir" type="submit" variant="raised" className="btn-primary text-white"><IntlMessages id="Compartir" /></Button>{' '}</div>



            </ModalFooter>
          </Modal>


        }

    {editarObjetoFolderModal &&
      <Editar key="editarExplorar" objectoPending={objectoEdit} changeName={this.changeName}/>

    }

    <ModalTag
      isOpen={this.state.isOpenModalTag}
      toggle={this.closeShowMore}
      Tags={tag}
    >
    </ModalTag>

      </div>
    )
  }
}

// map state to props
const mapStateToProps = ({ dashboard }) => {
  return dashboard;
}

export default withRouter(connect(mapStateToProps, {
  getUserDetails, 
  getUserById, 
  getFolders, 
  createFolder, 
  cambiarNombreObject, 
  daleteObject, 
  daleteFavoritos, 
  subirArchivo, 
  addFavoritos, 
  getFavoritos, 
  uploadMultipleFile, 
  getObjectsByHideID, 
  uploadMultipleFileDescription, 
  compartirDashboard, 
  moveDashboard, 
  editObjectFolder
})(Folders));