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
  daleteObject
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



class Folders extends Component {

  constructor() {
    super()
    this.state = {
      addNewCustomerForm: false,
      editCustomerModal: false,
      editCustomer: null,
      selectedDeletedCustomer: null,
      alertDialog: false,
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
  }

  componentWillMount() {
    console.log('get folders');
    this.props.getFolders();
    /* this.props.getUserDetails();

     setTimeout(() => {
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

  handleSubmitEdit(event) {
    event.preventDefault();
    this.onSubmitCustomerEditDetailForm();
  }
  handleSubmitAdd(event) {
    event.preventDefault();
    this.onSubmitAddNewCustomerForm();
  }


  onEditCustomer(customer) {
    this.setState({ editCustomerModal: true, editCustomer: customer, addNewCustomerForm: false });
  }


  handleClickChangeName(folder) {
    console.log('handleClickChangeName', folder);
    this.onEditCustomer(folder);
    // this.props.cambiarNombreObject(folder, 'test');

  }

  handleClickDelete(folder) {
    console.log('handleClickChangeName', folder);
    this.props.daleteObject(folder);

  }

  onSubmitCustomerEditDetailForm() {
    const { editCustomer } = this.state;
    console.log('editCustomer', editCustomer);
    if (editCustomer.name !== '') {
      this.setState({ editCustomerModal: false });
      console.log('editCustomer', editCustomer);
      this.props.cambiarNombreObject(editCustomer);
      // test despues borrrar y detectar cuando responde el crear
      setTimeout(() => {
        this.props.getFolders();
      }, 1000);

    }
  }
  onSubmitAddNewCustomerForm() {
    const { addNewCustomerDetails } = this.state;
    if (addNewCustomerDetails.name !== '') {
      this.setState({ editCustomerModal: false });
      console.log('addNewCustomerDetails', addNewCustomerDetails);
      this.props.createFolder(addNewCustomerDetails);
      // test despues borrrar y detectar cuando responde el crear
      setTimeout(() => {
        this.props.getFolders();
      }, 1000);
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



  onChangeCustomerDetails(key, value) {
    this.setState({
      editCustomer: {
        ...this.state.editCustomer,
        [key]: value
      }
    });
  }

  // edit customer


  render() {
    const { items, loading, userById } = this.props;
    const { newCustomers, sectionReload, alertDialog, editCustomerModal, addNewCustomerForm, editCustomer, snackbar, successMessage, addNewCustomerDetails } = this.state;

    return (


      <div>
        <RctCollapsibleCard>
          <div className={'rct-block-title'}>
            <h4 className="titulo-vistas-nombre-cliente"><b>Bunkey</b></h4>
            <div className="contextual-link">
              <a href="javascript:void(0)" onClick={() => this.onAddCarpeta()}>Ver más <i className="ti-plus"></i></a>

            </div>
          </div>
          <div className="row row-eq-height text-center">
            {items.map((n, index) => {

              return n.type === 'folder' ?







                <div key={index} className="col-sm-2 col-md-1 col-lg-2">
                  <ContextMenuTrigger id={index + ''} holdToDisplay={1000}>
                    <img onClick={() => this.goToImagenes()} src={require('../../../../assets/img/folder2.jpg')} className="margin-top-folder" />

                    <p>{n.name}</p>
                  </ContextMenuTrigger>
                  <ContextMenu id={index + ''} className="click-derecho-bunkey">
                    <MenuItem onClick={this.handleClick} data={{ item: { index } }}>
                      <i className="zmdi zmdi-download color-header-bunkey padding-click-derecho padding-top-click-derecho"></i>
                      <span className="padding-click-derecho">Descargar {index}</span>
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

                    <MenuItem onClick={this.handleClick} data={{ item: 'item 2' }}>
                      <i className="zmdi zmdi-star-outline color-header-bunkey padding-click-derecho padding-top-click-derecho"></i>
                      <span className="padding-click-derecho">Agregar a favoritos</span>
                    </MenuItem>
                    <MenuItem onClick={this.handleClick} data={{ item: 'item 2' }}>
                      <div className="line-click-derecho  padding-top-click-derecho"></div>

                    </MenuItem>
                    <MenuItem onClick={() => this.handleClickDelete(n)} data={{ item: 'item 2' }}>
                      <i className="zmdi ti-trash color-header-bunkey padding-click-derecho padding-top-click-derecho padding-bottom-click-derecho"></i>
                      <span className="padding-click-derecho">Eliminar</span>
                    </MenuItem>
                  </ContextMenu>
                </div>


                : ''





            })}

          </div>
          <ContextMenu id="SIMPLE" className="click-derecho-bunkey">
            <MenuItem onClick={this.handleClick} data={{ item: 'item 1' }}>
              <i className="zmdi zmdi-download color-header-bunkey padding-click-derecho padding-top-click-derecho"></i>
              <span className="padding-click-derecho">Descargar</span>
            </MenuItem>
            <MenuItem onClick={this.handleClick} data={{ item: 'item 2' }}>
              <i className="zmdi zmdi-share color-header-bunkey padding-click-derecho padding-top-click-derecho"></i>
              <span className="padding-click-derecho">Compartir</span>
            </MenuItem>
            <MenuItem onClick={this.handleClick} data={{ item: 'item 2' }}>
              <i className="zmdi zmdi-edit color-header-bunkey padding-click-derecho padding-top-click-derecho"></i>
              <span className="padding-click-derecho">Cambiar Nombre</span>
            </MenuItem>

            <MenuItem onClick={this.handleClick} data={{ item: 'item 2' }}>
              <i className="zmdi zmdi-long-arrow-tab color-header-bunkey padding-click-derecho padding-top-click-derecho"></i>
              <span className="padding-click-derecho">Mover</span>
            </MenuItem>

            <MenuItem onClick={this.handleClick} data={{ item: 'item 2' }}>
              <i className="zmdi zmdi-star-outline color-header-bunkey padding-click-derecho padding-top-click-derecho"></i>
              <span className="padding-click-derecho">Agregar a favoritos</span>
            </MenuItem>
            <MenuItem onClick={this.handleClick} data={{ item: 'item 2' }}>
              <div className="line-click-derecho  padding-top-click-derecho"></div>

            </MenuItem>
            <MenuItem onClick={this.handleClick} data={{ item: 'item 2' }}>
              <i className="zmdi ti-trash color-header-bunkey padding-click-derecho padding-top-click-derecho padding-bottom-click-derecho"></i>
              <span className="padding-click-derecho">Eliminar</span>
            </MenuItem>
          </ContextMenu>
        </RctCollapsibleCard>







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








      </div>
    )
  }
}

// map state to props
const mapStateToProps = ({ dashboard }) => {
  return dashboard;
}

export default connect(mapStateToProps, {
  getUserDetails, getUserById, getFolders, createFolder, cambiarNombreObject, daleteObject
})(Folders);