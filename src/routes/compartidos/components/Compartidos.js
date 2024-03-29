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
import { Player, BigPlayButton, ControlBar } from 'video-react';
import GridList, { GridListTile, GridListTileBar } from 'material-ui/GridList';
// page title bar
import PageTitleBar from '../../../components/PageTitleBar/PageTitleBar';

// intl messages
import IntlMessages from '../../../util/IntlMessages';

// rct card box
import RctCollapsibleCard from '../../../components/RctCollapsibleCard/RctCollapsibleCard';

// app config
import AppConfig from '../../../constants/AppConfig';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import { Collapse } from 'reactstrap';
import { WithContext as ReactTags } from 'react-tag-input';

import Dropzone from 'react-dropzone';
import fileExtension from 'file-extension';

// redux action
import {
  getObjects,
  createObject,
  cambiarObject,
  removeObject,
  uploadArchivo,
  getObjectsByID,
  agregarFavoritos,
  uploadExplorarMultipleFile,
  getObjectsByHideID,
  uploadExplorarMultipleFileDescription,
  compartirExplorar,
  moveExplorar,
  getCompartidosInvitado,
  getObjectsCompartidosExplore
} from '../../../actions';


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
  'height': '200px',
  'border-width': '2px',
  'border-color': 'rgb(102, 102, 102)',
  'border-style': 'dashed',
  'border-radius': '5px'
}
const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];


class Compartidos extends Component {

  constructor() {
    super()
    this.state = {
      copyRight: 'free',
      startDate: '',
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
      isMoveObject: false
    }
    this.handleSubmitAdd = this.handleSubmitAdd.bind(this);
    this.handleSubmitEdit = this.handleSubmitEdit.bind(this);
    this.handleSubmitSubir = this.handleSubmitSubir.bind(this);
    this.handleSubmitCompartir = this.handleSubmitCompartir.bind(this);


    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
    this.handleTagClick = this.handleTagClick.bind(this);

  }
  moverObject(){
    console.log('moverObject');

    this.props.moveExplorar();


    this.setState({ isMoveObject: false });
    
  }
  handleSubmitCompartir(event) {
    event.preventDefault();
    this.onSubmitCompartirForm();
  }

  toggleCompartirModal = () => {
    this.setState({
      compartirModal: !this.state.compartirModal
    });
  }

  abrirCompartir(n) {
    console.log('abrirCompartir',n);
    this.setState({
      compartirModal: true,
      correoCompartir: '',
      idObjectCompartir: n._id
    });

   
  }
  onSubmitCompartirForm() {
    
    console.log('idObjectCompartir',this.state.idObjectCompartir);
    console.log('correoCompartir',this.state.correoCompartir);

    var objeto = {
      'idObjectCompartir': this.state.idObjectCompartir,
      'correoCompartir': this.state.correoCompartir
    }
    this.props.compartirExplorar(objeto);

    this.setState({
      compartirModal: !this.state.compartirModal
    });
}
  handlePDFChange(e) {
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
  handleTagClick(index) {

    console.log('The tag at index ' + index + ' was clicked');
  }
  handleDelete(i) {
    console.log('handleDelete');
    const { tags } = this.state;
    this.setState({
      tags: tags.filter((tag, index) => index !== i),
    });
  }

  handleAddition(tag) {
    console.log('handleAddition');

    this.setState(state => ({ tags: [...state.tags, tag] }));
  }

  handleDrag(tag, currPos, newPos) {
    console.log('handleDrag');

    const tags = [...this.state.tags];
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    this.setState({ tags: newTags });
  }



  parseUrlstring(query) {
    var vars = query.split("?");
    var query_string = {};
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      var key = decodeURIComponent(pair[0]);
      var value = decodeURIComponent(pair[1]);
      // If first entry with this name
      if (typeof query_string[key] === "undefined") {
        query_string[key] = decodeURIComponent(value);
        // If second entry with this name
      } else if (typeof query_string[key] === "string") {
        var arr = [query_string[key], decodeURIComponent(value)];
        query_string[key] = arr;
        // If third or later entry with this name
      } else {
        query_string[key].push(decodeURIComponent(value));
      }
    }
    return query_string;
  }

