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
import { UncontrolledDropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import Button from 'material-ui/Button';
import { CircularProgress } from 'material-ui/Progress';

import $ from 'jquery';

// actions
import { collapsedSidebarAction, changePassword } from '../../actions';

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


  constructor() {
    super()
    this.state = {
      customizer: false,
      addNewCustomerForm: false,
      editCustomerModal: false,
      editCustomer: null,
      selectedDeletedCustomer: null,
      alertDialog: false,
      addNewCustomerDetails: {
        email: '',
        password: '',
        name: '',
        role: '',
        workspace: '',
        clietntOwner: '',
        passwordRepeat: '',
        passInvalid: false
      }
    }
    this.handleSubmitAdd = this.handleSubmitAdd.bind(this);
    this.handleSubmitEdit = this.handleSubmitEdit.bind(this);
  }
  handleSubmitEdit(event) {
    event.preventDefault();
    //  this.onSubmitCustomerEditDetailForm();
  }
  handleSubmitAdd(event) {
    event.preventDefault();
     this.onSubmitAddNewCustomerForm();
  }


  onSubmitAddNewCustomerForm() {
    const { addNewCustomerDetails } = this.state;
      console.log('cambio');
        if(addNewCustomerDetails.password === addNewCustomerDetails.passwordRepeat){
          //  this.setState({ editCustomerModal: false});
            console.log('addNewCustomerDetails',addNewCustomerDetails);
            this.props.changePassword(addNewCustomerDetails.password);
           
            
        }else{
            console.log('claves distintas');
            addNewCustomerDetails.passInvalid = true;
            this.setState({
                addNewCustomerDetails:addNewCustomerDetails
            })
        }
       
        
    
}





  toggleEditCustomerModal = () => {
    this.setState({
      editCustomerModal: !this.state.editCustomerModal
    });
  }

  cambiarClave() {
    console.log('ddd');
    console.log('this ss', this.state.password);
    this.setState({ editCustomerModal: true, addNewCustomerForm: true });
    // this.props.changePassword();
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

  onChangeCustomerAddNewForm(key, value) {
    this.setState({
        addNewCustomerDetails: {
            ...this.state.addNewCustomerDetails,
            [key]: value
        }
    })
}

  render() {
    $('body').click(function () {
      $('.dashboard-overlay').removeClass('show');
      $('.dashboard-overlay').addClass('d-none');
      $('body').css('overflow', '');
    });
    const { newCustomers, sectionReload, alertDialog, editCustomerModal, addNewCustomerForm, editCustomer, snackbar, successMessage, addNewCustomerDetails } = this.state;
    const {  loading } = this.props;
    return (

      <AppBar position="fixed" className="rct-header">
       
        <Toolbar className="d-flex justify-content-between w-100">
          <ul className="list-inline mb-0 navbar-left">
            <li className="list-inline-item" onClick={(e) => this.onToggleNavCollapsed(e)}>
              <IconButton color="inherit" aria-label="Menu" className="humburger">
                <MenuIcon />
              </IconButton>
            </li>

            <a href="javascript:void(0)" className="margin-home-header-link">
              <Link to="/app/dashboard">
                <i className="zmdi ti-home color-header-bunkey"></i>
              </Link>
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


              <UncontrolledDropdown className="list-inline-item rct-dropdown">
                <DropdownToggle caret nav className="dropdown-group-link">
                  <a href="javascript:void(0)">
                    <i className="zmdi ti-user color-header-bunkey"></i>
                  </a>
                </DropdownToggle>
                <DropdownMenu className="mt-15" right>
                  <ul className="list-unstyled mb-0">
                    <li>
                      <a href="javascript:void(0)" onClick={() => this.cambiarClave()}>
                        <i className="ti-lock"></i>
                        <IntlMessages id="Cambiar Clave" />
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0)">
                        <i className="ti-image"></i>
                        <IntlMessages id="Cambiar Avatar" />
                      </a>
                    </li>
                  </ul>
                </DropdownMenu>
              </UncontrolledDropdown>
            </li>
          </ul>


        </Toolbar>
        <DashboardOverlay
          onClose={() => this.closeDashboardOverlay()}
        />


        {editCustomerModal &&
          <Modal
            isOpen={editCustomerModal}
            toggle={this.toggleEditCustomerModal}
          >
            <ModalHeader toggle={this.toggleEditCustomerModal}>
              {addNewCustomerForm ? 'Cambiar Clave' : 'Cambiar Avatar'}
            </ModalHeader>
            <ModalBody>
           
              {addNewCustomerForm ?
                <Form id="formAdd" onSubmit={this.handleSubmitAdd}>
                 {loading &&
                <div className="d-flex justify-content-center loader-overlay">
                  <CircularProgress />
                </div>
              }
             
                  <FormGroup>
                
                    <Label for="name">Nueva Clave</Label>
                    <Input
                      required="true"
                      type="password"
                      name="password"
                      id="password"
                      value={addNewCustomerDetails.password}
                      onChange={(e) => this.onChangeCustomerAddNewForm('password', e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="name">Repetir Clave</Label>
                    <Input
                      required="true"
                      type="password"
                      name="passwordRepeat"
                      id="passwordRepeat"
                      value={addNewCustomerDetails.passwordRepeat}
                      onChange={(e) => this.onChangeCustomerAddNewForm('passwordRepeat', e.target.value)}
                    />
                    {addNewCustomerDetails.passInvalid ? <p className="claves-invalidas">Las claves no son iguales </p> : null}
                  </FormGroup>


                </Form>
                : <Form id="formEdit" onSubmit={this.handleSubmitEdit} >
                  <FormGroup>
                    <Label for="name">Nombre</Label>
                    <Input
                      required="true"
                      type="text"
                      name="name"
                      id="name"
                      value={editCustomer.name}
                      onChange={(e) => this.onChangeCustomerDetails('name', e.target.value)}
                    />
                  </FormGroup>
                </Form>
              }
            </ModalBody>
            <ModalFooter>
              {addNewCustomerForm ?
                <div>
                  <Button variant="raised" className="btn-danger text-white alert-botton-cancel-margin" onClick={this.toggleEditCustomerModal}><IntlMessages id="button.cancel" /></Button>
                  <Button form="formAdd" type="submit" variant="raised" className="btn-primary text-white"><IntlMessages id="button.add" /></Button>{' '}
                </div>
                : <div><Button variant="raised" className="btn-danger text-white alert-botton-cancel-margin" onClick={this.toggleEditCustomerModal}><IntlMessages id="button.cancel" /></Button>
                  <Button form="formEdit" type="submit" variant="raised" className="btn-primary text-white"><IntlMessages id="button.update" /></Button>{' '}</div>
              }


            </ModalFooter>
          </Modal>
        }


      </AppBar>
    );
  }
}

// map state to props
const mapStateToProps = ({ settings }) => ({
  collapsedSidebar: settings.navCollapsed,
  rtlLayout: settings.rtlLayout,
  loading: settings.loading
});

export default connect(mapStateToProps, {
  collapsedSidebarAction, changePassword
})(Header);
