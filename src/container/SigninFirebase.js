/**
 * Signin Firebase
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import { Link } from 'react-router-dom';
import { Form, FormGroup, Input } from 'reactstrap';
import { LinearProgress } from 'material-ui/Progress';
import QueueAnim from 'rc-queue-anim';

// components
import SessionSlider from '../components/Widgets/SessionSlider';

// app config
import AppConfig from '../constants/AppConfig';

// redux action
import {
  signinUserInFirebase,
  signinUserWithFacebook,
  signinUserWithGoogle,
  signinUserWithGithub,
  signinUserWithTwitter,
  signinUserWithBunkey
} from '../actions';

class Signin extends Component {

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
    if (this.state.email !== '' && this.state.password !== '') {
      this.props.signinUserWithBunkey(this.state, this.props.history);
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
                      <h2>Bienvenidos</h2>
                      <small className="mb-0">Ingresa a tu cuenta de Administrador</small>
                    </div>
                    <Form onSubmit={this.handleSubmit}>
                      <FormGroup className="has-wrapper">
                        <Input required="true" type="mail" value={email} name="user-mail" id="user-mail" className="has-input input-lg" placeholder="Email" onChange={(event) => this.setState({ email: event.target.value })} />
                        <span className="has-icon"><i className="ti-email"></i></span>
                      </FormGroup>
                      <FormGroup className="has-wrapper">
                        <Input required="true" value={password} type="Password" name="user-pwd" id="pwd" className="has-input input-lg" placeholder="Password" onChange={(event) => this.setState({ password: event.target.value })} />
                        <span className="has-icon"><i className="ti-lock"></i></span>
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
                    <p className="mb-20">Recuperar Contraseña</p>
                  
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
const mapStateToProps = ({ authUser }) => {
  const { user, loading } = authUser;
  return { user, loading }
}

export default connect(mapStateToProps, {
  signinUserInFirebase,
  signinUserWithFacebook,
  signinUserWithGoogle,
  signinUserWithGithub,
  signinUserWithTwitter,
  signinUserWithBunkey
})(Signin);
