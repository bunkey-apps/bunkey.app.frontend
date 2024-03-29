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
import Pagination from "react-js-pagination";
import { Route, withRouter } from 'react-router-dom';

// page title bar
import PageTitleBar from '../../../components/PageTitleBar/PageTitleBar';

// intl messages
import IntlMessages from '../../../util/IntlMessages';

// rct card box
import RctCollapsibleCard from '../../../components/RctCollapsibleCard/RctCollapsibleCard';

// app config
import AppConfig from '../../../constants/AppConfig';
import Confirmar from './Confirmar';

// redux action
import {
    getPendingObject, confirmAllPending
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



class ListPending extends Component {

    constructor() {
        super()
        this.state = {
        }
       
        this.handlePageChange = this.handlePageChange.bind(this);

 

      }
  
      handlePageChange(pageNumber) {
        this.props.getPendingObject(pageNumber);
       
       
      }

     
      
  componentWillMount() {
  
    console.log('LIST PENDING');

    this.props.getPendingObject();
    
    
  }
  sendAllPending() {
    const { items } = this.props;

    console.log('sendAllPending',items);
    
  var arrPending = [];
    for(var i=0;i<items.length;i++){

      arrPending.push(items[i]._id);
    }
    console.log('arrPending',arrPending);
    this.props.confirmAllPending(arrPending);

    
  }

    
  goToHome = () => {

    this.props.history.push('/app/dashboard');

  }

 
  render() {

    const { loading,items,totalCount, limit,pageActive } = this.props;
    
    if (items.length > 0) {
      return (
      

        <div>
   {loading &&
              <div className="d-flex justify-content-center loader-overlay">
                <CircularProgress />
              </div>
            }
             <RctCollapsibleCard>
            <div className="" ref="topListPending">
            {/* <Button onClick={() => this.sendAllPending()} type="button" variant="raised" className="btn-primary text-white float-right-confirmar-todos"><IntlMessages id="Confirmar todos" /></Button> */}{' '}
  
            </div>
            </RctCollapsibleCard>
          <RctCollapsibleCard>
          {items.map((objectoPending, i) => (
                          <Confirmar key={i} objectoPending={objectoPending} />
                      ))}
          
          </RctCollapsibleCard>
  
  
   <div className="text-center">
    <Pagination
        hideNavigation
        activePage={pageActive}
        itemsCountPerPage={limit}
        totalItemsCount={totalCount}
        onChange={this.handlePageChange}
      />
        </div>
  
        </div>
      )
    }else{
      return (

        <div>
        {loading &&
                   <div className="d-flex justify-content-center loader-overlay">
                     <CircularProgress />
                   </div>
                 }
                  <RctCollapsibleCard>
                 <div className="" ref="topListPending">
                 {/* <Button onClick={() => this.sendAllPending()} type="button" variant="raised" className="btn-primary text-white float-right-confirmar-todos"><IntlMessages id="Confirmar todos" /></Button> */}{' '}
       
                 </div>
                 </RctCollapsibleCard>
               <RctCollapsibleCard>
               <div className="row row-eq-height text-center">
            <div className="col-md-12 mt-">
              <h1>No hay mas archivos por confirmar</h1>
            </div>
            <div className="col-md-12 mt-2">
              <button className="btn btn-outline-success" onClick={this.goToHome}>
                  <i className="fa fa-arrow-circle-left"></i> Volver
              </button>
            </div>
          </div>
               
               </RctCollapsibleCard>
       
       
        <div className="text-center">

             </div>
       
             </div>

      );
    }

  }
}

// map state to props
const mapStateToProps = ({ confirmar }) => {
  return confirmar;
}

export default withRouter(connect(mapStateToProps, {
    getPendingObject, confirmAllPending
})(ListPending));