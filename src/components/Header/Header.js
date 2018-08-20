/**
 * App Header
 */
/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import IconButton from 'material-ui/IconButton';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import { Link } from 'react-router-dom';
import screenfull from 'screenfull';
import MenuIcon from 'material-ui-icons/Menu';
import $ from 'jquery';

// actions
import { collapsedSidebarAction } from '../../actions';

// components
import Notifications from './Notifications';
import ChatSidebar from '../ChatSidebar/ChatSidebar';
import DashboardOverlay from '../DashboardOverlay/DashboardOverlay';
import LanguageProvider from './LanguageProvider';
import SearchForm from './SearchForm';
import QuickLinks from './QuickLinks';
import Cart from './Cart';

// intl messages
import IntlMessages from '../../util/IntlMessages';

class Header extends Component {

  state = {
    customizer: false
  }

  // function to change the state of collapsed sidebar
  onToggleNavCollapsed = (event) => {
    const val = !this.props.collapsedSidebar;
    this.props.collapsedSidebarAction(val);
  }

  // open dashboard overlay
  openDashboardOverlay() {
    $('.dashboard-overlay').toggleClass('d-none');
    $('.dashboard-overlay').toggleClass('show');
    if ($('.dashboard-overlay').hasClass('show')) {
      $('body').css('overflow', 'hidden');
    } else {
      $('body').css('overflow', '');
    }
  }

  // close dashboard overlay
  closeDashboardOverlay() {
    $('.dashboard-overlay').removeClass('show');
    $('.dashboard-overlay').addClass('d-none');
    $('body').css('overflow', '');
  }

  // toggle screen full
  toggleScreenFull() {
    screenfull.toggle();
  }

  render() {
    $('body').click(function () {
      $('.dashboard-overlay').removeClass('show');
      $('.dashboard-overlay').addClass('d-none');
      $('body').css('overflow', '');
    });
    return (
      <AppBar position="fixed" className="rct-header">
        <Toolbar className="d-flex justify-content-between w-100">
          <ul className="list-inline mb-0 navbar-left">
            <li className="list-inline-item" onClick={(e) => this.onToggleNavCollapsed(e)}>
              <IconButton color="inherit" aria-label="Menu" className="humburger">
                <MenuIcon />
              </IconButton>
            </li>

            <a href="javascript:void(0)">
              <i className="zmdi ti-home color-header-bunkey"></i>
            </a>



          </ul>
         
          <ul className="navbar-right list-inline margen-ul-bunkey">





            <li className="list-inline-item margen-li-bunkey">
              <p className="header-bunkey-nuevo">NUEVO</p>
            </li>
            <li className="list-inline-item margen-li-bunkey">
              <a href="javascript:void(0)">
                <i className="zmdi ti-world color-header-bunkey"></i>
              </a>
            </li>


            <li className="list-inline-item margen-li-bunkey">
              <a href="javascript:void(0)">
                <i className="zmdi ti-folder color-header-bunkey"></i>
              </a>
            </li>

            <li className="list-inline-item margen-li-bunkey">
              <a href="javascript:void(0)" >
                <i className="zmdi ti-comment-alt color-header-bunkey"></i>
              </a>
            </li>

            <li className="list-inline-item margen-li-bunkey">
              <a href="javascript:void(0)">
                <i className="zmdi ti-user color-header-bunkey"></i>
              </a>
            </li>
          </ul>


        </Toolbar>
        <DashboardOverlay
          onClose={() => this.closeDashboardOverlay()}
        />
      </AppBar>
    );
  }
}

// map state to props
const mapStateToProps = ({ settings }) => ({
  collapsedSidebar: settings.navCollapsed,
  rtlLayout: settings.rtlLayout
});

export default connect(mapStateToProps, {
  collapsedSidebarAction
})(Header);
