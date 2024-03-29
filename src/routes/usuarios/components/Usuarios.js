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
import PageTitleBar from '../../../components/PageTitleBar/PageTitleBar';

// intl messages
import IntlMessages from '../../../util/IntlMessages';

// rct card box
import RctCollapsibleCard from '../../../components/RctCollapsibleCard/RctCollapsibleCard';

// app config
import AppConfig from '../../../constants/AppConfig';
import Pagination from "react-js-pagination";

  // redux action
  import {
    getUsuarios,
    addUsuario,
    deleteUsuario,
    updateUsuario,
    updateUserWorkspaceRole,
  } from '../../../actions';
   

let id = 0;

function createData(num, contrato, estado, monto, estadoPago) {
  id += 1;
  return { id, num, contrato, estado, monto, estadoPago };
}

const data = [
    createData(1, '1111-01', 'Pendiente','$ 500.000','Si'),
    createData(2, '1111-02', 'Pagado','$ 800.000','Si'),
    createData(3, '1111-03', 'Atrasado','$ 600.000','Si')
  ];

  

class Usuarios extends Component {
    
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
                passInvalid : false
            },
          activePage: 1
      }
      this.handleSubmitAdd = this.handleSubmitAdd.bind(this);
      this.handleSubmitEdit = this.handleSubmitEdit.bind(this);
      }
      handleSubmitEdit(event) {
        event.preventDefault();
        // this.onSubmitCustomerEditDetailForm();
        console.log('handleSubmitEdit -> this.state.editCustomer', this.state.editCustomer);
        const client = JSON.parse(localStorage.getItem('clienteSelect'));
        const { _id: user, clientRole } = this.state.editCustomer;
        this.props.updateUserWorkspaceRole(client._id, user, clientRole, () => {
            this.setState({ editCustomerModal: false});
        });
      }
    handleSubmitAdd(event) {
        event.preventDefault();
        this.onSubmitAddNewCustomerForm();
      }
      componentWillMount() {
        this.props.getUsuarios();
      }

      onAddUsuario() {
        this.setState({
            editCustomerModal: true,
            addNewCustomerForm: true,
            editCustomer: null,
            addNewCustomerDetails: {
                email: '',
                password: '',
                name: '',
                role: 'admin',
                workspace: '',
                clietntOwner: '',
                passwordRepeat: '',
                passInvalid : false
            }
        }); 
    }

    onChangeCustomerAddNewForm(key, value) {
      this.setState({
          addNewCustomerDetails: {
              ...this.state.addNewCustomerDetails,
              [key]: value
          }
      })
  }

  onSubmitAddNewCustomerForm() {
    const { addNewCustomerDetails } = this.state;
    if (addNewCustomerDetails.email !== '' && addNewCustomerDetails.name !== '' 
   ) {
        
            this.setState({ editCustomerModal: false});
            console.log('addNewCustomerDetails',addNewCustomerDetails);
            this.props.addUsuario(addNewCustomerDetails);
          
            
        
        
    }
}



