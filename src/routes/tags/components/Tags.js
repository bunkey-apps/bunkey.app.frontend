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

  // redux action
  import {
    getTags,
    addTags,
    deleteTag,
    updateTags
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

  

class Tags extends Component {
    
    constructor() {
        super()
        this.state = { 
          addNewCustomerForm: false,
          editCustomerModal: false,
          editCustomer: null,
          selectedDeletedCustomer: null,
          alertDialog: false,
          addNewCustomerDetails: {
                name: ''
            }
      }
      this.handleSubmitAdd = this.handleSubmitAdd.bind(this);
      this.handleSubmitEdit = this.handleSubmitEdit.bind(this);
      }
      handleSubmitEdit(event) {
        event.preventDefault();
        this.onSubmitCustomerEditDetailForm();
      }
    handleSubmitAdd(event) {
        event.preventDefault();
        this.onSubmitAddNewCustomerForm();
      }
      componentWillMount() {
        this.props.getTags();
      }

      onAddUsuario() {
        this.setState({
            editCustomerModal: true,
            addNewCustomerForm: true,
            editCustomer: null,
            addNewCustomerDetails: {
                name: ''
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
    if (addNewCustomerDetails.name) {
        this.setState({ editCustomerModal: false});
        console.log('addNewCustomerDetails',addNewCustomerDetails);
        this.props.addTags(addNewCustomerDetails);
        // test despues borrrar y detectar cuando responde el crear
        setTimeout(() => {
          this.props.getTags();
      }, 1000);
        
    }
}

onSubmitCustomerEditDetailForm() {
  const { editCustomer } = this.state;
  if (editCustomer.name) {
      this.setState({ editCustomerModal: false});
      console.log('editCustomer',editCustomer);
      
      this.props.updateTags(editCustomer);
      // test despues borrrar y detectar cuando responde el crear
      setTimeout(() => {
        this.props.getTags();
    }, 1000);
      
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
  this.props.deleteTag(this.state.selectedDeletedCustomer);
  // test despues borrrar y detectar cuando responde el crear
  setTimeout(() => {
    this.props.getTags();
}, 1000);
}

      render() {
        const { items, loading } = this.props;
        const { newCustomers, sectionReload, alertDialog, editCustomerModal, addNewCustomerForm, editCustomer, snackbar, successMessage, addNewCustomerDetails } = this.state;
        
        return (       
          
          
        <div>


          
            <RctCollapsibleCard>

                <div className={'rct-block-title'}>
                    <h4><b>Lista de Tags</b></h4>
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
                    <TableCell><b>name</b></TableCell>
                    <TableCell><b>Acciones</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <Fragment>
                    {items.map((n, index) => {
                      return (
                        <TableRow hover key={index}>
                          <TableCell>{n.name}</TableCell>
                          <TableCell>
                          <div className="row">
                          <div className="col-md-6">
                          <a href="javascript:void(0)"  onClick={() => this.onEditCustomer(n)}>
                                        <i className="zmdi zmdi-edit"></i>
                                    </a>
                          </div>
                          <div className="col-md-6">
                          <a href="javascript:void(0)"   onClick={() => this.onDeleteCustomer(n)}>
                                        <i className="zmdi zmdi-delete"></i>
                                    </a>
                          </div>
                          </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </Fragment>
                </TableBody>
              </Table>
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
                            {addNewCustomerForm ? 'Crear Tag' : 'Editar Tag'}
                        </ModalHeader>
                        <ModalBody>
                            {addNewCustomerForm ?
                                <Form  id="formAdd" onSubmit={this.handleSubmitAdd}>
                                  
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
const mapStateToProps = ({ tags }) => {
    return tags;
  }
  
  export default connect(mapStateToProps, {
    getTags,addTags,deleteTag,updateTags
  })(Tags);