  componentWillMount() {
    var query = window.location.href;
    console.log('query', query);
    var qs = this.parseUrlstring(query);
    console.log('qs.webToken', qs.webToken);
    if(qs.webToken){
      
      
      
      this.props.getCompartidosInvitado(qs.webToken);

    }
    
    

    const moveObject = localStorage.getItem('moveObject');
    const moveObjectJson = JSON.parse(moveObject);
    var isMoveObject = false;
    if(moveObjectJson){
      isMoveObject = true;
    }

    var tipoUsuario = localStorage.getItem('tipoUsuario');
    var isAdmin = false;
    if(tipoUsuario === 'admin'){
      isAdmin = true;
    }
    const clienteSelect = localStorage.getItem('clienteSelect');
    const clienteSelectJson = JSON.parse(clienteSelect);
    if (qs.name) {
      this.setState({ nombreCliente: clienteSelectJson.name, nombreFolder: qs.name , isAdmin: isAdmin});

    } else if (clienteSelectJson) {
      const folderSelect = localStorage.getItem('folderSelect');
      var folderSelectJson = JSON.parse(folderSelect);
      if (folderSelectJson.name === 'home') {
        this.setState({ nombreCliente: clienteSelectJson.name, nombreFolder: clienteSelectJson.name , isAdmin: isAdmin, isMoveObject: isMoveObject});

      } else {
        this.setState({ nombreCliente: clienteSelectJson.name, nombreFolder: folderSelectJson.name , isAdmin: isAdmin, isMoveObject: isMoveObject});

      }
      

    } else {
      this.setState({ nombreCliente: 'Compartidos', nombreFolder: 'Compartidos' });

    }
    

  }


  componentWillReceiveProps(nextProps) {

    if (nextProps.location !== this.props.location) {
      console.log('nueva urll!!!!');
      console.log('get folders');
      console.log('get folders2');
      var query = window.location.href;
      console.log('query', query);
      var qs = this.parseUrlstring(query);
      console.log('qs.id', qs.id);
      console.log('qs.name', qs.name);
      if (qs.id) {
        this.props.getObjectsByID(qs.id);

      } else {
        this.props.getObjects();
      }


      const clienteSelect = localStorage.getItem('clienteSelect');
      const clienteSelectJson = JSON.parse(clienteSelect);
      if (qs.name) {
        this.setState({ nombreCliente: clienteSelectJson.name, nombreFolder: qs.name });

      } else if (clienteSelectJson) {
        this.setState({ nombreCliente: clienteSelectJson.name, nombreFolder: clienteSelectJson.name });

      } else {
        this.setState({ nombreCliente: 'Bunkey', nombreFolder: 'Bunkey' });

      }

    }
  }
  onAddCarpeta() {
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

  cambiarAvatar() {
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
      startDate: '',
      filePDF: [],
      files: [],
      imagePreviewUrl: '',
      pdfPreviewUrl: ''
    });

