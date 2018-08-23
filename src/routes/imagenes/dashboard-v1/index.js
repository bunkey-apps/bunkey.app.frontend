/**
 * Dashboard V1
 */
/* eslint-disable */
import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button, CardLink, CardGroup, CardImgOverlay } from 'reactstrap';

// Widgets
import TotalEarnsWithAreaChartWidget from '../../../components/Widgets/TotalEarnsWithAreaChart';

import TotalSalesWidget from '../../../components/Widgets/TotalSales';
import NetProfitWidget from '../../../components/Widgets/NetProfit';
import TaxStatsWidget from '../../../components/Widgets/TaxStats';
import ExpensesWidget from '../../../components/Widgets/Expenses';
import OverallTrafficStatusWidget from '../../../components/Widgets/OverallTrafficStatus';

import ToDoListWidget from '../../../components/Widgets/ToDoList';
import NewCustomersWidget from '../../../components/Widgets/NewCustomers';
import Notifications from '../../../components/Widgets/Notifications';

import OrderStatusWidget from '../../../components/Widgets/OrderStatus';

import NewEmailsWidget from '../../../components/Widgets/NewEmails';
import EmployeePayrollWidget from '../../../components/Widgets/EmployeePayroll';

import SocialFeedsWidget from '../../../components/Widgets/SocialFeeds';

// page title bar
import PageTitleBar from '../../../components/PageTitleBar/PageTitleBar';

// intl messages
import IntlMessages from '../../../util/IntlMessages';

// rct card box
import RctCollapsibleCard from '../../../components/RctCollapsibleCard/RctCollapsibleCard';
import SingleLineGrid from '../../components/grid-list/components/SingleLineGrid';
import GridList, { GridListTile, GridListTileBar } from 'material-ui/GridList';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
// data File
import tileData from '../../components/grid-list/components/tileData';
import tileDataImage from '../../components/grid-list/components/tileDataImage';

import { Collapse } from 'reactstrap';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';

// resultado data
import {
  totalEarns,
  todoData,
  newCustomers,
  messages,
  notificationTypes,
  notifications,
  ordersStatus,
  newEmails,
  employeePayroll,
  feeds,
  trafficStatus,
  totalSales,
  netProfit,
  taxStats,
  expenses
} from './data';
const styles = theme => ({
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  }
});


// Main Component
export default class Resultados extends Component {

  state = {
    collapse: false,
    urlVideo: '',
    author: '',
    title: ''
  }


  onCollapse(title) {
    console.log('2');
    if (!this.state.collapse) {
      setTimeout(function () {
        window.scrollTo(500, 600);
      }, 500);

    }
    this.setState({ collapse: !this.state.collapse, urlVideo: title.link, author: title.author, title: title.title });


  }
  render() {

    const { collapse } = this.state;
    const { urlVideo } = this.state;
    const { author } = this.state;
    const { title } = this.state;
    return (
      <div className="dashboard-v1">
        <RctCollapsibleCard>
        <div className="fondo-busqueda text-white">


            <div className="margen-busqueda text-white padding-top-busqueda">
              <h3><b classNmae="text-white">Encuentra tu contenido de forma simple</b></h3>
              <p className="text-white">Busca por palabra, frase o palabras compuestas</p>
            </div>
            <div>


              <div className="row">
                <div className="input-group col-md-6 padding-bottom-busqueda padding-left-input-search">

                  <input className="form-control py-2 border-right-0 border input-search-form-new" type="text" placeholder="Encontrar imagenes, videos o vectores" id="example-search-input">
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
                  >
                    <option value="tipoArchivo">Tipo de Archivo</option>
                    <option value="Video">Video</option>
                    <option value="Imagen">Imagen</option>
                  </Input>
                  <i class="fa fa-chevron-down flecha-select-test"></i>
                </div>
                <div className="input-group col-md-2 padding-bottom-busqueda">
                  <button  className="btn btn-outline-secondary color-boton-lupa-busqueda lupa-form-search" type="button">
                    <i className="fa fa-search"></i>
                  </button>
                </div>
              </div>
            </div>
</div>

        </RctCollapsibleCard>


        <Form >
          <div className="row row-eq-height">
          <div className="col-sm-2 col-md-1 col-lg-2">
          <FormGroup className="border-select-resultado">
                <Input type="select"
                  name="tipoArchivo"
                  id="tipoArchivo"
                  className="select-resultados"
                >
                  <option value="tipoArchivo">Tipo de Archivo</option>
                  <option value="Video">Video</option>
                  <option value="Imagen">Imagen</option>
                </Input>
                <i class="fa fa-chevron-down select-resultados-flecha"></i>
              </FormGroup>
            </div>

             <div className="col-sm-2 col-md-1 col-lg-2">
            <FormGroup>
                <Input type="select"
                  name="lugar"
                  id="lugar"
                  className="select-resultados"
                >
                  <option value="lugar">Lugar</option>
                  <option value="Rural">Rural</option>
                  <option value="Playa">Playa</option>
                </Input>
                <i class="fa fa-chevron-down select-resultados-flecha"></i>
              </FormGroup>

            </div>
            <div className="col-sm-2 col-md-1 col-lg-2">
            <FormGroup>
                <Input type="select"
                  name="fecha"
                  id="fecha"
                  className="select-resultados"
                >
                  <option value="fecha">Fecha</option>
                  <option value="Hoy">Hoy</option>
                  <option value="Ayer">Ayer</option>
                </Input>
                <i class="fa fa-chevron-down select-resultados-flecha"></i>
              </FormGroup>
            </div>
            <div className="col-sm-3 col-md-2 col-lg-3">
            <FormGroup>
                <Input type="select"
                  name="tags"
                  id="tags"
                  className="select-resultados"
                >
                  <option value="tags">Tags Audiovisuales</option>
                  <option value="dron">Dron</option>
                  <option value="santiago">Santiago</option>
                </Input>
                <i class="fa fa-chevron-down select-resultados-flecha"></i>
              </FormGroup>
            </div>


          </div>






        </Form>

        <RctCollapsibleCard>


          <div>
            <GridList cols={4}>
              {tileDataImage.map((tile, index) => (
                 <img src={tile.img} alt={tile.title} />
              ))}
            </GridList>

            <br></br>
            <br></br>



          </div>







        </RctCollapsibleCard>



      </div>
    );
  }
}
