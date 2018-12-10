import React, { Component, Fragment } from 'react';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import { Media } from 'reactstrap';
import IconButton from 'material-ui/IconButton';
import axios from 'axios';
import { connect } from "react-redux";
import { CircularProgress } from 'material-ui/Progress';
import update from 'react-addons-update';
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import Button from 'material-ui/Button';
import Dialog, { DialogActions, DialogContent, DialogContentText, DialogTitle, } from 'material-ui/Dialog';
import Snackbar from 'material-ui/Snackbar';
import Avatar from 'material-ui/Avatar';
import moment from 'moment';
import QueueAnim from 'rc-queue-anim';
// page title bar
import PageTitleBar from '../../../components/PageTitleBar/PageTitleBar';

// intl messages
import IntlMessages from '../../../util/IntlMessages';

// rct card box
import RctCollapsibleCard from '../../../components/RctCollapsibleCard/RctCollapsibleCard';
import { LinearProgress } from 'material-ui/Progress';

// app config
import AppConfig from '../../../constants/AppConfig';

// redux action
import {
  validateInvite,
  registroInvite,
  logoutUserFromFirebase
} from '../../../actions';


let id = 0;

function createData(num, contrato, estado, monto, estadoPago) {
  id += 1;
  return { id, num, contrato, estado, monto, estadoPago };
}

const data = [
  createData(1, '1111-01', 'Pendiente', '$ 500.000', 'Si'),
  createData(2, '1111-02', 'Pagado', '$ 800.000', 'Si'),
  createData(3, '1111-03', 'Atrasado', '$ 600.000', 'Si')
];



class Registro extends Component {

  state = {
    email: '',
    password: '',
    passwordRepeat: '',
    name: ''
  }
  handleSubmit = this.handleSubmit.bind(this);
  
  parseUrlstring(query) {
    var vars = query.split("?");
    var query_string = {};
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      var key = decodeURIComponent(pair[0]);
      var value = decodeURIComponent(pair[1]);
      // If first entry with this name
      if (typeof query_string[key] === "undefined") {
        query_string[key] = decodeURIComponent(value);
        // If second entry with this name
      } else if (typeof query_string[key] === "string") {
        var arr = [query_string[key], decodeURIComponent(value)];
        query_string[key] = arr;
        // If third or later entry with this name
      } else {
        query_string[key].push(decodeURIComponent(value));
      }
    }
    return query_string;
  }


  componentWillMount() {
    console.log('get folders');
    console.log('get folders2');
    var query = window.location.href;
    console.log('query', query);
    var qs = this.parseUrlstring(query);
    console.log('qs.webToken', qs.webToken);
    if(qs.webToken){
      
      
      
      
      this.props.validateInvite(qs.webToken);

    }
    
    

  }





  handleSubmit(event) {
    event.preventDefault();
    console.log('email',this.state.email);
    console.log('nombre',this.state.name);
    const { usuario, accessToken} = this.props;
    console.log('usuario',usuario);
    console.log('accessToken',accessToken);

    
    if (this.state.email !== '' && this.state.name !== '' && this.state.password && this.state.passwordRepeat) {
      console.log('tiene nombre y pass');
      
      this.props.registroInvite(this.state,accessToken);
    }
  }
  componentWillReceiveProps(nextProps) {
    console.log('nextProps',nextProps);

    if (nextProps.validado){
      console.log('se valido la invitacion');
      this.props.history.push('/');
    }

   if (nextProps.location === this.props.location && nextProps.usuario) {
      this.state.name = nextProps.usuario.name;
      this.state.email = nextProps.usuario.email;
    }

    

  }
  render() {
    const { email, password, name, passwordRepeat } = this.state;
    
    const { loading, usuario, accessToken} = this.props;
    return (


      <QueueAnim type="bottom" duration={2000}>
        <div className="rct-session-wrapper  d-flex align-items-center">
          {loading &&
            <LinearProgress />
          }
        

        {usuario && !usuario._id && usuario.email &&
            
<div className="session-inner-wrapper w-100">


            <div className="container ">
              <div className="row row-eq-height">
              <div className="col-sm-2 col-md-1 col-lg-2">
              </div>
                <div className="col-sm-8 col-md-7 col-lg-8">
                  <div className="session-body text-center">
                    <div className="session-head mb-30">
                      <h2>Bienvenidos</h2>
                      <small className="mb-0">Ingresa a tu cuenta de Administrador</small>
                    </div>
                    <Form onSubmit={this.handleSubmit}>
                      <FormGroup className="has-wrapper">
                        <Input disabled required="true" type="email" value={email} name="user-mail" id="user-mail" className="has-input input-lg" placeholder="Email" onChange={(event) => this.setState({ email: event.target.value })} />
                        <span className="has-icon"><i className="ti-email"></i></span>
                      </FormGroup>
                      <FormGroup className="has-wrapper">
                        <Input type="text" value={name} name="user-name" id="user-name" className="has-input input-lg" placeholder="Nombre y Apellido" onChange={(e) => this.setState({ name: e.target.value })} />
                        <span className="has-icon"><i className="ti-user"></i></span>
                      </FormGroup>
                      <FormGroup className="has-wrapper">
                        <Input required="true" value={password} type="Password" name="user-pwd" id="pwd" className="has-input input-lg" placeholder="Crear Clave" onChange={(event) => this.setState({ password: event.target.value })} />
                        <span className="has-icon"><i className="ti-lock"></i></span>
                      </FormGroup>
                      <FormGroup className="has-wrapper">
                        <Input required="true" value={passwordRepeat} type="Password" name="user-pwd2" id="pwd2" className="has-input input-lg" placeholder="Repetir Clave" onChange={(event) => this.setState({ passwordRepeat: event.target.value })} />
                        <span className="has-icon"><i className="ti-lock"></i></span>
                        {passwordRepeat && password !==passwordRepeat ? <p className="claves-invalidas">Las claves no son iguales </p> : null}

                      </FormGroup>
                      <FormGroup className="mb-15 session-form-padding-button">
                        <Button
                          className="btn-success text-white btn-lg circle-btn-sm btn-block session-button-color"
                          variant="raised"
                          type="submit">
                          Ingresar
                            </Button>
                      </FormGroup>
                    </Form>
                  
                  </div>
                </div>
                <div className="col-sm-2 col-md-1 col-lg-2">
              </div>
              </div>
            </div>
          </div>

        }
          
        </div>
      </QueueAnim>
    )
  }
}

// map state to props
const mapStateToProps = ({ registro }) => {
  return registro;
}

export default connect(mapStateToProps, {
  validateInvite, registroInvite,logoutUserFromFirebase
})(Registro);