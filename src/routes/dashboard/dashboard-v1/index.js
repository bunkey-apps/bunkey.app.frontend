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
    collapse: false
}

onCollapse() {
    this.setState({ collapse: !this.state.collapse });
}
  render() {
    
    const { collapse } = this.state;
    return (
      <div className="dashboard-v1">
        <RctCollapsibleCard>
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

        <RctCollapsibleCard>
        <div className={'rct-block-title'}>
                    <h4 className="titulo-vistas-recientemente"><b>Vistos Recientemente</b></h4>
                    
                </div>
        






<div>
      <GridList className="grid-list-videos" cols={4.5}>
        {tileData.map(tile => (
          <GridListTile key={tile.img}>
            <img src={tile.img} alt={tile.title} onClick={() => this.onCollapse()} />
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
                  <iframe className="embed-responsive-item" src="https://www.youtube.com/embed/v64KOxKVLVg" ></iframe>
              </div>
              </div>
              <div className="col-sm-4 col-md-3 col-lg-4">
                <div className="fondo-videos-padding-top-desc">
                     <h3 className="text-white">360° Underwater National Park | National Geographic</h3>

                      </div>
                <div>
                <b className="text-white">8 min</b>
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
                    <h4 className="titulo-vistas-nombre-cliente"><b>Nombre Cliente</b></h4>
                    
                </div>
        
                <div>
     
          <div className="row row-eq-height text-center">
              <div className="col-sm-2 col-md-1 col-lg-2">
                   <i className="zmdi zmdi-folder-outline zmdi-hc-5x"></i>
                   <p>Lorem Ipsum</p>
              </div>
              <div className="col-sm-2 col-md-1 col-lg-2">
                   <i className="zmdi zmdi-folder-outline zmdi-hc-5x"></i>
                   <p>Lorem Ipsum</p>
              </div>
              <div className="col-sm-2 col-md-1 col-lg-2">
                   <i className="zmdi zmdi-folder-outline zmdi-hc-5x"></i>
                   <p>Lorem Ipsum</p>
              </div>
              <div className="col-sm-2 col-md-1 col-lg-2">
                   <i className="zmdi zmdi-folder-outline zmdi-hc-5x"></i>
                   <p>Lorem Ipsum</p>
              </div>
              <div className="col-sm-2 col-md-1 col-lg-2">
                   <i className="zmdi zmdi-folder-outline zmdi-hc-5x"></i>
                   <p>Lorem Ipsum</p>
              </div>
              <div className="col-sm-2 col-md-1 col-lg-2">
                   <i className="zmdi zmdi-folder-outline zmdi-hc-5x"></i>
                   <p>Lorem Ipsum</p>
              </div>
           </div>
      
       
      
      
    </div>



      </RctCollapsibleCard>




      <RctCollapsibleCard>
        <div className={'rct-block-title'}>
                    <h4 className="titulo-vistas-mis-contenidos"><b>Mis Contenidos</b></h4>
                    
                </div>
        
                <div>
     
          <div className="row row-eq-height text-center">
              <div className="col-sm-2 col-md-1 col-lg-2">
                   <i className="zmdi zmdi-folder-outline zmdi-hc-5x"></i>
                   <p>Lorem Ipsum</p>
              </div>
              <div className="col-sm-2 col-md-1 col-lg-2">
                   <i className="zmdi zmdi-folder-outline zmdi-hc-5x"></i>
                   <p>Lorem Ipsum</p>
              </div>
              <div className="col-sm-2 col-md-1 col-lg-2">
                   <i className="zmdi zmdi-folder-outline zmdi-hc-5x"></i>
                   <p>Lorem Ipsum</p>
              </div>
              <div className="col-sm-2 col-md-1 col-lg-2">
                   <i className="zmdi zmdi-folder-outline zmdi-hc-5x"></i>
                   <p>Lorem Ipsum</p>
              </div>
              <div className="col-sm-2 col-md-1 col-lg-2">
                   <i className="zmdi zmdi-folder-outline zmdi-hc-5x"></i>
                   <p>Lorem Ipsum</p>
              </div>
              <div className="col-sm-2 col-md-1 col-lg-2">
                   <i className="zmdi zmdi-folder-outline zmdi-hc-5x"></i>
                   <p>Lorem Ipsum</p>
              </div>
           </div>
      
       
      
      
    </div>



      </RctCollapsibleCard>

      </div>
    );
  }
}
