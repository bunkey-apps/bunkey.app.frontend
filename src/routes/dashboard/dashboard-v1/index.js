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
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';

import Folders from './components/Folders';
import Favoritos from './components/Favoritos';



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
    history.push('/app/busqueda');

  }

  goToImagenes= () => {

    const { match, history } = this.props;
    history.push('/app/imagenes');

  }


  onCollapse(title) {

    if (!this.state.collapse) {
      setTimeout(function () {
        window.scrollTo(500, 400);
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
          <div className={'rct-block-title'}>
            <h4 className="titulo-vistas-recientemente"><b>Vistos Recientemente</b></h4>

          </div>



        


{false &&
  <div>
  <GridList className="grid-list-videos" cols={4.5}>
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

}
         

             




        </RctCollapsibleCard>


       <Folders/>
       <Favoritos/>

       <RctCollapsibleCard>
          <div className={'rct-block-title'}>
            <h4 className="titulo-contenidos-compartidos"><b>Contenidos Compartidos</b></h4>
           
          </div>

 </RctCollapsibleCard>

      </div>
    );
  }
}
