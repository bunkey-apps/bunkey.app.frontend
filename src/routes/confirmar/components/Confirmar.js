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
import { WithContext as ReactTags } from 'react-tag-input';

// redux action
import {
  getPendingObject, confirmPending, updatePendingRouting
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


const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];
class Confirmar extends Component {

  constructor(props) {
    super(props)

    console.log('props', props.objectoPending);
    var arrTag = [];
    var aux = {};
    for (var i = 0; i < props.objectoPending.metadata.descriptiveTags.length; i++) {
      aux.id = props.objectoPending.metadata.descriptiveTags[i];
      aux.text = props.objectoPending.metadata.descriptiveTags[i];
      arrTag.push(aux);
      aux = {};
    }


    this.state = {
      objeto: props.objectoPending,
      tags: arrTag,
      suggestions: [],
      copyRight: props.objectoPending.metadata.copyRight,
      filePDF: [],
      pdfPreviewUrl: '',
      id: props.objectoPending._id,
      name: props.objectoPending.name,
      startDate: props.objectoPending.metadata.createdDate

    }


    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
    this.handleTagClick = this.handleTagClick.bind(this);

  }


  onSubmitAddArchiveForm() {

    console.log('onSubmitAddArchiveForm id', this.state.id);

    var isUpdate = false;

    if (this.state.objeto.name !== this.state.name) {
      console.log('distintos name');
      isUpdate = true;
    } else {
      console.log('iguales name ');
    }
    if (this.state.objeto.metadata.copyRight !== this.state.copyRight) {
      console.log('distintos copyRight');
      isUpdate = true;
    } else {
      console.log('iguales copyRight');
    }

    var isChangePDF = false;
    if (this.state.pdfPreviewUrl !== '' && this.state.copyRight !== 'free') {
      console.log('existe pdf');
      isUpdate = true;
      isChangePDF = true;
    } else {
      console.log('no existe pdf');

    }

    var licenseFile = this.state.objeto.metadata.licenseFile;

    if (this.state.copyRight === 'free') {
      licenseFile = '';
    }


    var arrTags = [];
    for (var i = 0; i < this.state.tags.length; i++) {

      arrTags.push(this.state.tags[i].text);
    }

    console.log('arrTags', arrTags);
    console.log('descriptiveTags', this.state.objeto.metadata.descriptiveTags);

    if (arrTags.toString() !== this.state.objeto.metadata.descriptiveTags.toString()) {
      console.log('distintos descriptiveTags');
      isUpdate = true;
    } else {
      console.log('igaules descriptiveTags');
    }



    console.log('isUpdate?;', isUpdate);


    if (isUpdate) {
      var objectChange = {
        'name': this.state.name,
        'metadata': {
          'copyRight': this.state.copyRight,
          'licenseFile': licenseFile,
          'descriptiveTags': arrTags,
          'createdDate': moment(this.state.startDate).utc().format()
        },
        'isChangePDF': isChangePDF,
        'id': this.state.id,
        'filePDF': this.state.filePDF

      }
      this.props.updatePendingRouting(objectChange);


    } else {
      var objectChange = {

        'id': this.state.id

      }
      this.props.confirmPending(objectChange);
    }






  }
  handleTagClick(index) {

    console.log('The tag at index ' + index + ' was clicked');
  }
  handleDelete(i) {
    console.log('handleDelete');
    const { tags } = this.state;
    this.setState({
      tags: tags.filter((tag, index) => index !== i),
    });
  }

  handleAddition(tag) {
    console.log('handleAddition');

    this.setState(state => ({ tags: [...state.tags, tag] }));
  }

  handlePDFChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let filePDF = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        filePDF: filePDF,
        pdfPreviewUrl: reader.result
      });
      console.log(this.state);
    }
    reader.readAsDataURL(filePDF)

  }

  render() {

    const { loading } = this.props;
    const { tags, suggestions } = this.state;
    const { copyRight, name } = this.state;
    const { startDate } = this.state;

    return (


      <div>
        {loading &&
          <div className="d-flex justify-content-center loader-overlay">
            <CircularProgress />
          </div>
        }

        <RctCollapsibleCard>

          {this.state.objeto.type === 'image' &&

            <div className="heigth-div-objetos">
              <img className="imagenes-tam-confirm" src={this.state.objeto.originalURL} alt={this.state.objeto.name} />
            </div>

          }





          <Form >

            <FormGroup>
              <Label for="name">Nombre</Label>
              <Input
                required="true"
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={(event) => this.setState({ name: event.target.value })}
              />
            </FormGroup>
            <FormGroup>
              <div>
                <ReactTags tags={tags}
                  allowDragDrop={false}
                  suggestions={suggestions}
                  handleDelete={this.handleDelete}
                  handleAddition={this.handleAddition}
                  handleTagClick={this.handleTagClick}
                  delimiters={delimiters}
                  placeholder={'Tags de la colección'}
                >

                </ReactTags>
              </div>
            </FormGroup>

            <FormGroup>
              <Label for="startDate">FFecha de creación</Label>
              <Input
                required="true"
                type="date"
                name="startDate"
                id="startDate"
                value={moment(new Date(startDate)).format('YYYY-MM-DD')}
                onChange={(event) => this.setState({ startDate: event.target.value })}
              />
            </FormGroup>
            <FormGroup>
              <Label for="copyRight:">Copy Right:</Label>
              <Input type="select"
                name="copyRight"
                id="copyRight"
                required="true"
                value={copyRight}
                onChange={(event) => this.setState({ copyRight: event.target.value })}
              >
                <option value="free">Libre</option>
                <option value="limited">Limitado</option>
                <option value="own">Propio</option>
              </Input>
            </FormGroup>



            <div onClick={() => { window.open(this.state.objeto.metadata.licenseFile, '_blank', 'download=true') }}>
              <a href="javascript:void(0)">
                {this.state.objeto.metadata.licenseFile}</a>
            </div>

            {(copyRight === 'limited' || copyRight === 'own') &&
              <FormGroup>
                <Label for="pdfCopy">PDF Copy Right:</Label>
                <Input name="pdfCopy" className="fileInput"
                  type="file"
                  accept=".pdf"
                  onChange={(e) => this.handlePDFChange(e)} />
              </FormGroup>

            }

            <Button onClick={() => this.onSubmitAddArchiveForm()} type="button" variant="raised" className="btn-primary text-white"><IntlMessages id="Confirmar" /></Button>{' '}

          </Form>


        </RctCollapsibleCard>




      </div>
    )
  }
}

// map state to props
const mapStateToProps = ({ confirmar }) => {
  return confirmar;
}

export default connect(mapStateToProps, {
  getPendingObject, confirmPending, updatePendingRouting
})(Confirmar);