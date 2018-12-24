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
import { collapsedSidebarAction, changePassword, changeAvatar, logoutUserFromFirebase, getUserMe } from '../../actions';

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
      file: '', 
      imagePreviewUrl: '',
      name: '',
      imagen: '',
      addNewCustomerDetails: {
        email: '',
        password: '',
        name: '',
        role: '',
        workspace: '',
        clietntOwner: '',
        passwordRepeat: '',
        passInvalid: false
      },
      logoCliente: ''
    }
    this.handleSubmitAdd = this.handleSubmitAdd.bind(this);
    this.handleSubmitEdit = this.handleSubmitEdit.bind(this);
  }
  handleSubmitEdit(event) {
    event.preventDefault();
   this.onSubmitCustomerEditDetailForm();
  }
  handleSubmitAdd(event) {
    event.preventDefault();
    this.onSubmitAddNewCustomerForm();
  }

  onSubmitCustomerEditDetailForm() {
    console.log('cambio avatar');
    this.props.changeAvatar(this.state.file);
  }


  onSubmitAddNewCustomerForm() {
    const { addNewCustomerDetails } = this.state;
    console.log('cambio');
    if (addNewCustomerDetails.password === addNewCustomerDetails.passwordRepeat) {
      //  this.setState({ editCustomerModal: false});
      console.log('addNewCustomerDetails', addNewCustomerDetails);
      this.props.changePassword(addNewCustomerDetails.password);


    } else {
      console.log('claves distintas');
      addNewCustomerDetails.passInvalid = true;
      this.setState({
        addNewCustomerDetails: addNewCustomerDetails
      })
    }



  }


  componentWillMount() {
    console.log('entrrr4');

    this.props.getUserMe();
		const clienteSelect = localStorage.getItem('clienteSelect');
		const clienteSelectJson = JSON.parse(clienteSelect);
    var logo = '';
    if(clienteSelectJson && clienteSelectJson.acountSetting){
      logo =  clienteSelectJson.acountSetting.logo;
    }

    this.setState({logoCliente: logo})
	}

  componentWillReceiveProps(nextProps) {


    const clienteSelect = localStorage.getItem('clienteSelect');
		const clienteSelectJson = JSON.parse(clienteSelect);
    
    var logo = '';
    if(clienteSelectJson && clienteSelectJson.acountSetting){
      logo =  clienteSelectJson.acountSetting.logo;
    }

    this.setState({logoCliente: logo})

    
  }

  toggleEditCustomerModal = () => {
    this.setState({
      editCustomerModal: !this.state.editCustomerModal
    });
  }

  cambiarClave() {
    console.log('ddd');
    this.setState({ editCustomerModal: true, addNewCustomerForm: true });
    // this.props.changePassword();
  }

  cambiarAvatar() {
    console.log('ddd');
    this.setState({ editCustomerModal: true, addNewCustomerForm: false });
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

  onChangeCustomerDetails(key, value) {
    this.setState({
      editCustomer: {
        ...this.state.editCustomer,
        [key]: value
      }
    });
  }

  handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
      console.log(this.state);
    }
    reader.readAsDataURL(file)

  }

  logoutUser() {
    this.props.logoutUserFromFirebase();
}

  render() {
    $('body').click(function () {
      $('.dashboard-overlay').removeClass('show');
      $('.dashboard-overlay').addClass('d-none');
      $('body').css('overflow', '');
    });
    const { logoCliente, newCustomers, sectionReload, alertDialog, editCustomerModal, addNewCustomerForm, editCustomer, snackbar, successMessage, addNewCustomerDetails, name, imagen } = this.state;
    const { loading, userMeName, userMeImagen } = this.props;
    return (

      <AppBar position="fixed" className="rct-header">

        <Toolbar className="d-flex justify-content-between w-100">
          <ul className="list-inline mb-0 navbar-left">
            <li className="list-inline-item" onClick={(e) => this.onToggleNavCollapsed(e)}>
              <IconButton color="inherit" aria-label="Menu" className="humburger">
                <MenuIcon />
              </IconButton>
            </li>

          
      


          </ul>


        
          <ul className="navbar-right list-inline margen-ul-bunkey">



  <li className="list-inline-item margen-li-bunkey">
            <Link to="/app/dashboard">
              <a href="javascript:void(0)"  className="header-icon text-secondary border-secondary border-none-home-heder">
                <i className="zmdi ti-home color-header-bunkey"></i>
              </a>
              </Link>
            </li>

           
            

            <li className="list-inline-item margen-li-bunkey">
            <Link to="/app/confirmar">
              <a href="javascript:void(0)" className="header-icon text-secondary border-secondary">
                <i className="zmdi ti-info color-header-bunkey"></i>
              </a>
              </Link>
            </li>

      
            <li className="list-inline-item margen-li-bunkey">


              <UncontrolledDropdown className="list-inline-item rct-dropdown">
                <DropdownToggle caret nav >

                  <a href="javascript:void(0)">
                  <img src={logoCliente} className="logo-menu-rect fondo-logo-cliente-header" />
                  <img src={userMeImagen} alt="user profile" className="img-fluid rounded-circle borde-perfil-bunkey avatar-circular-menu-user" width="60" height="129" />

                    
                  </a>
                </DropdownToggle>
                <DropdownMenu className="mt-15" right>
                <div className=" color-header-bunkey padding-name-dropdown"> {userMeName}</div>
                  <ul className="list-unstyled mb-0">
                    <li>
                      <a href="javascript:void(0)" onClick={() => this.cambiarClave()}>
                        <i className="ti-lock"></i>
                        <IntlMessages id="Cambiar Clave" />
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0)" onClick={() => this.cambiarAvatar()}>
                        <i className="ti-image"></i>
                        <IntlMessages id="Cambiar Avatar" />
                      </a>
                    </li>
                    <li className="border-top">
                                    <a href="javascript:void(0)" onClick={() => this.logoutUser()}>
                                        <i className="ti ti-power-off"></i>
                                        Salir
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
                   {loading &&
                    <div className="d-flex justify-content-center loader-overlay">
                      <CircularProgress />
                    </div>
                  }

                  <FormGroup>
                  <Label for="avatar">Avatar</Label>
                    <Input required="true" name="avatar" className="fileInput"
                      type="file"
                      onChange={(e) => this.handleImageChange(e)} />
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
  loading: settings.loading,
  userMeName: settings.userMeName, 
  userMeImagen : settings.userMeImagen
});

export default connect(mapStateToProps, {
  collapsedSidebarAction, changePassword, changeAvatar, logoutUserFromFirebase, getUserMe
})(Header);
