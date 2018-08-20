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
        <div className="margen-busqueda">
          <h3><b>Encuentra tu contenido de forma simple</b></h3>
          <p>Busca por palabra, frase o palabras compuestas</p>
          </div>
          <div className="input-group col-md-4">
            <input className="form-control py-2 border-right-0 border" type="text" placeholder="Encontrar imagenes, videos o vectores" id="example-search-input">
            </input>
            <span className="input-group-append">
              <button className="btn btn-outline-secondary border-left-0 border" type="button">
                <i className="fa fa-search"></i>
              </button>
            </span>
          </div>

        </RctCollapsibleCard>


        <Form >
          <div className="row row-eq-height">
          <div className="col-sm-2 col-md-1 col-lg-2">
          <FormGroup className="border-select-resultado">
                <Input type="select"
                  name="tipoArchivo"
                  id="tipoArchivo"
                  value='tipoArchivorole'
                  className="select-resultados"
                >
                  <option value="tipoArchivo">Tipo de Archivo</option>
                  <option value="tipoArchivo">Video</option>
                  <option value="tipoArchivo">Imagen</option>
                </Input>
              </FormGroup>
            </div>

             <div className="col-sm-1 col-md-1 col-lg-1">
            <FormGroup>
                <Input type="select"
                  name="lugar"
                  id="lugar"
                  value='lugar'
                  className="select-resultados"
                >
                  <option value="lugar">Lugar</option>
                  <option value="Rural">Rural</option>
                  <option value="Playa">Playa</option>
                </Input>
              </FormGroup>

            </div>
            <div className="col-sm-1 col-md-1 col-lg-1">
            <FormGroup>
                <Input type="select"
                  name="fecha"
                  id="fecha"
                  value='fecha'
                  className="select-resultados"
                >
                  <option value="fecha">Fecha</option>
                  <option value="Hoy">Hoy</option>
                  <option value="Ayer">Ayer</option>
                </Input>
              </FormGroup>
            </div>
            <div className="col-sm-2 col-md-1 col-lg-2">
            <FormGroup>
                <Input type="select"
                  name="tags"
                  id="tags"
                  value='tags'
                  className="select-resultados"
                >
                  <option value="tags">Tags Audiovisuales</option>
                  <option value="dron">Dron</option>
                  <option value="santiago">Santiago</option>
                </Input>
              </FormGroup>
            </div>


          </div>






        </Form>

        <RctCollapsibleCard>


          <div>
            <GridList cols={4}>
              {tileData.map((tile, index) => (
                <GridListTile key={tile.img}>
                  <img src={tile.img} alt={tile.title} onClick={() => this.onCollapse(tile)} />

                  <GridListTileBar
                    title={tile.title}

                    actionIcon={
                      <div>
                        <IconButton> <i className="zmdi zmdi-star-outline text-white"></i></IconButton>
                        <IconButton> <i className="zmdi zmdi-share text-white"></i></IconButton>
                        <IconButton> <i className="zmdi zmdi-download text-white"></i></IconButton>

                      </div>

                    }
                  />
                </GridListTile>
              ))}
            </GridList>

            <br></br>
            <br></br>


            <Collapse isOpen={collapse}>
              <div className="row row-eq-height text-center fondo-videos-seleccionado collapse" id="collapseExample">
                <div className="col-sm-2 col-md-1 col-lg-2">

                </div>
                <div className="col-sm-6 col-md-5 col-lg-6">
                  <div className="embed-responsive embed-responsive-16by9">
                    <iframe className="embed-responsive-item" src={urlVideo} ></iframe>


                  </div>
                </div>
                <div className="col-sm-4 col-md-3 col-lg-4">
                  <div className="fondo-videos-padding-top-desc">
                    <h3 className="text-white">{author}</h3>

                  </div>
                  <div>
                    <b className="text-white">{title}</b>
                    <IconButton> <i className="zmdi zmdi-star-outline text-white"></i></IconButton>
                    <IconButton> <i className="zmdi zmdi-share text-white"></i></IconButton>
                    <IconButton> <i className="zmdi zmdi-download text-white"></i></IconButton>
                  </div>

                </div>

              </div>

            </Collapse>


          </div>







        </RctCollapsibleCard>



      </div>
    );
  }
}
