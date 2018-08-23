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
import tileData from '../../components/grid-list/components/tileDataImage';
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
    collapse2: false,
    collapse3: false,
    urlVideo: '',
    author: '',
    title: '',
    index: 0
  }


  onCollapse(title, index) {
    console.log('index', index);
    if (!this.state.collapse) {
      setTimeout(function () {
        window.scrollTo(500, 320);
      }, 500);

    }
    this.setState({ collapse: !this.state.collapse, urlVideo: title.img, author: title.author, title: title.title, index: index, collapse2: false, collapse3: false });


  }

  onCollapse2(title, index) {
    console.log('index', index);
    if (!this.state.collapse) {
      setTimeout(function () {
        window.scrollTo(500, 600);
      }, 500);

    }
    this.setState({ collapse2: !this.state.collapse2, urlVideo: title.img, author: title.author, title: title.title, index: index, collapse: false, collapse3: false });


  }

  onCollapse3(title, index) {
    console.log('index', index);
    if (!this.state.collapse) {
      setTimeout(function () {
        window.scrollTo(500, 800);
      }, 500);

    }
    this.setState({ collapse3: !this.state.collapse3, urlVideo: title.img, author: title.author, title: title.title, index: index, collapse: false, collapse2: false });


  }

  onNext() {

    if (tileData.length >= this.state.index + 1) {
      var video = tileData[this.state.index + 1];
      this.setState({  urlVideo: video.img, author: video.author, video: video.title, index: this.state.index + 1 });

    }

  }
  onBack() {

    if (this.state.index - 1 >= 0) {
      var video = tileData[this.state.index - 1];
      this.setState({ urlVideo: video.img, author: video.author, video: video.title, index: this.state.index - 1 });

    }

  }
  render() {

    const { collapse } = this.state;
    const { collapse2 } = this.state;
    const { collapse3 } = this.state;
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
                    <option value="Imagen">imágen</option>
                    <option value="vector">vector</option>
                    <option value="clip">clip</option>
                  </Input>
                  <i class="fa fa-chevron-down flecha-select-test"></i>
                </div>
                <div className="input-group col-md-2 padding-bottom-busqueda">
                  <button className="btn btn-outline-secondary color-boton-lupa-busqueda lupa-form-search" type="button">
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
            <div className="gallery-wrapper">
              <div className="row text-white">
                <div className="col-sm-6 col-md-4 col-lg-4 col-xl-3">
                  <GridListTile key={tileData[0].img}>
                    <img className="imagenes-tam-grid" src={tileData[0].img} alt={tileData[0].title} onClick={() => this.onCollapse(tileData[0], 0)} />
                    
                  </GridListTile>
                </div>
                <div className="col-sm-6 col-md-4 col-lg-4 col-xl-3">
                  <GridListTile key={tileData[1].img}>
                    <img className="imagenes-tam-grid" src={tileData[1].img} alt={tileData[0].title} onClick={() => this.onCollapse(tileData[1], 1)} />
                   
                  </GridListTile>
                </div>
                <div className="col-sm-6 col-md-4 col-lg-4 col-xl-3">
                  <GridListTile key={tileData[2].img}>
                    <img  className="imagenes-tam-grid" src={tileData[2].img} alt={tileData[0].title} onClick={() => this.onCollapse(tileData[2], 2)} />
                   
                  </GridListTile>
                </div>
                <div className="col-sm-6 col-md-4 col-lg-4 col-xl-3">
                  <GridListTile key={tileData[3].img}>
                    <img  className="imagenes-tam-grid" src={tileData[3].img} alt={tileData[3].title} onClick={() => this.onCollapse(tileData[3], 3)} />
                    
                  </GridListTile>
                </div>

              </div>
            </div>



            <Collapse isOpen={collapse}>
              <br></br>
              <br></br>
              <div className="row row-eq-height text-center fondo-videos-seleccionado collapse" id="collapseExample">
                <div className="col-sm-2 col-md-1 col-lg-2">
                  <div className="volver-collap-video-image-left">
                    <i onClick={() => this.onBack()} className="zmdi ti-angle-left text-white"></i>

                  </div>

                </div>
                <div className="col-sm-6 col-md-5 col-lg-6">
                  <div className="embed-responsive embed-responsive-16by9">
                  <img className="embed-responsive-item" src={urlVideo} ></img>


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
                  <div className="volver-collap-video-image-right">
                    <i onClick={() => this.onNext()} className="zmdi   ti-angle-right text-white"></i>

                  </div>

                </div>

              </div>

            </Collapse>


            <div className="gallery-wrapper">
              <div className="row text-white">
                <div className="col-sm-6 col-md-4 col-lg-4 col-xl-3">
                  <GridListTile key={tileData[4].img}>
                    <img  className="imagenes-tam-grid" src={tileData[4].img} alt={tileData[4].title} onClick={() => this.onCollapse2(tileData[4], 4)} />
                    
                  </GridListTile>
                </div>
                <div className="col-sm-6 col-md-4 col-lg-4 col-xl-3">
                  <GridListTile key={tileData[5].img}>
                    <img className="imagenes-tam-grid"  src={tileData[5].img} alt={tileData[5].title} onClick={() => this.onCollapse2(tileData[5], 5)} />
                    
                  </GridListTile>
                </div>
                <div className="col-sm-6 col-md-4 col-lg-4 col-xl-3">
                  <GridListTile key={tileData[6].img}>
                    <img  className="imagenes-tam-grid" src={tileData[6].img} alt={tileData[6].title} onClick={() => this.onCollapse2(tileData[6], 6)} />
                    
                  </GridListTile>
                </div>
                <div className="col-sm-6 col-md-4 col-lg-4 col-xl-3">
                  <GridListTile key={tileData[7].img}>
                    <img className="imagenes-tam-grid"  src={tileData[7].img} alt={tileData[7].title} onClick={() => this.onCollapse2(tileData[7], 7)} />
                    
                  </GridListTile>
                </div>

              </div>
            </div>



            <Collapse isOpen={collapse2}>
              <br></br>
              <br></br>
              <div className="row row-eq-height text-center fondo-videos-seleccionado collapse" id="collapseExample">
                <div className="col-sm-2 col-md-1 col-lg-2">
                  <div className="volver-collap-video-image-left">
                    <i onClick={() => this.onBack()} className="zmdi ti-angle-left text-white"></i>

                  </div>

                </div>
                <div className="col-sm-6 col-md-5 col-lg-6">
                  <div className="embed-responsive embed-responsive-16by9">
                  <img className="embed-responsive-item" src={urlVideo} ></img>


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
                  <div className="volver-collap-video-image-right">
                    <i onClick={() => this.onNext()} className="zmdi   ti-angle-right text-white"></i>

                  </div>

                </div>

              </div>

            </Collapse>





<div className="gallery-wrapper">
              <div className="row text-white">
                <div className="col-sm-6 col-md-4 col-lg-4 col-xl-3">
                  <GridListTile key={tileData[8].img}>
                    <img className="imagenes-tam-grid"  src={tileData[8].img} alt={tileData[8].title} onClick={() => this.onCollapse3(tileData[8], 8)} />
                    
                  </GridListTile>
                </div>
                <div className="col-sm-6 col-md-4 col-lg-4 col-xl-3">
                  <GridListTile key={tileData[9].img}>
                    <img  className="imagenes-tam-grid" src={tileData[9].img} alt={tileData[9].title} onClick={() => this.onCollapse3(tileData[9], 9)} />
                   
                  </GridListTile>
                </div>
                <div className="col-sm-6 col-md-4 col-lg-4 col-xl-3">
                  <GridListTile key={tileData[10].img}>
                    <img  className="imagenes-tam-grid" src={tileData[10].img} alt={tileData[10].title} onClick={() => this.onCollapse3(tileData[10], 10)} />
                   
                  </GridListTile>
                </div>
                <div className="col-sm-6 col-md-4 col-lg-4 col-xl-3">
                  <GridListTile key={tileData[11].img}>
                    <img  className="imagenes-tam-grid" src={tileData[11].img} alt={tileData[11].title} onClick={() => this.onCollapse3(tileData[11], 11)} />
                   
                  </GridListTile>
                </div>

              </div>
            </div>



            <Collapse isOpen={collapse3}>
              <br></br>
              <br></br>
              <div className="row row-eq-height text-center fondo-videos-seleccionado collapse" id="collapseExample">
                <div className="col-sm-2 col-md-1 col-lg-2">
                  <div className="volver-collap-video-image-left">
                    <i onClick={() => this.onBack()} className="zmdi ti-angle-left text-white"></i>

                  </div>

                </div>
                <div className="col-sm-6 col-md-5 col-lg-6">
                  <div className="embed-responsive embed-responsive-16by9">
                    <img className="embed-responsive-item" src={urlVideo} ></img>


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
                  <div className="volver-collap-video-image-right">
                    <i onClick={() => this.onNext()} className="zmdi   ti-angle-right text-white"></i>

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
