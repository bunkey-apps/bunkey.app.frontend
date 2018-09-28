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
  getUrlFile,
  addImage
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



class Configuracion extends Component {

  constructor() {
    super()
    this.state = { file: '', imagePreviewUrl: '', isRequired: 'required' };
    this.handleSubmitAdd = this.handleSubmitAdd.bind(this);
  }
  handleSubmitAdd(event) {
    event.preventDefault();
    this.onSubmitAddNewCustomerForm();
  }
  onSubmitAddNewCustomerForm() {
    this.props.getUrlFile();

    setTimeout(() => {
      const { items} = this.props;
      console.log('items',items);
      this.props.addImage(items.url, this.state.file);
      

  }, 3000);

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

  render() {
    const { items, loading } = this.props;
    const { newCustomers, sectionReload, alertDialog, editCustomerModal, addNewCustomerForm, editCustomer, snackbar, successMessage, addNewCustomerDetails } = this.state;

    return (


      <div>


        <RctCollapsibleCard>

          <div className={'rct-block-title'}>
           

          </div>

          <Form id="formAdd" onSubmit={this.handleSubmitAdd}>
            <FormGroup>
              <Label for="File">Mofificar Logo</Label>
              <Input required={this.state.isRequired} name="photo" className="fileInput"
                type="file"
                onChange={(e) => this.handleImageChange(e)} />

            </FormGroup>
            <div>
              <Button form="formAdd" type="submit" variant="raised" className="btn-primary text-white"><IntlMessages id="Cambiar Logo" /></Button>{' '}
            </div>
          </Form>

        </RctCollapsibleCard>

      </div>
    )
  }
}

// map state to props
const mapStateToProps = ({ configuracion }) => {
  return configuracion;
}

export default connect(mapStateToProps, {
  getUrlFile, addImage
})(Configuracion);