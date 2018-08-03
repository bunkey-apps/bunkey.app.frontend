import React, { Component, Fragment } from 'react';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import { Media } from 'reactstrap';
import IconButton from 'material-ui/IconButton';
import axios from 'axios';
import { connect } from "react-redux";
import { CircularProgress } from 'material-ui/Progress';
import { withRouter } from 'react-router-dom';
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
    getContratos,
    addContrato,
    updateContrato,
    deleteContrato
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

  

class Contratos extends Component {
    
    constructor() {
        super()
        this.state = { 
          addNewCustomerForm: false,
          editCustomerModal: false,
          editCustomer: null,
          selectedDeletedCustomer: null,
          alertDialog: false,
          addNewCustomerDetails: {
                client: '',
                monthlyPaymentDay: '',
                monthlyCost: '',
                startDate: '',
                endDate: '',
                sizeTotal: '',
                sizeVideoRow: '',
                sizeVideoFinal: ''
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
        this.onSubmitAddNewContratoForm();
      }

      componentWillMount() {
        this.props.getContratos();
      }
     
      onAddContrato() {
        this.setState({
            editCustomerModal: true,
            addNewCustomerForm: true,
            editCustomer: null,
            addNewCustomerDetails: {
              client: '',
              monthlyPaymentDay: 5,
              monthlyCost: '',
              startDate: '',
              endDate: '',
              sizeTotal: '',
              sizeVideoRow: '',
              sizeVideoFinal: ''
          }
        }); 
    }

     // on change customer details
     onChangeCustomerDetails(key, value) {
        if(key === 'sizeVideoRow'){
            var numAux = 0;
            if(this.state.editCustomer.sizeVideoFinal){
                numAux = Number.parseInt(this.state.editCustomer.sizeVideoFinal)
            }
            this.state.editCustomer.sizeTotal =  Number.parseInt(value) + numAux;
        }
        if(key === 'sizeVideoFinal'){
            var numAux = 0;
            if(this.state.editCustomer.sizeVideoRow){
                numAux = Number.parseInt(this.state.editCustomer.sizeVideoRow)
            }
            this.state.editCustomer.sizeTotal =  Number.parseInt(value) + numAux;
        }
      this.setState({
          editCustomer: {
              ...this.state.editCustomer,
              [key]: value
          }
      });
  }
    // on change customer add new form value
    onChangeCustomerAddNewForm(key, value) {
        if(key === 'sizeVideoRow'){
            var numAux = 0;
            if(this.state.addNewCustomerDetails.sizeVideoFinal){
                numAux = Number.parseInt(this.state.addNewCustomerDetails.sizeVideoFinal)
            }
            this.state.addNewCustomerDetails.sizeTotal =  Number.parseInt(value) + numAux;
        }
        if(key === 'sizeVideoFinal'){
            var numAux = 0;
            if(this.state.addNewCustomerDetails.sizeVideoRow){
                numAux = Number.parseInt(this.state.addNewCustomerDetails.sizeVideoRow)
            }
            this.state.addNewCustomerDetails.sizeTotal =  Number.parseInt(value) + numAux;
        }

        if(key === 'startDate'){
            var fechaAux  =   moment(value)
          
            fechaAux.add(1, 'year');
            this.state.addNewCustomerDetails.endDate = fechaAux ;
        }
    
      this.setState({
          addNewCustomerDetails: {
              ...this.state.addNewCustomerDetails,
              [key]: value
          }
      })
  }

  // on submit add new customer form
  onSubmitAddNewContratoForm() {
    const { addNewCustomerDetails } = this.state;
    console.log('addNewCustomerDetails',addNewCustomerDetails);
    if (addNewCustomerDetails.monthlyPaymentDay !== '' && addNewCustomerDetails.monthlyCost !== '' && addNewCustomerDetails.startDate !== '' 
    && addNewCustomerDetails.endDate !== '' && addNewCustomerDetails.sizeTotal !== ''  && addNewCustomerDetails.sizeVideoRow !== ''
    && addNewCustomerDetails.sizeVideoFinal !== '') {
        this.setState({ editCustomerModal: false});
        console.log(' contrato addNewCustomerDetails',addNewCustomerDetails);
       this.props.addContrato(addNewCustomerDetails);
        // test despues borrrar y detectar cuando responde el crear
        setTimeout(() => {
          this.props.getContratos();
      }, 1000);
        
    }
}

onSubmitCustomerEditDetailForm() {
    const { editCustomer } = this.state;
    console.log('editCustomer',editCustomer);
    if (editCustomer.monthlyPaymentDay !== '' && editCustomer.monthlyCost !== '' && editCustomer.startDate !== '' 
    && editCustomer.endDate !== '' && editCustomer.sizeTotal !== ''  && editCustomer.sizeVideoRow !== ''
    && editCustomer.sizeVideoFinal !== '') {
        this.setState({ editCustomerModal: false});
        console.log(' contrato editCustomer',editCustomer);
       this.props.updateContrato(editCustomer);
        // test despues borrrar y detectar cuando responde el crear
        setTimeout(() => {
          this.props.getContratos();
      }, 1000);
        
    }
}
onEditCustomer(customer) {
    console.log('customer',customer);
    customer.sizeTotal =  customer.plan.sizeTotal;
    customer.sizeVideoRow =  customer.plan.sizeVideoRow;
    customer.sizeVideoFinal =  customer.plan.sizeVideoFinal;
    this.setState({ editCustomerModal: true, editCustomer: customer, addNewCustomerForm: false });
}

toggleEditCustomerModal = () => {
    this.setState({
        editCustomerModal: !this.state.editCustomerModal
    });
}

onDeleteCustomer(customer) {
    this.setState({ alertDialog: true, selectedDeletedCustomer: customer });
}

deleteCustomer() {
    this.setState({ alertDialog: false});
   
    console.log('this.state.selectedDeletedCustomer',this.state.selectedDeletedCustomer);
    this.props.deleteContrato(this.state.selectedDeletedCustomer);
    // test despues borrrar y detectar cuando responde el crear
    setTimeout(() => {
      this.props.getContratos();
  }, 1000);
}
handleClose = () => {
    console.log('handleClose');
  this.setState({ alertDialog: false });
}

getPagos = (pagos) => {
    console.log('pagos',pagos);
    localStorage.setItem("pagosContrato", JSON.stringify(pagos));
       const { match, history } = this.props;
        history.push('/app/pagos');
    
   }
      render() {
        const { items, loading } = this.props;
        const { newCustomers, sectionReload, alertDialog, editCustomerModal, addNewCustomerForm, editCustomer, snackbar, successMessage, addNewCustomerDetails } = this.state;

        return (       
          
          
        <div>


          
            <RctCollapsibleCard >
            
            <div className={'rct-block-title'}>
                    <h4><b>Contratos</b></h4>
                    <div className="contextual-link">
                        <a href="javascript:void(0)" onClick={() => this.onAddContrato()}><i className="ti-plus"></i></a>
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
                    <TableCell><b>Tamaño Total</b></TableCell>
                    <TableCell><b>Estado</b></TableCell>
                    <TableCell><b>Monto</b></TableCell>
                    <TableCell><b>Pagado</b></TableCell>
                    <TableCell><b>Acciones</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <Fragment>
                    {items.map((n, index) => {
                      return (
                        <TableRow hover key={index}>
                         <TableCell onClick={() => this.getPagos(n)}>{n.plan.sizeTotal}</TableCell>
                          <TableCell onClick={() => this.getPagos(n)}>Pendiente</TableCell>
                          <TableCell onClick={() => this.getPagos(n)}>${n.monthlyCost.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}</TableCell>
                          <TableCell onClick={() => this.getPagos(n)}>Atrasado</TableCell>
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
                            {addNewCustomerForm ? 'Crear Contrato' : 'Editar Contrato'}
                        </ModalHeader>
                        <ModalBody>
                            {addNewCustomerForm ?
                                <Form id="formAdd" onSubmit={this.handleSubmitAdd}>
                                <div className="row row-eq-height">
                                <div className="col-sm-6 col-md-5 col-lg-6">
                               
                                
                                  <FormGroup>
                                        <Label for="Dni">Tamaño Total (GB)</Label>
                                        <Input
                                           disabled
                                            type="number"
                                            name="sizeTotal"
                                            id="sizeTotal"
                                            value={addNewCustomerDetails.sizeTotal}
                                            onChange={(e) => this.onChangeCustomerAddNewForm('sizeTotal', e.target.value)}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="sizeVideoRow">Media (GB)</Label>
                                        <Input
                                            required="true"
                                            type="number"
                                            name="sizeVideoRow"
                                            id="sizeVideoRow"
                                            value={addNewCustomerDetails.sizeVideoRow}
                                            onChange={(e) => this.onChangeCustomerAddNewForm('sizeVideoRow', e.target.value)}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="sizeVideoFinal">Master (GB)</Label>
                                        <Input
                                            required="true"
                                            type="number"
                                            name="sizeVideoFinal"
                                            id="sizeVideoFinal"
                                            value={addNewCustomerDetails.sizeVideoFinal}
                                            onChange={(e) => this.onChangeCustomerAddNewForm('sizeVideoFinal', e.target.value)}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="monthlyPaymentDay">Día de pago mensual</Label>
                                        <Input type="select" 
                                            name="monthlyPaymentDay" 
                                            id="monthlyPaymentDay" 
                                            value={addNewCustomerDetails.monthlyPaymentDay}
                                            onChange={(e) => this.onChangeCustomerAddNewForm('monthlyPaymentDay', e.target.value)}
                                            >
                                                <option>5</option>
                                                <option>15</option>
                                                <option>25</option>
                                        </Input>
                                 
                                        
                                    </FormGroup>
                                    </div>
                                    <div className="col-sm-6 col-md-5 col-lg-6">
                               
                                    <FormGroup>
                                        <Label for="monthlyCost">Cobro Mensual</Label>
                                        <Input
                                            required="true"
                                            type="number"
                                            name="monthlyCost"
                                            id="monthlyCost"
                                            value={addNewCustomerDetails.monthlyCost}
                                            onChange={(e) => this.onChangeCustomerAddNewForm('monthlyCost', e.target.value)}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="startDate">Fecha de inicio</Label>
                                        <Input
                                            required="true"
                                            type="date"
                                            name="startDate"
                                            id="startDate"
                                            value={addNewCustomerDetails.startDate}
                                            onChange={(e) => this.onChangeCustomerAddNewForm('startDate', e.target.value)}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="endDate">Fecha de término</Label>
                                        <Input
                                            required="true"
                                            type="date"
                                            name="endDate"
                                            id="endDate"
                                            value={moment(new Date(addNewCustomerDetails.endDate)).format('YYYY-MM-DD')} 
                                            onChange={(e) => this.onChangeCustomerAddNewForm('endDate', e.target.value)}
                                        />
                                    </FormGroup>
                                    </div>
                                    </div>
                                </Form>
                                : <Form id="formEdit" onSubmit={this.handleSubmitEdit} >
                                <div className="row row-eq-height">
                                <div className="col-sm-6 col-md-5 col-lg-6">
                                    <FormGroup>
                                        <Label for="Dni">Tamaño Total (GB)</Label>
                                        <Input
                                            disabled
                                            type="number"
                                            name="sizeTotal"
                                            id="sizeTotal"
                                            value={editCustomer.sizeTotal}
                                            onChange={(e) => this.onChangeCustomerDetails('sizeTotal', e.target.value)}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="sizeVideoRow">Media (GB)</Label>
                                        <Input
                                            required="true"
                                            type="number"
                                            name="sizeVideoRow"
                                            id="sizeVideoRow"
                                            value={editCustomer.sizeVideoRow}
                                            onChange={(e) => this.onChangeCustomerDetails('sizeVideoRow', e.target.value)}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="sizeVideoFinal">Master (GB)</Label>
                                        <Input
                                            required="true"
                                            type="number"
                                            name="sizeVideoFinal"
                                            id="sizeVideoFinal"
                                            value={editCustomer.sizeVideoFinal}
                                            onChange={(e) => this.onChangeCustomerDetails('sizeVideoFinal', e.target.value)}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="monthlyPaymentDay">Día de pago mensual</Label>
                                        <Input type="select" 
                                            name="monthlyPaymentDay" 
                                            id="monthlyPaymentDay" 
                                            value={editCustomer.monthlyPaymentDay}
                                            onChange={(e) => this.onChangeCustomerDetails('monthlyPaymentDay', e.target.value)}
                                            >
                                                <option>5</option>
                                                <option>15</option>
                                                <option>25</option>
                                        </Input>
                                       
                                       
                                    </FormGroup>
                                    </div>
                                    <div className="col-sm-6 col-md-5 col-lg-6">
                                    <FormGroup>
                                        <Label for="monthlyCost">Cobro Mensual</Label>
                                        <Input
                                            required="true"
                                            type="number"
                                            name="monthlyCost"
                                            id="monthlyCost"
                                            value={editCustomer.monthlyCost}
                                            onChange={(e) => this.onChangeCustomerDetails('monthlyCost', e.target.value)}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="startDate">Fecha de inicio</Label>
                                        <Input
                                            required="true"
                                            type="date"
                                            name="startDate"
                                            id="startDate"
                                            value={moment(new Date(editCustomer.startDate)).format('YYYY-MM-DD')}
                                            onChange={(e) => this.onChangeCustomerDetails('startDate', e.target.value)}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="endDate">Fecha de término</Label>
                                        <Input
                                            required="true"
                                            type="date"
                                            name="endDate"
                                            id="endDate"
                                            value={moment(new Date(editCustomer.endDate)).format('YYYY-MM-DD')} 
                                            onChange={(e) => this.onChangeCustomerDetails('endDate', e.target.value)}
                                        />
                                    </FormGroup>
                                    </div>
                                    </div>
                                </Form>
                            }
                        </ModalBody>
                        <ModalFooter>
                            {addNewCustomerForm ?
                                <div>
                                    <Button variant="raised" className="btn-danger text-white alert-botton-cancel-margin" onClick={this.toggleEditCustomerModal}><IntlMessages id="button.cancel" /></Button>
                                    <Button type="submit" form="formAdd" variant="raised" className="btn-primary text-white"><IntlMessages id="button.add" /></Button>{' '}
                                </div>
                                : <div><Button variant="raised" className="btn-danger text-white alert-botton-cancel-margin" onClick={this.toggleEditCustomerModal}><IntlMessages id="button.cancel" /></Button>
                                <Button type="submit" form="formEdit" variant="raised" className="btn-primary text-white"><IntlMessages id="button.update" /></Button>{' '}</div>
                            }
                        </ModalFooter>
                    </Modal>
                }
          </div>
          
        )
      }
    }
   
// map state to props
const mapStateToProps = ({ contratos }) => {
    return contratos;
  }
  
  export default withRouter(connect(mapStateToProps, {
    getContratos,addContrato,updateContrato, deleteContrato
  })(Contratos));