onSubmitCustomerEditDetailForm() {
  const { editCustomer } = this.state;
  if (editCustomer.email !== '' && editCustomer.password !== '' && editCustomer.name !== '' 
  && editCustomer.role !== '') {
      this.setState({ editCustomerModal: false});
      console.log('editCustomer',editCustomer);
      
      this.props.updateUsuario(editCustomer);
      // test despues borrrar y detectar cuando responde el crear
     
      
  }
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

// close alert
handleClose = () => {
  console.log('handleClose');
this.setState({ alertDialog: false });
}

// edit customer
onEditCustomer(customer) {
this.setState({ editCustomerModal: true, editCustomer: customer, addNewCustomerForm: false });
}

// on delete customer
onDeleteCustomer(customer) {
this.setState({ alertDialog: true, selectedDeletedCustomer: customer });
}

// delete customer
deleteCustomer() {
  this.setState({ alertDialog: false});
 
  console.log('this.state.selectedDeletedCustomer',this.state.selectedDeletedCustomer);
  this.props.deleteUsuario(this.state.selectedDeletedCustomer);

}

handlePageChange = (pageNumber) => {
  console.log(`active page is ${pageNumber}`);

  this.setState({activePage: pageNumber});
}

      render() {
        const { items = [], loading} = this.props;
        const { newCustomers, sectionReload, alertDialog, editCustomerModal, addNewCustomerForm, editCustomer, snackbar, successMessage, addNewCustomerDetails } = this.state;
        // const {activePage} = this.state;

        return (       
          
          
        <div>

          
            <RctCollapsibleCard>

                <div className={'rct-block-title'}>
                    <h4><b>Lista Usuarios</b></h4>
                    <div className="contextual-link">
                        <a href="javascript:void(0)" onClick={() => this.onAddUsuario()}><i className="ti-plus"></i></a>
                    </div>
                </div>



            {loading &&
                <div className="d-flex justify-content-center loader-overlay">
                  <CircularProgress />
                </div>
              }
            <div className="table-responsive">
          
              <Table>
                <TableHead>
                  <TableRow hover>
                    <TableCell><b>Nombre</b></TableCell>
                    <TableCell><b>E-mail</b></TableCell>
                    <TableCell><b>Rol</b></TableCell>
                    <TableCell><b>Acciones</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <Fragment>
                    {items.map((n, index) => {
                      return (
                        <TableRow hover key={index}>
                          <TableCell>{n.name}</TableCell>
                          <TableCell>{n.email}</TableCell>
                          <TableCell>{n.clientRole || n.role}</TableCell>
                          <TableCell className="text-center">
                            {
                                n.role === 'operator' &&
                                <a className="mr-4" href="javascript:void(0)" onClick={() => this.onEditCustomer(n)}><i className="zmdi zmdi-edit"></i></a>
                            }
                            <a href="javascript:void(0)" onClick={() => this.onDeleteCustomer(n)}><i className="zmdi zmdi-delete"></i></a>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </Fragment>
                </TableBody>
              </Table>
              {/* <div className="d-flex justify-content-center mt-4">
              <Pagination
                    activePage={activePage}
                    itemsCountPerPage={3}
                    totalItemsCount={items.length}
                    onChange={this.handlePageChange}
                    itemClass="page-item"
                    linkClass="page-link"
                />
              </div> */}
            </div>
          </RctCollapsibleCard>



<Dialog
                    open={alertDialog}
                    onClose={this.handleClose}
                >
                    <DialogTitle>{"Estas seguro de eliminarlo?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                           Estas seguro de eliminarlo del espacio de trabajo.
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
{/* Customer Edit Modal*/}
                {editCustomerModal &&
                    <Modal
                        isOpen={editCustomerModal}
                        toggle={this.toggleEditCustomerModal}
                    >
                        <ModalHeader toggle={this.toggleEditCustomerModal}>
                            {addNewCustomerForm ? 'Invitar Usuario' : 'Editar Usuario'}
                        </ModalHeader>
                        <ModalBody>
                            {addNewCustomerForm ?
                                <Form  id="formAdd" onSubmit={this.handleSubmitAdd}>
                                  <FormGroup>
                                        <Label for="email">Email</Label>
                                        <Input
                                        autofocus="true"
                                            required="true"
                                            type="email"
                                            name="email"
                                            id="email"
                                            value={addNewCustomerDetails.email}
                                            onChange={(e) => this.onChangeCustomerAddNewForm('email', e.target.value)} />
                                    </FormGroup>
                                   
                                    <FormGroup>
                                        <Label for="name">Nombre</Label>
                                        <Input
                                            required="true"
                                            type="text"
                                            name="name"
                                            id="name"
                                            value={addNewCustomerDetails.name}
                                            onChange={(e) => this.onChangeCustomerAddNewForm('name', e.target.value)} />
                                    </FormGroup>
                                  
                                   
                                </Form>
                                : <Form id="formEdit" onSubmit={this.handleSubmitEdit} >
                                    <FormGroup>
                                        <Label for="email">Email</Label>
                                        <Input
                                            required="true"
                                            type="email"
                                            name="email"
                                            id="email"
                                            value={editCustomer.email}
                                            onChange={(e) => this.onChangeCustomerDetails('email', e.target.value)}
                                            disabled />
                                    </FormGroup>
                                   
                                    <FormGroup>
                                        <Label for="name">Nombre</Label>
                                        <Input
                                            required="true"
                                            type="text"
                                            name="name"
                                            id="name"
                                            value={editCustomer.name}
                                            onChange={(e) => this.onChangeCustomerDetails('name', e.target.value)}
                                            disabled />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="telefono">Rol de cliente</Label>
                                        <Input type="select" 
                                            name="role" 
                                            id="role" 
                                            value={editCustomer.clientRole}
                                            onChange={(e) => this.onChangeCustomerDetails('clientRole', e.target.value)} >
                                                <option value="admin">Admin de Cliente</option>
                                                <option value="operator">Solo Operador</option>
                                        </Input>
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
const mapStateToProps = ({ usuarios }) => {
    return usuarios;
  }
  
  export default connect(mapStateToProps, {
    getUsuarios,
    addUsuario,
    deleteUsuario,
    updateUsuario,
    updateUserWorkspaceRole,
  })(Usuarios);