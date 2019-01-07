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
import Busqueda from './components/Busqueda';
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
export default class ExplorarPage extends Component {

  state = {
    collapse: false,
    collapse2: false,
    collapse3: false,
    urlVideo: '',
    author: '',
    title: '',
    index: 0
  }

  closeCollapse() {
    this.setState({ collapse: false, collapse2: false, collapse3: false });

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
    if (tileData.length > this.state.index + 1) {
      var video = tileData[this.state.index + 1];
      var collap1 = false;
      var collap2 = false;
      var collap3 = false;
      if(this.state.index + 1 >= 0 && this.state.index + 1  <= 3){
       collap1 = true;
       collap2 = false;
       collap3 = false;
       window.scrollTo(500, 320);

      }
      if(this.state.index + 1 >= 4 && this.state.index + 1  <= 7){
        
        collap1 = false;
        collap2 = true;
        collap3 = false;
        window.scrollTo(500, 600);
       }
       if(this.state.index + 1 >= 8 && this.state.index + 1  <= 11){
        collap1 = false;
        collap2 = false;
        collap3 = true;
        window.scrollTo(500, 800);
       }
      this.setState({ urlVideo: video.img, author: video.author, video: video.title, index: this.state.index + 1,  collapse: collap1, collapse2: collap2, collapse3: collap3 });

    }

  }
  onBack() {

    if (this.state.index - 1 >= 0) {
      var video = tileData[this.state.index - 1];
      var collap1 = false;
      var collap2 = false;
      var collap3 = false;
      if(this.state.index - 1 >= 0 && this.state.index - 1  <= 3){
       collap1 = true;
       collap2 = false;
       collap3 = false;
       window.scrollTo(500, 320);

      }
      if(this.state.index - 1 >= 4 && this.state.index - 1  <= 7){
        
        collap1 = false;
        collap2 = true;
        collap3 = false;
        window.scrollTo(500, 600);
       }
       if(this.state.index - 1 >= 8 && this.state.index - 1  <= 11){
        collap1 = false;
        collap2 = false;
        collap3 = true;
        window.scrollTo(500, 800);
       }
      this.setState({ urlVideo: video.img, author: video.author, video: video.title, index: this.state.index - 1,  collapse: collap1, collapse2: collap2, collapse3: collap3 });

    }

  }
  render() {

    const { collapse } = this.state;
    const { collapse2 } = this.state;
    const { collapse3 } = this.state;
    const { urlVideo } = this.state;
    const { author } = this.state;
    const { title } = this.state;
    const { index } = this.state;
    return (
      <div className="dashboard-v1">



       

        <Busqueda/>



      </div>
    );
  }
}
