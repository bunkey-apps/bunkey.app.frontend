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
import RctCollapsibleCard from '../../../components/RctCollapsibleCard/RctCollapsibleCard';



// For Basic Table 
let id = 0;

function createData(num, nombre, cantidad) {
  id += 1;
  return { id, num, nombre, cantidad };
}
function parseMes (month){
  var mes = '';
  switch (month) {

    case 'January':
      mes = "enero";
      break;
    case 'February':
      mes = "febrero";
      break;
    case 'March':
      mes = "marzo";
      break;
    case 'April':
      mes = "abril";
      break;
    case 'May':
      mes = "mayo";
      break;
    case 'June':
      mes = "junio";
      break;
    case 'July':
      mes = "julio";
      break;
    case 'August':
      mes = "agosto";
      break;
    case 'September':
      mes = "septiembre";
      break;
    case 'October':
      mes = "octubre";
      break;
    case 'November':
      mes = "noviembre";
      break;
    case 'December':
      mes = "diciembre";
      break;

  }
  
  return mes;
}

const data = [
    createData(1, 'Camara 3/4', 20),
    createData(2, 'Camara 3/4', 20),
    createData(3, 'Camara 3/4', 20)
  ];
  
 
class Pagos extends Component {
  
    constructor() {
        super()
        this.state = { 
          pagos: [],
          monto: ''
      }
      const pagosContrato = localStorage.getItem('pagosContrato');
      const pagosContratoJson = JSON.parse(pagosContrato);
      if(pagosContratoJson.payments){
        for(var i=0; i<pagosContratoJson.payments.length;i++){
          pagosContratoJson.payments[i].month = parseMes(pagosContratoJson.payments[i].month);
        }
      }
      
      console.log('pagosContratoJson',pagosContratoJson);
      this.state.pagos = pagosContratoJson.payments;
      this.state.monto = pagosContratoJson.monthlyCost;
    }

   


  render() {
     return (
        



       <RctCollapsibleCard>
       <div className={'rct-block-title'}>
                    <h4><b>Cartola</b></h4>
                    
                </div>
          <div className="table-responsive">
            <Table>
              <TableHead>
                <TableRow hover>
                  <TableCell><b>Monto</b></TableCell>
                  <TableCell><b>Mes</b></TableCell>
                  <TableCell><b>Estado</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <Fragment>
                {this.state.pagos.map((n, index) => {
                    return (
                      <TableRow hover key={index}>
                        <TableCell>${this.state.monto.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}</TableCell>
                        <TableCell>{n.month}</TableCell>
                        
                        {n.paymed ?  <TableCell>Pagado</TableCell> : <TableCell>Pendiente</TableCell>}

                      </TableRow>
                    );
                  })}
                </Fragment>
              </TableBody>
            </Table>
          </div>
        </RctCollapsibleCard>




      
     )
  }
}
 
export default Pagos;