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
import PageTitleBar from '../../../../components/PageTitleBar/PageTitleBar';

// intl messages
import IntlMessages from '../../../../util/IntlMessages';

// rct card box
import RctCollapsibleCard from '../../../../components/RctCollapsibleCard/RctCollapsibleCard';

// app config
import AppConfig from '../../../../constants/AppConfig';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import { Collapse } from 'reactstrap';
// redux action
import {
  getSearch,
  agregarFavoritos,
  cambiarObjectSearch,
  removeObjectSearch,
  getObjectsByHideID
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



class Busqueda extends Component {

  constructor() {
    super()
   
    this.state = {
      selectObject: [],
      isAdmin: false,
      busqueda: '',
      background: '',
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
      }
    }
    this.handleSubmitAdd = this.handleSubmitAdd.bind(this);
    this.handleSubmitEdit = this.handleSubmitEdit.bind(this);
    this.handleSubmitSubir = this.handleSubmitSubir.bind(this);
    this.handleSubmitSearch = this.handleSubmitSearch.bind(this);

  }

  handleSubmitSearch(event) {
    event.preventDefault();
    this.goToBusqueda();
    
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
    const clienteSelect = localStorage.getItem('clienteSelect');
    const clienteSelectJson = JSON.parse(clienteSelect);
    var tipoUsuario = localStorage.getItem('tipoUsuario');
    var isAdmin = false;
    if(tipoUsuario === 'admin'){
      isAdmin = true;
    }
    if (clienteSelectJson) {
      console.log('header', clienteSelectJson.acountSetting.background);
      this.setState({ background: clienteSelectJson.acountSetting.background, busqueda: '', isAdmin: isAdmin });
    } else {
      this.setState({ background: 'http://www.fondos12.com/data/media/2/big/azul-difuminado-29047-1920x1080__wallpaper_480x300.jpg', busqueda: '', isAdmin: isAdmin });
    }

    this.props.getSearch();



  }

  goToBusqueda(){
    localStorage.setItem('textoBusqeuda', this.state.busqueda);
    localStorage.setItem('filtroBusqeuda', this.state.filtroBusqeuda);

    this.props.getSearch();
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.location !== this.props.location) {
      const clienteSelect = localStorage.getItem('clienteSelect');
      const clienteSelectJson = JSON.parse(clienteSelect);
      if (clienteSelectJson) {
        console.log('header', clienteSelectJson.acountSetting.background);
        this.setState({ background: clienteSelectJson.acountSetting.background, busqueda: '' });
      } else {
        this.setState({ background: 'http://www.fondos12.com/data/media/2/big/azul-difuminado-29047-1920x1080__wallpaper_480x300.jpg', busqueda: '' });
      }
      this.props.getSearch();

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

  }

  deleteCustomer() {
    this.setState({ alertDialog: false });

    console.log('this.state.selectedDeletedCustomer', this.state.selectedDeletedCustomer);
    this.props.removeObjectSearch(this.state.selectedDeletedCustomer);




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
      this.props.cambiarObjectSearch(editCustomer);


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
    if (addNewCustomerDetails.name !== '') {
      this.setState({ archivoModal: false });
      console.log('onSubmitAddArchiveForm', addNewCustomerDetails);
      this.props.uploadArchivo(addNewCustomerDetails, this.state.file);

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

  handleClickDelete(customer) {
    this.setState({ alertDialog: true, selectedDeletedCustomer: customer });
  }


  goToImagenes = (n) => {


    console.log('objecto', n);
    // localStorage.setItem("folderSelect", JSON.stringify(n));
    const { match, history } = this.props;
    history.push('/app/exlporar?id=' + n._id + '?name=' + n.name);

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
    const { imageVideos } = this.props;

    console.log('bkacj imageVideos', imageVideos);

    if (this.state.posicion > 0) {
      var index = this.state.posicion - 1;
      console.log('entra', imageVideos[index].name);

      this.props.getObjectsByHideID(imageVideos[index]._id);
      if (imageVideos[index].type === 'video') {

        this.setState({ tipoObject: 'image' });


        setTimeout(() => {

          this.setState({ collapse: imageVideos[index].rowCollapse, urlVideo: imageVideos[index].originalURL, author: imageVideos[index].name, marginLeftCollap: imageVideos[index].marginLeft, posicion: index, tipoObject: imageVideos[index].type, selectObject: imageVideos[index]  });


        }, 100);
      } else {
        this.setState({ collapse: imageVideos[index].rowCollapse, urlVideo: imageVideos[index].originalURL, author: imageVideos[index].name, marginLeftCollap: imageVideos[index].marginLeft, posicion: index, tipoObject: imageVideos[index].type, selectObject: imageVideos[index]  });

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
      this.props.getObjectsByHideID(imageVideos[index]._id);
      if (imageVideos[index].type === 'video') {

        this.setState({ tipoObject: 'image' });


        setTimeout(() => {

          this.setState({ collapse: imageVideos[index].rowCollapse, urlVideo: imageVideos[index].originalURL, author: imageVideos[index].name, marginLeftCollap: imageVideos[index].marginLeft, posicion: index, tipoObject: imageVideos[index].type, selectObject: imageVideos[index]  });


        }, 100);
      } else {
        this.setState({ collapse: imageVideos[index].rowCollapse, urlVideo: imageVideos[index].originalURL, author: imageVideos[index].name, marginLeftCollap: imageVideos[index].marginLeft, posicion: index, tipoObject: imageVideos[index].type, selectObject: imageVideos[index]  });

      }



      setTimeout(() => {
        this.refs[imageVideos[index].rowCollapse].scrollIntoView({ block: 'center', behavior: 'smooth' });



      }, 500);


    }

  }
  onChangeFiltroSearch(filtro){
    this.setState({filtroBusqeuda: filtro});
  }
  render() {
    const { items, loading, userById, parents, imageVideos } = this.props;
    const { collapse } = this.state;
    const { urlVideo } = this.state;
    const { posicion } = this.state;
    const { author } = this.state;
    const { isAdmin } = this.state;
    const { background } = this.state;
    const { busqueda } = this.state;
    const { tipoObject } = this.state;
    const { marginLeftCollap } = this.state;

    
    const { newCustomers, sectionReload, alertDialog, editCustomerModal, addNewCustomerForm, editCustomer, snackbar, successMessage, addNewCustomerDetails, archivoModal } = this.state;
    return (


      <div>



 <div className="fondo-busqueda text-white"
                  style={{ backgroundImage: `url(${background})` }}


                >
                <Form onSubmit={this.handleSubmitSearch}>
        <div>
          <div className="margen-busqueda text-white padding-top-busqueda">
            <h3><b classNmae="text-white">Encuentra tu contenido de forma simple</b></h3>
            <p className="text-white">Busca por palabra, frase o palabras compuestas</p>
          </div>


          <div>


            <div className="row">
              <div className="input-group col-md-6 padding-bottom-busqueda padding-left-input-search">

                <input value={busqueda} onChange={(event) => this.setState({ busqueda: event.target.value })} className="form-control py-2 border-right-0 border input-search-form-new" type="text" placeholder="Encontrar imagenes, videos o vectores" id="example-search-input">
                </input>

              </div>
              <div className="input-group col-md-1 padding-bottom-busqueda margin-left-select-search div-container-separador-form">
                <div className="div-separador-search-form"></div>
              </div>
              <div className="input-group col-md-3 padding-bottom-busqueda margin-left-select-search">
                <Input type="select"
                  name="tipoArchivo"
                  id="tipoArchivo"
                  className="select-resultados altura-select-search"
                  onChange={(e) => this.onChangeFiltroSearch( e.target.value)}
                >
                               <option value="-1">Tipo de Archivo</option>
                              <option value="image">imágen</option>
                              <option value="video">Video</option>
                </Input>
                <i class="fa fa-chevron-down flecha-select-test"></i>
              </div>
              <div className="input-group col-md-2 padding-bottom-busqueda">
                <button type="submit"  className="btn btn-outline-secondary color-boton-lupa-busqueda lupa-form-search">
                  <i className="fa fa-search"></i>
                </button>
              </div>
            </div>
          </div>

        </div>
        </Form>
 </div>
        <RctCollapsibleCard>
          <div className={'rct-block-title'}>


          </div>


          {loading &&
            <div className="d-flex justify-content-center loader-overlay">
              <CircularProgress />
            </div>
          }
          <div className="row row-eq-height text-center">
            {items.map((n, index) => {

              return n.type === 'folder' ?







                <div key={index} className="col-sm-2 col-md-1 col-lg-2">
                  <ContextMenuTrigger id={index + 'folder'} holdToDisplay={1000}>
                    <img onClick={() => this.goToImagenes(n)} src={require('../../../../assets/img/folder2.jpg')} className="margin-top-folder" />

                    <p>{n.name}</p>
                  </ContextMenuTrigger>
                  <ContextMenu id={index + 'folder'} className="click-derecho-bunkey">

                    <MenuItem onClick={this.handleClick} data={{ item: 'item 2' }}>
                      <i className="zmdi zmdi-share color-header-bunkey padding-click-derecho padding-top-click-derecho"></i>
                      <span className="padding-click-derecho">Compartir</span>
                    </MenuItem>
                    <MenuItem onClick={() => this.handleClickChangeName(n)} data={{ item: 'item 2' }}>
                      <i className="zmdi zmdi-edit color-header-bunkey padding-click-derecho padding-top-click-derecho"></i>
                      <span className="padding-click-derecho">Cambiar Nombre</span>
                    </MenuItem>

                    <MenuItem onClick={this.handleClick} data={{ item: 'item 2' }}>
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
                </div>


                : ''
            })}
          </div>
          <div className="gallery-wrapper">
            <div className="row row-eq-height text-center">
              {imageVideos.map((n, index) => {

                return n.type !== 'folder' ?

                  <div key={index} className="col-sm-6 col-md-4 col-lg-4 col-xl-3 text-white" >
                    <ContextMenuTrigger id={index + ''} holdToDisplay={1000}>

                      {n.type === 'image' &&
                        <GridListTile key={index}>
                        <div className="heigth-div-objetos">
                          <img className="image-colapse-max-width-height" src={n.originalURL} alt={n.name} onClick={() => this.onCollapse(n, index)} />
                          </div>
                        </GridListTile>

                      }
                      {n.type === 'video' &&
                        <GridListTile key={index}>
                          <div className="heigth-div-objetos" onClick={() => this.onCollapse(n, index)} onMouseOver={() => this.mouseOver(index)} onMouseOut={() => this.mouseOut(index)}>
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

                    <ContextMenu id={index + ''} className="click-derecho-bunkey color-texto-carpetas-explorar">
                      <MenuItem onClick={() => { window.open(n.originalURL, '_blank') }} data={{ item: { index } }}>
                        <i className="zmdi zmdi-download color-header-bunkey padding-click-derecho padding-top-click-derecho"></i>
                        <span className="padding-click-derecho">Descargar </span>
                      </MenuItem>
                      <MenuItem onClick={this.handleClick} data={{ item: 'item 2' }}>
                        <i className="zmdi zmdi-share color-header-bunkey padding-click-derecho padding-top-click-derecho"></i>
                        <span className="padding-click-derecho">Compartir</span>
                      </MenuItem>
                      <MenuItem onClick={() => this.handleClickChangeName(n)} data={{ item: 'item 2' }}>
                        <i className="zmdi zmdi-edit color-header-bunkey padding-click-derecho padding-top-click-derecho"></i>
                        <span className="padding-click-derecho">Cambiar Nombre</span>
                      </MenuItem>

                      <MenuItem onClick={this.handleClick} data={{ item: 'item 2' }}>
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
                          <div className="col-sm-6 col-md-5 col-lg-6 zindex-collapse-next-close height-image-colapse-div-col" >
                           
                              {tipoObject === 'image' &&

                                <img className="image-colapse-max-width-height" src={urlVideo}></img>

                              }


                              {tipoObject === 'video' &&

                                <Player ref="playerCollapse" autoPlay fluid={false} width={'100%'} height={351} >
                                  <BigPlayButton position="center" />
                                  <source src={urlVideo} />
                                </Player>




                              }
                           
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






      </div>
    )
  }
}

// map state to props
const mapStateToProps = ({ busqueda }) => {
  return busqueda;
}

export default withRouter(connect(mapStateToProps, {
  getSearch, agregarFavoritos, cambiarObjectSearch, removeObjectSearch, getObjectsByHideID
})(Busqueda));