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
  getPendingObject, confirmPending
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
      id: props.objectoPending._id

    }


    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
    this.handleTagClick = this.handleTagClick.bind(this);

  }


  onSubmitAddArchiveForm() {

    console.log('onSubmitAddArchiveForm id', this.state.id);
    this.props.confirmPending(this.state.id);

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
    const { copyRight } = this.state;

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
  getPendingObject, confirmPending
})(Confirmar);