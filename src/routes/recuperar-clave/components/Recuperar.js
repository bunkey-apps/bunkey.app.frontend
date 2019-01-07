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
import { Link } from 'react-router-dom';

// intl messages
import IntlMessages from '../../../util/IntlMessages';

// rct card box
import RctCollapsibleCard from '../../../components/RctCollapsibleCard/RctCollapsibleCard';
import { LinearProgress } from 'material-ui/Progress';

// app config
import AppConfig from '../../../constants/AppConfig';
// redux action
import {
    recuperarClave
    
} from '../../../actions';

class Recuperar extends Component {

  state = {
    email: '',
    password: ''
  }
  handleSubmit = this.handleSubmit.bind(this);
  /**
   * On User Login
   */
  handleSubmit(event) {
    event.preventDefault();
    if (this.state.email !== '' ) {
      this.props.recuperarClave(this.state.email);
    }
  }

  /**
   * On User Sign Up
   */
  onUserSignUp() {
    this.props.history.push('/signup');
  }

  render() {
    const { email, password } = this.state;
    const { loading } = this.props;
    return (
      <QueueAnim type="bottom" duration={2000}>
        <div className="rct-session-wrapper  d-flex align-items-center">
          {loading &&
            <LinearProgress />
          }
          
        
          <div className="session-inner-wrapper w-100">
            <div className="container ">
              <div className="row row-eq-height">
              <div className="col-sm-2 col-md-1 col-lg-2">
              </div>
                <div className="col-sm-8 col-md-7 col-lg-8">
                  <div className="session-body text-center">
                    <div className="session-head mb-30">
                      <h2>Recuperar Clave</h2>
                      <small className="mb-0">Ingresa tu correo electrónico para recuperar la clave</small>
                    </div>
                    <Form onSubmit={this.handleSubmit}>
                      <FormGroup className="has-wrapper">
                        <Input required="true" type="mail" value={email} name="user-mail" id="user-mail" className="has-input input-lg" placeholder="Email" onChange={(event) => this.setState({ email: event.target.value })} />
                        <span className="has-icon"><i className="ti-email"></i></span>
                      </FormGroup>
                     
                      <FormGroup className="mb-15 session-form-padding-button">
                        <Button
                          className="btn-success text-white btn-lg circle-btn-sm btn-block session-button-color"
                          variant="raised"
                          type="submit">
                          Recuperar
                            </Button>
                      </FormGroup>
                    </Form>
                   
                    <p><Link to="/" className="text-muted">Volver</Link></p>

                  </div>
                </div>
                <div className="col-sm-2 col-md-1 col-lg-2">
              </div>
              </div>
            </div>
          </div>
        </div>
      </QueueAnim>
    );
  }
}

// map state to props
const mapStateToProps = ({ recuperar }) => {
    return recuperar;
  }

export default connect(mapStateToProps, {
    recuperarClave
    
})(Recuperar);
