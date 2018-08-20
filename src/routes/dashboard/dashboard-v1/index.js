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
import { withRouter } from 'react-router-dom';
// dashboard data
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
export default class DashboardOne extends Component {

  state = {
    collapse: false,
    urlVideo: '',
    author: '',
    title: ''
}

goToBusqueda = () => {
  
  const { match, history } = this.props;
   history.push('/app/resultados');

}
onCollapse(title) {
 
  if(!this.state.collapse){
    setTimeout(function() {
      window.scrollTo(500, 200);
    }, 500);
  
  }
    this.setState({ collapse: !this.state.collapse, urlVideo: title.link, author: title.author, title : title.title});
    
    
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
                <button onClick={() => this.goToBusqueda()} className="btn btn-outline-secondary border-left-0 border" type="button">
                    <i className="fa fa-search"></i>
                </button>
              </span>
        </div>

      </RctCollapsibleCard>

        <RctCollapsibleCard>
        <div className={'rct-block-title'}>
                    <h4 className="titulo-vistas-recientemente"><b>Vistos Recientemente</b></h4>
                    
                </div>
        






<div>
      <GridList className="grid-list-videos" cols={4.5}>
        {tileData.map((tile,index) => (
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
        
       
      <RctCollapsibleCard>
        <div className={'rct-block-title'}>
                    <h4 className="titulo-vistas-nombre-cliente"><b>Bunkey</b></h4>
                    <div className="contextual-link">
                        <a>Ver más <i className="ti-plus"></i></a>
                    </div>
                </div>
        
                <div>
     
          <div className="row row-eq-height text-center">
         
              <div className="col-sm-2 col-md-1 col-lg-2">
              <ContextMenuTrigger id="SIMPLE" holdToDisplay={1000}>
                   <i className="zmdi zmdi-folder-outline zmdi-hc-5x"></i>
                   <p>Exterior</p>
                </ContextMenuTrigger>
              </div>
            
              <div className="col-sm-2 col-md-1 col-lg-2">
              <ContextMenuTrigger id="SIMPLE" holdToDisplay={1000}>
                   <i className="zmdi zmdi-folder-outline zmdi-hc-5x"></i>
                   <p>Brazoarmado</p>
                   </ContextMenuTrigger>
              </div>
              <div className="col-sm-2 col-md-1 col-lg-2">
                   <i className="zmdi zmdi-folder-outline zmdi-hc-5x"></i>
                   <p>Naturaleza</p>
              </div>
              <div className="col-sm-2 col-md-1 col-lg-2">
              <ContextMenuTrigger id="SIMPLE" holdToDisplay={1000}>
                   <i className="zmdi zmdi-folder-outline zmdi-hc-5x"></i>
                   <p>Playa</p>
                   </ContextMenuTrigger>
              </div>
              <div className="col-sm-2 col-md-1 col-lg-2">
              <ContextMenuTrigger id="SIMPLE" holdToDisplay={1000}>
                   <i className="zmdi zmdi-folder-outline zmdi-hc-5x"></i>
                   <p>Material jornada Nocturna</p>
                   </ContextMenuTrigger>
              </div>
              <div className="col-sm-2 col-md-1 col-lg-2">
              <ContextMenuTrigger id="SIMPLE" holdToDisplay={1000}>
                   <i className="zmdi zmdi-folder-outline zmdi-hc-5x"></i>
                   <p>Muestra servicios</p>
                   </ContextMenuTrigger>
              </div>
             
           </div>
      
       
      
      
    </div>


 <ContextMenu id="SIMPLE" className="click-derecho-bunkey">
                    <MenuItem  onClick={this.handleClick} data={{ item: 'item 1' }}>
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
                    
                    <MenuItem  onClick={this.handleClick} data={{ item: 'item 2' }}>
                      <i className="zmdi zmdi-long-arrow-tab color-header-bunkey padding-click-derecho padding-top-click-derecho"></i>
                      <span className="padding-click-derecho">Mover</span> 
                    </MenuItem>
                    
                    <MenuItem  onClick={this.handleClick} data={{ item: 'item 2' }}>
                      <i className="zmdi zmdi-star-outline color-header-bunkey padding-click-derecho padding-top-click-derecho"></i>
                      <span className="padding-click-derecho">Agregar a favoritos</span> 
                    </MenuItem>
                    <MenuItem  onClick={this.handleClick} data={{ item: 'item 2' }}>
                      <div className="line-click-derecho  padding-top-click-derecho"></div>
                     
                    </MenuItem>
                    <MenuItem  onClick={this.handleClick} data={{ item: 'item 2' }}>
                      <i className="zmdi ti-trash color-header-bunkey padding-click-derecho padding-top-click-derecho padding-bottom-click-derecho"></i>
                      <span className="padding-click-derecho">Eliminar</span> 
                    </MenuItem>
                    </ContextMenu>
      </RctCollapsibleCard>




      <RctCollapsibleCard>
        <div className={'rct-block-title'}>
                    <h4 className="titulo-vistas-mis-contenidos"><b>Mis Contenidos</b></h4>
                    <div className="contextual-link">
                        <a>Ver más <i className="ti-plus"></i></a>
                    </div>
                </div>
        
                <div>
     
            <div className="row row-eq-height text-center">
            <div className="col-sm-2 col-md-1 col-lg-2">
            <ContextMenuTrigger id="SIMPLE" holdToDisplay={1000}>
                   <i className="zmdi zmdi-folder-outline zmdi-hc-5x"></i>
                   <p>Naturaleza</p>
                   </ContextMenuTrigger>
              </div>
              <div className="col-sm-2 col-md-1 col-lg-2">
              <ContextMenuTrigger id="SIMPLE" holdToDisplay={1000}>
                   <i className="zmdi zmdi-folder-outline zmdi-hc-5x"></i>
                   <p>Muestra servicios</p>
                   </ContextMenuTrigger>
              </div>
              <div className="col-sm-2 col-md-1 col-lg-2">
              <ContextMenuTrigger id="SIMPLE" holdToDisplay={1000}>
                   <i className="zmdi zmdi-folder-outline zmdi-hc-5x"></i>
                   <p>Brazoarmado</p>
                   </ContextMenuTrigger>
              </div>
              <div className="col-sm-2 col-md-1 col-lg-2">
              <ContextMenuTrigger id="SIMPLE" holdToDisplay={1000}>
                   <i className="zmdi zmdi-folder-outline zmdi-hc-5x"></i>
                   <p>Material jornada Nocturna</p>
                   </ContextMenuTrigger>
              </div>
              <div className="col-sm-2 col-md-1 col-lg-2">
              <ContextMenuTrigger id="SIMPLE" holdToDisplay={1000}>
                   <i className="zmdi zmdi-folder-outline zmdi-hc-5x"></i>
                   <p>Playa</p>
                   </ContextMenuTrigger>
              </div>
              <div className="col-sm-2 col-md-1 col-lg-2">
              <ContextMenuTrigger id="SIMPLE" holdToDisplay={1000}>
                   <i className="zmdi zmdi-folder-outline zmdi-hc-5x"></i>
                   <p>Exterior</p>
                   </ContextMenuTrigger>
              </div>
              
           </div>
      
       
      
      
    </div>



      </RctCollapsibleCard>


      <RctCollapsibleCard>
        <div className={'rct-block-title'}>
                    <h4 className="titulo-contenidos-compartidos"><b>Contenidos Compartidos</b></h4>
                    <div className="contextual-link">
                        <a>Ver más <i className="ti-plus"></i></a>
                    </div>
                </div>
        
                <div>
     
            <div className="row row-eq-height text-center">
            <div className="col-sm-2 col-md-1 col-lg-2">
            <ContextMenuTrigger id="SIMPLE" holdToDisplay={1000}>
                   <i contextmenu="colorMenu" className="zmdi zmdi-folder-outline zmdi-hc-5x"></i>
                   <p>Video Muestra</p>
                   </ContextMenuTrigger>
              </div>
              <div className="col-sm-2 col-md-1 col-lg-2">
              <ContextMenuTrigger id="SIMPLE" holdToDisplay={1000}>
                   <i className="zmdi zmdi-folder-outline zmdi-hc-5x"></i>
                   <p>Mall Plaza</p>
                   </ContextMenuTrigger>
              </div>
              <div className="col-sm-2 col-md-1 col-lg-2">
              <ContextMenuTrigger id="SIMPLE" holdToDisplay={1000}>
                   <i className="zmdi zmdi-folder-outline zmdi-hc-5x"></i>
                   <p>Video Latam</p>
                   </ContextMenuTrigger>
              </div>
              <div className="col-sm-2 col-md-1 col-lg-2">
              <ContextMenuTrigger id="SIMPLE" holdToDisplay={1000}>
                   <i className="zmdi zmdi-folder-outline zmdi-hc-5x"></i>
                   <p>Toliv</p>
                   </ContextMenuTrigger>
              </div>
              <div className="col-sm-2 col-md-1 col-lg-2">
              <ContextMenuTrigger id="SIMPLE" holdToDisplay={1000}>
                   <i className="zmdi zmdi-folder-outline zmdi-hc-5x"></i>
                   <p>Resumen Clientes</p>
                   </ContextMenuTrigger>
              </div>
              <div className="col-sm-2 col-md-1 col-lg-2">
              <ContextMenuTrigger id="SIMPLE" holdToDisplay={1000}>
                   <i className="zmdi zmdi-folder-outline zmdi-hc-5x"></i>
                   <p>Sin titulo</p>
                   </ContextMenuTrigger>
              </div>
              
           </div>
      
       
      
      
    </div>



      </RctCollapsibleCard>

      </div>
    );
  }
}
