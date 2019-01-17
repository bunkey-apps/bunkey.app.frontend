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
// page title bar
import PageTitleBar from '../../../components/PageTitleBar/PageTitleBar';

// intl messages
import IntlMessages from '../../../util/IntlMessages';

// rct card box
import RctCollapsibleCard from '../../../components/RctCollapsibleCard/RctCollapsibleCard';

// app config
import AppConfig from '../../../constants/AppConfig';

// redux action
import {
  inviteUser
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



class Invite extends Component {

  state = {
    email: '',
    name: ''
  }
  handleSubmit = this.handleSubmit.bind(this);
  /**
   * On User Login
   */
  handleSubmit(event) {
    event.preventDefault();
    console.log('email',this.state.email);
    console.log('nombre',this.state.name);

    if (this.state.email !== '' && this.state.name !== '') {
      console.log('tiene nombre y pass');
      this.props.inviteUser(this.state);
    }
  }

  render() {
    const { email, name } = this.state;
    const { loading } = this.props;
    return (


      <div>
 {loading &&
            <div className="d-flex justify-content-center loader-overlay">
              <CircularProgress />
            </div>
          }

        <RctCollapsibleCard>
         
        <Form onSubmit={this.handleSubmit}>
                      <FormGroup className="has-wrapper">
                        <Input required="true" type="email" value={email} name="user-mail" id="user-mail" className="has-input input-lg" placeholder="Email" onChange={(event) => this.setState({ email: event.target.value })} />
                        <span className="has-icon"><i className="ti-email"></i></span>
                      </FormGroup>
                      <FormGroup className="has-wrapper">
                        <Input required="true" value={name} type="text" name="user-pwd" id="pwd" className="has-input input-lg" placeholder="Nombre y apellido" onChange={(event) => this.setState({ name: event.target.value })} />
                        <span className="has-icon"><i className="ti-user"></i></span>
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
        </RctCollapsibleCard>




      </div>
    )
  }
}

// map state to props
const mapStateToProps = ({ invite }) => {
  return invite;
}

export default connect(mapStateToProps, {
  inviteUser
})(Invite);