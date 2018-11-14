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
  daleteFavoritos
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



class Favoritos extends Component {

  constructor() {
    super()
    this.state = {
      addNewCustomerForm: false,
      editCustomerModal: false,
      archivoModal: false,
      editCustomer: null,
      selectedDeletedCustomer: null,
      alertDialog: false,
      file: '', 
      imagePreviewUrl: '',
      nombreCliente: '',
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
    
  }

  
  componentWillMount() {
    this.props.getFavoritos();
  //  this.props.getFolders();
    //this.props.getUserDetails();

      /*  setTimeout(() => {
         const { items} = this.props;
         console.log('items',items);
         this.props.getUserById(items._id);
     }, 1000);*/
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

  render() {
    const { loadingFavoritos, userById, favoritos } = this.props;
    const { newCustomers, sectionReload, alertDialog, editCustomerModal, addNewCustomerForm, editCustomer, snackbar, successMessage, addNewCustomerDetails, archivoModal } = this.state;

    return (


      <div>
        <RctCollapsibleCard>
          <div className={'rct-block-title'}>
            <h4 className="titulo-vistas-nombre-cliente"><b>Favoritos</b></h4>
            
          </div>


           {loadingFavoritos &&
            <div className="d-flex justify-content-center loader-overlay">
              <CircularProgress />
            </div>
          }
          <div className="row row-eq-height text-center">
            {favoritos.map((n, index) => {

              return n.type === 'folder' ?







                <div key={index} className="col-sm-2 col-md-1 col-lg-2">
                  <ContextMenuTrigger id={index + 'favoritos'} holdToDisplay={1000}>
                    <img onClick={() => this.goToImagenes(n)} src={require('../../../../assets/img/folder2.jpg')} className="margin-top-folder" />

                    <p>{n.name}</p>
                  </ContextMenuTrigger>
                  <ContextMenu id={index + 'favoritos'} className="click-derecho-bunkey">
                    <MenuItem onClick={this.handleClick} data={{ item: { index } }}>
                      <i className="zmdi zmdi-download color-header-bunkey padding-click-derecho padding-top-click-derecho"></i>
                      <span className="padding-click-derecho">Descargar {index}</span>
                    </MenuItem>
                    <MenuItem onClick={this.handleClick} data={{ item: 'item 2' }}>
                      <i className="zmdi zmdi-share color-header-bunkey padding-click-derecho padding-top-click-derecho"></i>
                      <span className="padding-click-derecho">Compartir</span>
                    </MenuItem>
                   

                    
                    <MenuItem onClick={this.handleClick} data={{ item: 'item 2' }}>
                      <div className="line-click-derecho  padding-top-click-derecho"></div>

                    </MenuItem>
                    <MenuItem onClick={() => this.handleClickDeleteFavoritos(n)} data={{ item: 'item 2' }}>
                      <i className="zmdi ti-trash color-header-bunkey padding-click-derecho padding-top-click-derecho padding-bottom-click-derecho"></i>
                      <span className="padding-click-derecho">Eliminar de Favoritos</span>
                    </MenuItem>
                  </ContextMenu>
                </div>


                : 
                

                <div key={index} className="col-sm-2 col-md-1 col-lg-2">
                  <ContextMenuTrigger id={index + 'favoritos'} holdToDisplay={1000}>
                    <img  src={n.originalURL} className="margin-top-folder folder-imagen-dashboard" />

                    <p>{n.name}</p>
                  </ContextMenuTrigger>
                  <ContextMenu id={index + 'favoritos'} className="click-derecho-bunkey">
                    <MenuItem onClick={this.handleClick} data={{ item: { index } }}>
                      <i className="zmdi zmdi-download color-header-bunkey padding-click-derecho padding-top-click-derecho"></i>
                      <span className="padding-click-derecho">Descargar {index}</span>
                    </MenuItem>
                    <MenuItem onClick={this.handleClick} data={{ item: 'item 2' }}>
                      <i className="zmdi zmdi-share color-header-bunkey padding-click-derecho padding-top-click-derecho"></i>
                      <span className="padding-click-derecho">Compartir</span>
                    </MenuItem>
                   

                    
                    <MenuItem onClick={this.handleClick} data={{ item: 'item 2' }}>
                      <div className="line-click-derecho  padding-top-click-derecho"></div>

                    </MenuItem>
                    <MenuItem onClick={() => this.handleClickDeleteFavoritos(n)} data={{ item: 'item 2' }}>
                      <i className="zmdi ti-trash color-header-bunkey padding-click-derecho padding-top-click-derecho padding-bottom-click-derecho"></i>
                      <span className="padding-click-derecho">Eliminar de Favoritos</span>
                    </MenuItem>
                  </ContextMenu>
                </div>





            })}

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






      </div>
    )
  }
}

// map state to props
const mapStateToProps = ({ dashboard }) => {
  return dashboard;
}

export default withRouter(connect(mapStateToProps, {
  getUserDetails, getUserById, getFolders, createFolder, cambiarNombreObject, daleteObject, subirArchivo, addFavoritos, getFavoritos, daleteFavoritos
})(Favoritos));