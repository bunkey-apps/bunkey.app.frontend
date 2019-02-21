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

// intl messages
import IntlMessages from '../../../../util/IntlMessages';

// rct card box
import RctCollapsibleCard from '../../../../components/RctCollapsibleCard/RctCollapsibleCard';

// app config
import AppConfig from '../../../../constants/AppConfig';
import ModalTag from '../../../../components/ModalTag/ModalTag';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import fileExtension from 'file-extension';

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
  getFavoritos,
  daleteFavoritos,
  getObjectsByHideID,
  compartirDashboard,
  getCompartidos
} from '../../../../actions';


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


class Compartidos extends Component {

  constructor() {
    super()
    this.state = {
      selectObject: '-1',
      addNewCustomerForm: false,
      editCustomerModal: false,
      archivoModal: false,
      editCustomer: null,
      selectedDeletedCustomer: null,
      alertDialog: false,
      file: '',
      imagePreviewUrl: '',
      nombreCliente: '',
      nombreFolder: '',
      collapse: '-1',
      rowCollapseNum: '-2',
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
      correoCompartir: '',
      idObjectCompartir: '',
      isOpenModalTag: false
    }
    this.handleSubmitAdd = this.handleSubmitAdd.bind(this);
    this.handleSubmitEdit = this.handleSubmitEdit.bind(this);
    this.handleSubmitSubir = this.handleSubmitSubir.bind(this);
    this.handleSubmitCompartir = this.handleSubmitCompartir.bind(this);

  }

  
  componentWillMount() {
    this.props.getCompartidos();
  //  this.props.getFolders();
    //this.props.getUserDetails();

      /*  setTimeout(() => {
         const { items} = this.props;
         console.log('items',items);
         this.props.getUserById(items._id);
     }, 1000);*/
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
    this.props.compartirDashboard(objeto);

    this.setState({
      compartirModal: !this.state.compartirModal
    });
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
      }
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
    // this.props.cambiarNombreObject(folder, 'test');

  }

  handleClickFavoritos(folder) {
    console.log('handleClickFavoritos', folder);
    this.props.addFavoritos(folder);
    
  }

  deleteCustomer() {
    this.setState({ alertDialog: false});
 
    console.log('this.state.selectedDeletedCustomer',this.state.selectedDeletedCustomer);
    this.props.daleteFavoritos(this.state.selectedDeletedCustomer);

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
      this.props.cambiarNombreObject(editCustomer);
    }
  }
  onSubmitAddNewCustomerForm() {
    const { addNewCustomerDetails } = this.state;
    if (addNewCustomerDetails.name !== '') {
      this.setState({ editCustomerModal: false });
      console.log('addNewCustomerDetails', addNewCustomerDetails);
      this.props.createFolder(addNewCustomerDetails);
  
    }
  }
  onSubmitAddArchiveForm() {
    const { addNewCustomerDetails } = this.state;
    if (addNewCustomerDetails.name !== '') {
      this.setState({ archivoModal: false });
      console.log('onSubmitAddArchiveForm', addNewCustomerDetails);
      this.props.subirArchivo(addNewCustomerDetails,this.state.file);
  
    }
  
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

  handleClickDeleteFavoritos(customer) {
    this.setState({ alertDialog: true, selectedDeletedCustomer: customer });
    }


    goToImagenes= (n) => {
      console.log('objecto',n);
      localStorage.setItem("folderSelect", JSON.stringify(n));
      const { match, history } = this.props;
    history.push('/app/exlporar');
  
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
    
      console.log('index', index);
      this.setState({ rowCollapseNum: objecto.rowCollapse });
      if (this.state.collapse === objecto.rowCollapse && this.state.posicion === index) {
        if (this.state.tipoObject === 'video') {
          this.refs.playerCollapse.pause();
        }
        console.log('ddd');
        this.setState({ collapse: '-1', posicion: -1, tipoObject: 'none' });
      } else {
  
        if (objecto.type === 'video') {
  
          this.setState({ tipoObject: 'image' });
          console.log('entra video');
  
          setTimeout(() => {    
            this.setState({ collapse: objecto.rowCollapse, urlVideo: objecto.originalURL, author: objecto.name, marginLeftCollap: objecto.marginLeft, posicion: index, tipoObject: objecto.type, selectObject: objecto  });   
          }, 100);
        } else {
          console.log('entra imagen');
          this.setState({ collapse: objecto.rowCollapse, urlVideo: objecto.originalURL, author: objecto.name, marginLeftCollap: objecto.marginLeft, posicion: index, tipoObject: objecto.type, selectObject: objecto  });
  
        }
  
  
      }
  
    }
  
    closeCollapse() {
  
      if (this.state.tipoObject === 'video') {
        this.refs.playerCollapse.pause();
      }
  
  
      this.setState({ collapse: '-1', posicion: -1, tipoObject: 'none' });
  
    }
  
    onBack() {
      const { imageVideosCompartidos } = this.props;
  
      console.log('bkacj imageVideosCompartidos', imageVideosCompartidos);
  
      if (this.state.posicion > 0) {
        var index = this.state.posicion - 1;
        console.log('entra', imageVideosCompartidos[index].name);
        this.props.getObjectsByHideID(imageVideosCompartidos[index]._id);
  
        if (imageVideosCompartidos[index].type === 'video') {
  
          this.setState({ tipoObject: 'image' });
  
  
          setTimeout(() => {
  
            this.setState({ collapse: imageVideosCompartidos[index].rowCollapse, urlVideo: imageVideosCompartidos[index].originalURL, author: imageVideosCompartidos[index].name, marginLeftCollap: imageVideosCompartidos[index].marginLeft, posicion: index, tipoObject: imageVideosCompartidos[index].type, selectObject: imageVideosCompartidos[index] });
  
  
          }, 100);
        } else {
          this.setState({ collapse: imageVideosCompartidos[index].rowCollapse, urlVideo: imageVideosCompartidos[index].originalURL, author: imageVideosCompartidos[index].name, marginLeftCollap: imageVideosCompartidos[index].marginLeft, posicion: index, tipoObject: imageVideosCompartidos[index].type, selectObject: imageVideosCompartidos[index] });
  
        }
  
  
        // setTimeout(() => {
        //   this.refs[imageVideosCompartidos[index].rowCollapse].scrollIntoView({ block: 'center', behavior: 'smooth' });
  
        // }, 500);
  
      }
  
    }
    onNext() {
      const { imageVideosCompartidos } = this.props;
      console.log('next imageVideosCompartidos', imageVideosCompartidos);
  
      if (imageVideosCompartidos.length - 1 > this.state.posicion) {
  
  
  
        var index = this.state.posicion + 1;
        this.props.getObjectsByHideID(imageVideosCompartidos[index]._id);
        console.log('entra', imageVideosCompartidos[index].name);
  
        if (imageVideosCompartidos[index].type === 'video') {
  
          this.setState({ tipoObject: 'image' });
  
  
          setTimeout(() => {
  
            this.setState({ collapse: imageVideosCompartidos[index].rowCollapse, urlVideo: imageVideosCompartidos[index].originalURL, author: imageVideosCompartidos[index].name, marginLeftCollap: imageVideosCompartidos[index].marginLeft, posicion: index, tipoObject: imageVideosCompartidos[index].type, selectObject: imageVideosCompartidos[index]  });
  
  
          }, 100);
        } else {
          this.setState({ collapse: imageVideosCompartidos[index].rowCollapse, urlVideo: imageVideosCompartidos[index].originalURL, author: imageVideosCompartidos[index].name, marginLeftCollap: imageVideosCompartidos[index].marginLeft, posicion: index, tipoObject: imageVideosCompartidos[index].type, selectObject: imageVideosCompartidos[index]  });
  
        }
  
        // setTimeout(() => {
        //   this.refs[imageVideosCompartidos[index].rowCollapse].scrollIntoView({ block: 'center', behavior: 'smooth' });
  
        // }, 500);
  
      }
  
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

    render() {
    const { compartidos, loadingCompartidos, userById, parentsCompartidos, imageVideosCompartidos } = this.props;
    console.log('compartidos component', compartidos);
    
    const { collapse } = this.state;
    const { rowCollapseNum } = this.state;
    const { urlVideo } = this.state;
    const { posicion } = this.state;
    const { author } = this.state;
    const { tipoObject } = this.state;
    const { marginLeftCollap } = this.state;
    const { compartirModal } = this.state;
    const { correoCompartir } = this.state;
    const { selectObject } = this.state;

    const { newCustomers, sectionReload, alertDialog, editCustomerModal, addNewCustomerForm, editCustomer, snackbar, successMessage, addNewCustomerDetails, archivoModal } = this.state;

    moment.locale('es');

      /** checking if the object exists in favorites */
      let favorites = JSON.parse(localStorage.getItem('objectFavorites'));
      let sw = false;

      if ((selectObject && selectObject!==-1 && favorites) && (selectObject._id == favorites._id || (favorites.children && favorites.children.find(x => x._id == selectObject._id)))) {
        sw = true;
      }

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
                        <h4 className="titulo-vistas-recientemente"><b>Archivos Compartidos</b></h4>
                    </div>

                    <div>
                        <GridList className="grid-list-videos" cols={4.5}>

                        {compartidos.map((n, index) => {
                            return n.object.type === 'folder' ?

                              <div key={index} className="col-sm-2 col-md-1 col-lg-2 text-center">
                                <ContextMenuTrigger id={index + 'folder-favoritos'} holdToDisplay={1000}>
                                  <img onClick={() => this.goToImagenes(n.object)} src={require('../../../../assets/img/folder2.jpg')} className="margin-top-folder" />
                                  <p>{n.object.name}</p>
                                </ContextMenuTrigger>
                              </div>


                              : ''
                            })}                       
                            
                            {imageVideosCompartidos.map((n, index) => {
                              let ext = fileExtension(n.lowQualityURL)
                              let title = null;
              
                              if (n.name.length > 20) {
                                title = `${n.name.substr(0,20)}... .${ext}`
                              }else{
                                title = `${n.name}.${ext}`
                              }

                                return (n.type === 'image' || n.type === 'video') ?
                                    <GridListTile key={index} className="mr-4">
                                      <ContextMenuTrigger id={index + 'imagevideo-compartidos'}>
                                          
                                            {n.type === 'image' &&
                                            <div className="heigth-div-objetos-recientes">
                                                <img className="image-colapse-max-width-height" src={n.lowQualityURL} alt={n.name} onClick={() => this.onCollapse(n, index)} />
                                                </div>
                                            }
                                            {n.type === 'video' &&
                                                <div className="eigth-div-objetos-recientes" onClick={() => this.onCollapse(n, index)} onMouseOver={() => this.mouseOver(index)} onMouseOut={() => this.mouseOut(index)}>

                                                    <Player ref={'playerRecientes' + index} fluid={false} width={'100%'} height={180} muted={true}>
                                                        <BigPlayButton position="center" />
                                                        <ControlBar disableDefaultControls={true} />
                                                        <source src={n.lowQualityURL} />
                                                    </Player>
                                                </div>
                                            }
                                            {
                                              n.type === 'document' &&
                                                <div className="heigth-div-objetos">
                                                <img className="image-colapse-max-width-height" src={require('../../../../assets/img/file.png')} alt={n.name} onClick={() => this.onCollapse(n, index)} />
                                                </div>
                                            }
                                      </ContextMenuTrigger>
                                    </GridListTile>

                                    : ''

                            })}
                        </GridList>

                        <div>
                        {imageVideosCompartidos.map((o, num) => {

                        return (o.type === 'image' || o.type === 'video') ?
                            <div key={'contex' + num} >
                              <ContextMenu id={num + 'imagevideo-compartidos'} className="click-derecho-bunkey color-texto-carpetas-explorar">
                                <MenuItem onClick={() => {window.open(o.originalURL,'_blank')}} data={{ item: { num } }}>
                                  <i className="zmdi zmdi-download color-header-bunkey padding-click-derecho padding-top-click-derecho"></i>
                                  <span className="padding-click-derecho">Descargar </span>
                                </MenuItem>
                                <MenuItem onClick={() => this.abrirCompartir(o)}>
                                  <i className="zmdi zmdi-share color-header-bunkey padding-click-derecho padding-top-click-derecho"></i>
                                  <span className="padding-click-derecho">Compartir</span>
                                </MenuItem>
                                <MenuItem onClick={this.handleClick} data={{ item: 'item 2' }}>
                                  <div className="line-click-derecho  padding-top-click-derecho"></div>
                                </MenuItem>           
                              </ContextMenu>   
                            </div>

                            : ''

                        })}
                        </div>
                        <div>
                        {compartidos.map((o, num) => {                    
                        return (o.object.type === 'folder') ?
                            <div key={'contex' + num} >
                                <ContextMenu id={num + 'folder-favoritos'} className="click-derecho-bunkey">
                                  <MenuItem onClick={() => this.abrirCompartir(o.object)} data={{ item: 'item 2' }}>
                                    <i className="zmdi zmdi-share color-header-bunkey padding-click-derecho padding-top-click-derecho"></i>
                                    <span className="padding-click-derecho">Compartir</span>
                                  </MenuItem>
                                                                   
                                  <MenuItem onClick={this.handleClick} data={{ item: 'item 2' }}>
                                    <div className="line-click-derecho  padding-top-click-derecho"></div>
                                  </MenuItem>                                  
                                </ContextMenu> 
                            </div>

                            : ''

                        })}
                        </div>
                        <Collapse isOpen={collapse === rowCollapseNum} className="anchoCollapseRecientes padding-top-triangulo-collapse">
                        <div className="row row-eq-height text-center fondo-videos-seleccionado collapse " id="collapseExample">
                          <div className="col-sm-2 col-md-1 col-lg-2">
                            <div className="volver-collap-video-image-left">
                              <i onClick={() => this.onBack()} className="zmdi ti-angle-left text-white"></i>
                            </div>
                          </div>
                          <div className="col-sm-6 col-md-5 col-lg-6 zindex-collapse-next-close height-image-colapse-div-col" >                          
                              {tipoObject === 'image' &&

                                <img className="image-colapse-max-width-height" src={selectObject.mediaQualityURL}></img>

                              }
                              {tipoObject === 'video' &&

                                <Player ref="playerCollapse" autoPlay fluid={false} width={'100%'} height={351} >
                                  <BigPlayButton position="center" />
                                  <source src={selectObject.mediaQualityURL} />
                                </Player>
                              }
                              {
                                tipoObject === 'document'  && collapse === n.rowCollapse &&
                                <img className="image-colapse-max-width-height" src={require('../../../../assets/img/file.png')}></img>
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
                    </div>                    
                </RctCollapsibleCard>

                <Dialog
                    open={alertDialog}
                    onClose={this.handleClose}
                >
                    <DialogTitle>{"Estas seguro de eliminarlo de favoritos?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                           Estas seguro de eliminarlo de favoritos.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="raised"  onClick={this.handleClose} className="btn-danger text-white">
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
              <FormGroup>
                  <Label for="avatar">Archivo</Label>
                    <Input required="true" name="avatar" className="fileInput"
                      type="file"
                      onChange={(e) => this.handleImageChange(e)} />
                  </FormGroup>
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
  getUserDetails, getUserById, getFolders, createFolder, cambiarNombreObject, daleteObject, subirArchivo, addFavoritos, getFavoritos, daleteFavoritos, getObjectsByHideID,compartirDashboard, getCompartidos
})(Compartidos));