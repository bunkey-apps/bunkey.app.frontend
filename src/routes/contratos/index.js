/*
 * Dashboard Page
 */
import React, { Component, Fragment } from 'react';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import { Media } from 'reactstrap';
import IconButton from 'material-ui/IconButton';
import axios from 'axios';

// page title bar
import PageTitleBar from '../../components/PageTitleBar/PageTitleBar';

// intl messages
import IntlMessages from '../../util/IntlMessages';

// rct card box
import RctCollapsibleCard from '../../components/RctCollapsibleCard/RctCollapsibleCard';

import Contratos from './components/Contratos';


// app config
import AppConfig from '../../constants/AppConfig';



// For Basic Table
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


class ContratosPage extends Component {
  render() {
    const { match } = this.props;
     return (
        <div className="dashboard-v1">
           
            <PageTitleBar title={<IntlMessages id="Contratos" />} match={match} />

          <Contratos />

       

        <RctCollapsibleCard>
        <div className={'rct-block-title'}>
                    <h4><b>Consolidado</b></h4>
                    
                </div>
          <div className="table-responsive">
            <Table>
              <TableHead>
                <TableRow hover>
                  <TableCell>Total Contrato</TableCell>
                  <TableCell>Pagado</TableCell>
                  <TableCell>Adeudado</TableCell>
                  <TableCell>Atrasado</TableCell>
                  
                </TableRow>
              </TableHead>
              <TableBody>
                <Fragment>
                 
                      <TableRow>
                        <TableCell>$ 6.000.000</TableCell>
                        <TableCell>$ 4.500.000</TableCell>
                        <TableCell>$ 1.500.000</TableCell>
                        <TableCell>$ 0</TableCell>
                      </TableRow>
                   
                </Fragment>
              </TableBody>
            </Table>
          </div>
        </RctCollapsibleCard>


        </div>
     )
  }
}
 
export default ContratosPage;