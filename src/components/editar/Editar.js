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
import { Player, BigPlayButton, ControlBar } from 'video-react';

// page title bar

// intl messages
import IntlMessages from '../../util/IntlMessages';
// rct card box
import RctCollapsibleCard from '../../components/RctCollapsibleCard/RctCollapsibleCard';

// app config
import AppConfig from '../../constants/AppConfig';
import { WithContext as ReactTags } from 'react-tag-input';

// redux action
import {
  getPendingObject, confirmPending, updatePendingRouting, closeObjectExplorar, updateObjectExplorar
} from '../../actions';


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
class Editar extends Component {

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

    var tipoArr = props.objectoPending.originalURL.split('.');
    var extens = tipoArr[tipoArr.length -1];

    const allTags = localStorage.getItem('allTags');

    const allTagsJson = JSON.parse(allTags);

    var arrTagsAudiovisuales = [];
    var auxTag = {};
    for(var j=0;j<allTagsJson.length;j++){
      auxTag.id = allTagsJson[j].id;
      auxTag.name = allTagsJson[j].name;
      arrTagsAudiovisuales.push(auxTag);
      auxTag = {};
    }

    

    this.state = {
      from: props.objectoPending.from,
        editObjectModal: true,
      objeto: props.objectoPending,
      tags: arrTag,
      suggestions: [],
      copyRight: props.objectoPending.metadata.copyRight,
      filePDF: [],
      pdfPreviewUrl: '',
      id: props.objectoPending._id,
      name: props.objectoPending.name,
      startDate: props.objectoPending.metadata.createdDate,
      loading: false,
      extension: extens,
      tagsAudiovisuales : arrTagsAudiovisuales,
      selectsTags: []

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
    if(this.state.selectsTags.length > 0){
      isUpdate = true;
    }

    if (isUpdate) {
      var objectChange = {
        'name': this.state.name,
        'metadata': {
          'copyRight': this.state.copyRight,
          'licenseFile': licenseFile,
          'descriptiveTags': arrTags,
          'createdDate': moment(this.state.startDate).utc().format(),
          'audiovisualTags': this.state.selectsTags
        },
        'isChangePDF': isChangePDF,
        'id': this.state.id,
        'filePDF': this.state.filePDF

      }

      if(this.state.from ==='explorar'){
        this.props.updateObjectExplorar(objectChange);

      }



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


  mouseOver() {
    console.log("Mouse over!!!");

    this.refs.player.play();
  }
  mouseOut(id) {
    console.log("Mouse out!!!", this.refs.player);
    this.refs.player.pause();
  }

  onChangeAudiovisuales(visual){
    console.log('onChangeAudiovisuales',visual);
   

    var arrAux = this.state.selectsTags;
    var flag = false;
    for(var j=0;j<arrAux.length;j++){
      if(arrAux[j] === visual){
        flag = true;
      }

    }

    if(!flag){
      arrAux.push(visual);
      this.setState({selectsTags: arrAux})
    }

    
    console.log(' this.state.selectsTags', this.state.selectsTags);
  }

  removeSelectTagAudiovisual(visual){

    console.log('visual ',visual);
    var arrAux = this.state.selectsTags;
    var cont = 0;
    for(var j=0;j<arrAux.length;j++){
      if(arrAux[j] === visual){
        cont = j;
      }
      

     
    }

    arrAux.splice(cont,1);
    this.setState({selectsTags: arrAux})
  }
  toggleEditCustomerModal = () => {
    this.props.closeObjectExplorar();
    
  }
  render() {

    const { tags, suggestions } = this.state;
    const { copyRight, name,editObjectModal } = this.state;
    const { startDate, extension } = this.state;

    return (


      <div>
      <Modal
            isOpen={editObjectModal}
            toggle={this.toggleEditCustomerModal}
          >
            <ModalHeader toggle={this.toggleEditCustomerModal}>
              Editar
            </ModalHeader>
            <ModalBody>

       




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
      placeholder={'Agregar nuevo tag'}
    >

    </ReactTags>
  </div>
</FormGroup>
<FormGroup>
 


    <Label for="audiovisuales">Tags audiovisuales </Label>

    
  

    <Input type="select" 
        name="audiovisuales" 
        id="audiovisuales" 
       // value={editCustomer.role}
        onChange={(e) => this.onChangeAudiovisuales( e.target.value)}
        >
         <option value="" >tags audiovisuales</option>
         {this.state.tagsAudiovisuales.map((category, i) =>
                <option key={i} value={category.id}>
                  {category.name}
                </option>
              )}
           
    </Input>
    
    <div className="margin-top-div-tags-audiovisuales">
{this.state.selectsTags.map((select, i) =>
            
  <span className="tagsAudiovisuales-select">{select}
  <a onClick={() => this.removeSelectTagAudiovisual(select)}  class="ReactTags__remove">×</a></span>
                
                 
                )}
  </div>
                                    </FormGroup>
<FormGroup>
  <Label for="startDate">Fecha de creación</Label>
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
  <Label>Extensión: {' ' + extension}</Label>
  
  
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
</Form>




 </ModalBody>
            <ModalFooter>
            <Button variant="raised" className="btn-danger text-white alert-botton-cancel-margin"  onClick={this.toggleEditCustomerModal}><IntlMessages id="button.cancel" /></Button>
<Button onClick={() => this.onSubmitAddArchiveForm()} type="button" variant="raised" className="btn-primary text-white"><IntlMessages id="Confirmar" /></Button>{' '}

  </ModalFooter>
          </Modal>



         



       

       




      </div>
    )
  }
}

// map state to props
const mapStateToProps = ({ confirmar }) => {
  return confirmar;
}

export default connect(mapStateToProps, {
  getPendingObject, confirmPending, updatePendingRouting, closeObjectExplorar, updateObjectExplorar
})(Editar);