    // this.props.changePassword();
  }

  handleSubmitEdit(event) {
    event.preventDefault();
    this.onSubmitCustomerEditDetailForm();
  }
  handleSubmitAdd(event) {
    event.preventDefault();
    this.onSubmitAddNewCustomerForm();
  }


  handleSubmitSubir(event) {
    event.preventDefault();
    this.onSubmitAddArchiveForm();
  }
  onEditCustomer(customer) {
    this.setState({ editCustomerModal: true, editCustomer: customer, addNewCustomerForm: false });
  }


  handleClickChangeName(folder) {
    console.log('handleClickChangeName', folder);
    this.onEditCustomer(folder);

  }
  handleClickMove(folder) {
   
    localStorage.setItem("moveObject", JSON.stringify(folder));
    this.setState({ isMoveObject: true });
  }
  deleteCustomer() {
    this.setState({ alertDialog: false });

    console.log('this.state.selectedDeletedCustomer', this.state.selectedDeletedCustomer);
    this.props.removeObject(this.state.selectedDeletedCustomer);




  }

  // close alert
  handleClose = () => {
    console.log('handleClose');
    this.setState({ alertDialog: false });
  }

  onSubmitCustomerEditDetailForm() {
    const { editCustomer } = this.state;
    console.log('editCustomer', editCustomer);
    if (editCustomer.name !== '') {
      this.setState({ editCustomerModal: false });
      console.log('editCustomer', editCustomer);
      this.props.cambiarObject(editCustomer);


    }
  }
  onSubmitAddNewCustomerForm() {
    const { addNewCustomerDetails } = this.state;
    if (addNewCustomerDetails.name !== '') {
      this.setState({ editCustomerModal: false });
      console.log('addNewCustomerDetails', addNewCustomerDetails);
      this.props.createObject(addNewCustomerDetails);

    }
  }
  onSubmitAddArchiveForm() {
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


      console.log('startDate',this.state.startDate);
      //descriptiveTags
      this.props.uploadExplorarMultipleFileDescription(objectDec);
      // this.state.files = [];
    }




    //  this.props.uploadExplorarMultipleFile(this.state.files);


  }


  onChangeCustomerAddNewForm(key, value) {
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


  onChangeCustomerDetails(key, value) {
    this.setState({
      editCustomer: {
        ...this.state.editCustomer,
        [key]: value
      }
    });
  }

  handleClickDelete(customer) {
    this.setState({ alertDialog: true, selectedDeletedCustomer: customer });
  }


  goToImagenes = (n) => {
    this.closeCollapse()
    console.log('objecto', n);
    localStorage.setItem("folderSelect", JSON.stringify(n));
    console.log('get folders');
    this.props.getObjectsCompartidosExplore();

    const folderSelect = localStorage.getItem('folderSelect');
    var folderSelectJson = JSON.parse(folderSelect);
    const clienteSelect = localStorage.getItem('clienteSelect');
    const clienteSelectJson = JSON.parse(clienteSelect);
    if (folderSelectJson && clienteSelectJson) {
      console.log('folderSelectJson.name', folderSelectJson.name);
      if (folderSelectJson.name === 'home') {
        this.setState({ nombreCliente: clienteSelectJson.name, nombreFolder: clienteSelectJson.name });

      } else {
        this.setState({ nombreCliente: clienteSelectJson.name, nombreFolder: folderSelectJson.name });

      }


    }

    function Play() {
      console.log('mouse over');
    }

    /*const { match, history } = this.props;
   history.push('/app/exlporar');*/

  }

  handleImageChange(e) {
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

  mouseOver(id) {
    console.log("Mouse over!!!", id);
    this.refs['player' + id].play();
  }
  mouseOut(id) {
    console.log("Mouse out!!!", this.refs['player' + id]);
    this.refs['player' + id].pause();
  }

  handleClickFavoritos(folder) {
    console.log('handleClickFavoritos', folder);
    this.props.agregarFavoritos(folder);


  }

  onCollapse(objecto, index) {
    console.log('objecto', objecto);

    if (this.state.collapse === objecto.rowCollapse && this.state.posicion === index) {
      if (this.state.tipoObject === 'video') {
        this.refs.playerCollapse.pause();
      }
      this.setState({ collapse: '-1', posicion: -1, tipoObject: 'none' });
    } else {

      
      if (objecto.type === 'video') {

        this.setState({ tipoObject: 'image' });


        setTimeout(() => {

          this.setState({ collapse: objecto.rowCollapse, urlVideo: objecto.originalURL, author: objecto.name, marginLeftCollap: objecto.marginLeft, posicion: index, tipoObject: objecto.type, selectObject: objecto });


        }, 100);
      } else {
        this.setState({ collapse: objecto.rowCollapse, urlVideo: objecto.originalURL, author: objecto.name, marginLeftCollap: objecto.marginLeft, posicion: index, tipoObject: objecto.type, selectObject: objecto });

      }


      setTimeout(() => {
        console.log('objecto[index].rowCollapse', objecto.rowCollapse);
        this.refs[objecto.rowCollapse].scrollIntoView({ block: 'center', behavior: 'smooth' });

      }, 500);


    }

  }

  closeCollapse() {

    if (this.state.tipoObject === 'video') {
      this.refs.playerCollapse.pause();
    }


    this.setState({ collapse: '-1', posicion: -1, tipoObject: 'none' });

  }

  onBack() {
    const { imageVideos } = this.props;

    console.log('bkacj imageVideos', imageVideos);

    if (this.state.posicion > 0) {
      var index = this.state.posicion - 1;
      console.log('entra', imageVideos[index].name);

      
      if (imageVideos[index].type === 'video') {

        this.setState({ tipoObject: 'image' });

       
        setTimeout(() => {

          this.setState({ collapse: imageVideos[index].rowCollapse, urlVideo: imageVideos[index].originalURL, author: imageVideos[index].name, marginLeftCollap: imageVideos[index].marginLeft, posicion: index, tipoObject: imageVideos[index].type , selectObject: imageVideos[index] });


        }, 100);
      } else {
        this.setState({ collapse: imageVideos[index].rowCollapse, urlVideo: imageVideos[index].originalURL, author: imageVideos[index].name, marginLeftCollap: imageVideos[index].marginLeft, posicion: index, tipoObject: imageVideos[index].type , selectObject: imageVideos[index] });

      }


      setTimeout(() => {
        this.refs[imageVideos[index].rowCollapse].scrollIntoView({ block: 'center', behavior: 'smooth' });

      }, 500);

    }

  }
  onNext() {
    const { imageVideos } = this.props;
    console.log('next imageVideos', imageVideos);

    if (imageVideos.length - 1 > this.state.posicion) {



      var index = this.state.posicion + 1;

      console.log('entra', imageVideos[index].name);

      if (imageVideos[index].type === 'video') {

        this.setState({ tipoObject: 'image' });


        setTimeout(() => {

          this.setState({ collapse: imageVideos[index].rowCollapse, urlVideo: imageVideos[index].originalURL, author: imageVideos[index].name, marginLeftCollap: imageVideos[index].marginLeft, posicion: index, tipoObject: imageVideos[index].type, selectObject: imageVideos[index] });

        }, 100);

      } else {
        this.setState({ collapse: imageVideos[index].rowCollapse, urlVideo: imageVideos[index].originalURL, author: imageVideos[index].name, marginLeftCollap: imageVideos[index].marginLeft, posicion: index, tipoObject: imageVideos[index].type, selectObject: imageVideos[index]   });

      }



      setTimeout(() => {
        this.refs[imageVideos[index].rowCollapse].scrollIntoView({ block: 'center', behavior: 'smooth' });



      }, 500);


    }

  }

  onDrop(files) {
    this.setState({
      files
    });
  }

  onCancel() {
    this.setState({
      files: []
    })
  }
  render() {
    const { items, loading, userById, parents, imageVideos } = this.props;
    const { collapse } = this.state;
    const { urlVideo } = this.state;
    const { posicion } = this.state;
    const { author } = this.state;
    const { isAdmin } = this.state;
    const { tipoObject } = this.state;
    const { marginLeftCollap } = this.state;
    const { copyRight } = this.state;
    const { tags, suggestions } = this.state;
    const { startDate } = this.state;
    const { compartirModal } = this.state;
    const { correoCompartir } = this.state;
    const { selectObject } = this.state;
    const { isMoveObject } = this.state;

    const { newCustomers, sectionReload, alertDialog, editCustomerModal, addNewCustomerForm, editCustomer, snackbar, successMessage, addNewCustomerDetails, archivoModal } = this.state;

    moment.locale('es');
    return (

      <div className="dashboard-v1">
       <div className="site-logo">



</div>
<div className="fondo-logo-compartidos-bunkey">
<img src={require('../../../assets/img/logo_bunkey-w.svg')} className="img-fluid anchoImagenCompartidosLogo" alt="site-logo" />

</div>

      <div>
        <div>
          <nav class="mb-0 tour-step-6 breadcrumb volver-paginas-history">
            {parents.map((padre, index) => {
              return (
                <a href="javascript:void(0)" class="breadcrumb-item" onClick={() => this.goToImagenes(padre)}>
                  {index === 0 ? '' : <span>{padre.name}</span>}
                </a>
              );

            })}
          </nav>
        </div>

        <RctCollapsibleCard>
          <div className={'rct-block-title'}>

            <h4 className="titulo-vistas-nombre-cliente"><b>{this.state.nombreFolder}</b></h4>
           
          </div>


          {loading &&
            <div className="d-flex justify-content-center loader-overlay">
              <CircularProgress />
            </div>
          }
          <div className="gallery-wrapper">
            <div className="row row-eq-height text-center">
              {imageVideos.map((n, index) => {

                let ext = fileExtension(n.lowQualityURL)
                let title = null;

                if (n.name.length > 20) {
                  title = `${n.name.substr(0,20)}... .${ext}`
                }else{
                  title = `${n.name}.${ext}`
                }

                return n.type ?

                  <div key={index} className="col-sm-6 col-md-4 col-lg-4 col-xl-3 text-white" >
                   <ContextMenuTrigger id={index + 'compartidos'}>

                      {n.type === 'image' &&
                        <GridListTile key={index}>
                         <div className="heigth-div-objetos">
                          <img className="image-colapse-max-width-height" src={n.originalURL} alt={n.name} onClick={() => this.onCollapse(n, index)} />
                          </div>
                        </GridListTile>

                      }
                      {n.type === 'video' &&
                        <GridListTile key={index}>
                          <div  className="heigth-div-objetos" onClick={() => this.onCollapse(n, index)} onMouseOver={() => this.mouseOver(index)} onMouseOut={() => this.mouseOut(index)}>
                            <Player className="border-object-div" ref={'player' + index} fluid={false} width={'100%'} height={184} muted={true}>
                              <BigPlayButton position="center" />
                              <ControlBar disableDefaultControls={true} />
                              <source src={n.originalURL} />
                            </Player>

                          </div>

                        </GridListTile>

                      }
                      {
                        n.type === 'document' &&
                          <GridListTile key={index}>
                            <div className="heigth-div-objetos">
                            <img className="image-colapse-max-width-height" src={require('../../../assets/img/file.png')} alt={n.name} onClick={() => this.onCollapse(n, index)} />
                            </div>
                          </GridListTile>
                      }
                      
                      <p className="color-texto-carpetas-explorar">{title}</p>


                   

                    {(posicion === index && !n.createRowCollapse) &&
                      <div className={"paddin-center-trinagulo-rows"}>
                        <div className="triangulo-equilatero-bottom"></div>
                      </div>
                    }
                    {n.createRowCollapse &&

                      <Collapse isOpen={collapse === n.rowCollapse} className="anchoCollapseExplorar padding-top-triangulo-collapse"
                        style={{ marginLeft: n.marginLeft}} 

                      >

                        {(posicion === index && n.createRowCollapse) &&
                          <div className="padding-left-first-row-collapse-triangulo">
                            <div className="triangulo-equilatero-bottom"></div>
                          </div>

                        }

                        <div ref={n.rowCollapse} style={{ width: '96%'}} className="row row-eq-height text-center fondo-videos-seleccionado collapse " id="collapseExample"


                        >

                          <div className="col-sm-2 col-md-1 col-lg-2">
                            <div className="volver-collap-video-image-left">
                              <i onClick={() => this.onBack()} className="zmdi ti-angle-left text-white"></i>

                            </div>

                          </div>
                          <div className="col-sm-6 col-md-5 col-lg-6 zindex-collapse-next-close height-image-colapse-div-col" >
                            
                              {tipoObject === 'image' &&

                                <img className="image-colapse-max-width-height" src={urlVideo}></img>

                              }


                              {tipoObject === 'video' && collapse === n.rowCollapse &&

                                <Player ref="playerCollapse" autoPlay fluid={false} width={'100%'} height={351} >
                                  <BigPlayButton position="center" />
                                  <source src={urlVideo} />
                                </Player>

                              }
                              {
                                tipoObject === 'document'  && collapse === n.rowCollapse &&
                                <img className="image-colapse-max-width-height" src={require('../../../assets/img/file.png')}></img>
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
                              <IconButton onClick={() => { window.open(selectObject.originalURL, '_blank') }}> <i className="zmdi zmdi-download text-white"></i></IconButton>
                            </div>



                            {selectObject !== '-1' &&
                              <div>


                                <div>
                                  {selectObject.metadata.descriptiveTags.map((tags, numTag) => (
                                    <span key={'tags-' + numTag} className="text-white tags-collapse-border"> {tags}</span>
                                  ))}
                                </div>
                                <div> 
                                  {selectObject.metadata.audiovisualTags.map((audiovisualTags, numAudioTag) => (
                                    <span key={'tagsAudio-' + numAudioTag} className="text-white tags-collapse-border"> {audiovisualTags}</span>
                                  ))}
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

                    </ContextMenuTrigger>

                  {
                    n.type !== 'folder' &&
                      <div key={'contex' + index} >
                      <ContextMenu id={index + 'compartidos'} className="click-derecho-bunkey color-texto-carpetas-explorar">
                        <MenuItem onClick={() => {window.open(n.originalURL,'_blank')}} data={{ item: { index } }}>
                          <i className="zmdi zmdi-download color-header-bunkey padding-click-derecho padding-top-click-derecho"></i>
                          <span className="padding-click-derecho">Descargar </span>
                        </MenuItem>       
                      </ContextMenu>   
                    </div>
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
                  <Input
                    required="true"
                    type="date"
                    name="startDate"
                    id="startDate"
                    value={startDate}
                    onChange={(event) => this.setState({ startDate: event.target.value })}
                  />
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



      </div>
      </div>
    )
  }
}

// map state to props
const mapStateToProps = ({ compartidos }) => {
  return compartidos;
}

export default withRouter(connect(mapStateToProps, {
  getObjects, createObject, cambiarObject, removeObject, uploadArchivo, getObjectsByID, agregarFavoritos, uploadExplorarMultipleFile, getObjectsByHideID, uploadExplorarMultipleFileDescription, compartirExplorar, moveExplorar, getCompartidosInvitado, getObjectsCompartidosExplore
})(Compartidos));