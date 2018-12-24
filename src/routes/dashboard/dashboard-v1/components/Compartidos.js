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
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

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
      selectObject: [],
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
      idObjectCompartir: ''
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
  
            this.setState({ collapse: objecto.rowCollapse, urlVideo: objecto.originalURL, author: objecto.name, marginLeftCollap: objecto.marginLeft, posicion: index, tipoObject: objecto.type });
  
  
          }, 100);
        } else {
          this.setState({ collapse: objecto.rowCollapse, urlVideo: objecto.originalURL, author: objecto.name, marginLeftCollap: objecto.marginLeft, posicion: index, tipoObject: objecto.type });
  
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
  
  
        setTimeout(() => {
          this.refs[imageVideosCompartidos[index].rowCollapse].scrollIntoView({ block: 'center', behavior: 'smooth' });
  
        }, 500);
  
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
  
  
  
        setTimeout(() => {
          this.refs[imageVideosCompartidos[index].rowCollapse].scrollIntoView({ block: 'center', behavior: 'smooth' });
  
  
  
        }, 500);
  
  
      }
  
    }

  render() {
    const { compartidos, loadingCompartidos, userById, parentsCompartidos, imageVideosCompartidos } = this.props;
    const { collapse } = this.state;
    const { urlVideo } = this.state;
    const { posicion } = this.state;
    const { author } = this.state;
    const { tipoObject } = this.state;
    const { marginLeftCollap } = this.state;
    const { compartirModal } = this.state;
    const { correoCompartir } = this.state;
    const { newCustomers, sectionReload, alertDialog, editCustomerModal, addNewCustomerForm, editCustomer, snackbar, successMessage, addNewCustomerDetails, archivoModal } = this.state;

    return (


      <div>
       <RctCollapsibleCard>
          <div className={'rct-block-title'}>

            <h4 className="titulo-contenidos-compartidos"><b>Contenidos Compartidos</b></h4>
            <div className="contextual-link">
              

            </div>
          </div>


          {loadingCompartidos &&
            <div className="d-flex justify-content-center loader-overlay">
              <CircularProgress />
            </div>
          }
          <div className="row row-eq-height text-center">
            {compartidos.map((n, index) => {

              return n.type === 'folder' ?







                <div key={index} className="col-sm-2 col-md-1 col-lg-2">
                  <ContextMenuTrigger id={index + 'folder-favoritos'} holdToDisplay={1000}>
                    <img onClick={() => this.goToImagenes(n)} src={require('../../../../assets/img/folder2.jpg')} className="margin-top-folder" />

                    <p>{n.name}</p>
                  </ContextMenuTrigger>
                  <ContextMenu id={index + 'folder-favoritos'} className="click-derecho-bunkey">
                    
                    <MenuItem onClick={() => this.abrirCompartir(n)} data={{ item: 'item 2' }}>
                      <i className="zmdi zmdi-share color-header-bunkey padding-click-derecho padding-top-click-derecho"></i>
                      <span className="padding-click-derecho">Compartir</span>
                    </MenuItem>
                    

                    

                    <MenuItem onClick={this.handleClick} data={{ item: 'item 2' }}>
                      <div className="line-click-derecho  padding-top-click-derecho"></div>

                    </MenuItem>
                    <MenuItem onClick={() => this.handleClickDeleteFavoritos(n)} data={{ item: 'item 2' }}>
                      <i className="zmdi ti-trash color-header-bunkey padding-click-derecho padding-top-click-derecho padding-bottom-click-derecho"></i>
                      <span className="padding-click-derecho">Eliminar</span>
                    </MenuItem>
                  </ContextMenu>
                </div>


                : ''
            })}
          </div>
          <div className="gallery-wrapper">
            <div className="row row-eq-height text-center">
              {imageVideosCompartidos.map((n, index) => {

                return n.type !== 'folder' ?

                  <div key={index} className="col-sm-6 col-md-4 col-lg-4 col-xl-3 text-white" >
                    <ContextMenuTrigger id={index + 'imagevideo-compartidos'} holdToDisplay={1000}>

                      {n.type === 'image' &&
                        <GridListTile key={index}>
                        <div className="heigth-div-objetos">
                          <img className="imagenes-tam-grid" src={n.originalURL} alt={n.name} onClick={() => this.onCollapse(n, index)} />
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
                      <p className="color-texto-carpetas-explorar">{n.name}</p>


                    </ContextMenuTrigger>

                    <ContextMenu id={index + 'imagevideo-compartidos'} className="click-derecho-bunkey color-texto-carpetas-explorar">
                      <MenuItem onClick={() => {window.open(n.originalURL,'_blank')}} data={{ item: { index } }}>
                        <i className="zmdi zmdi-download color-header-bunkey padding-click-derecho padding-top-click-derecho"></i>
                        <span className="padding-click-derecho">Descargar </span>
                      </MenuItem>
                      <MenuItem onClick={() => this.abrirCompartir(n)}>
                        <i className="zmdi zmdi-share color-header-bunkey padding-click-derecho padding-top-click-derecho"></i>
                        <span className="padding-click-derecho">Compartir</span>
                      </MenuItem>
                      
                      <MenuItem onClick={this.handleClick} data={{ item: 'item 2' }}>
                        <div className="line-click-derecho  padding-top-click-derecho"></div>

                      </MenuItem>
                      <MenuItem onClick={() => this.handleClickDeleteFavoritos(n)} data={{ item: 'item 2' }}>
                        <i className="zmdi ti-trash color-header-bunkey padding-click-derecho padding-top-click-derecho padding-bottom-click-derecho"></i>
                        <span className="padding-click-derecho">Eliminar</span>
                      </MenuItem>
                    </ContextMenu>

                    {(posicion === index && !n.createRowCollapse) &&
                      <div className={"paddin-center-trinagulo-rows"}>
                        <div className="triangulo-equilatero-bottom"></div>
                      </div>
                    }
                    {n.createRowCollapse &&

                      <Collapse isOpen={collapse === n.rowCollapse} className="anchoCollapseExplorar padding-top-triangulo-collapse"
                        style={{ marginLeft: n.marginLeft }}

                      >

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
                          <div className="col-sm-6 col-md-5 col-lg-6 zindex-collapse-next-close" >
                            <div>
                              {tipoObject === 'image' &&

                                <img className="collapse-image-width-center " src={urlVideo}></img>

                              }


                              {tipoObject === 'video' &&

                                <Player ref="playerCollapse" autoPlay fluid={false} width={'100%'} height={351} >
                                  <BigPlayButton position="center" />
                                  <source src={urlVideo} />
                                </Player>




                              }
                            </div>
                          </div>
                          <div className="col-sm-4 col-md-3 col-lg-4 zindex-collapse-next-close">
                            <div className="fondo-videos-padding-top-desc">
                              <h3 className="text-white">{author}</h3>

                            </div>
                            <div>
                              <b className="text-white"></b>
                              <IconButton> <i className="zmdi zmdi-star-outline text-white"></i></IconButton>
                              <IconButton> <i className="zmdi zmdi-share text-white"></i></IconButton>
                              <IconButton> <i className="zmdi zmdi-download text-white"></i></IconButton>
                            </div>



                            <div className=" ">
                              <i onClick={() => this.closeCollapse()} className="zmdi   ti-close text-white volver-collap-video-image-right-close"></i>

                              <i onClick={() => this.onNext()} className="zmdi   ti-angle-right text-white volver-collap-video-image-right"></i>

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