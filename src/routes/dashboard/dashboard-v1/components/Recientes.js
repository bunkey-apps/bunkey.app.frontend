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
import { Route, withRouter } from 'react-router-dom';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import { Collapse } from 'reactstrap';
import { Player, BigPlayButton, ControlBar } from 'video-react';
import GridList, { GridListTile, GridListTileBar } from 'material-ui/GridList';
import Editar from '../../../../components/editar/Editar';
// page title bar
import PageTitleBar from '../../../../components/PageTitleBar/PageTitleBar';

// intl messages
import IntlMessages from '../../../../util/IntlMessages';

// rct card box
import RctCollapsibleCard from '../../../../components/RctCollapsibleCard/RctCollapsibleCard';

// app config
import AppConfig from '../../../../constants/AppConfig';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import Dropzone from 'react-dropzone';
import fileExtension from 'file-extension';
import ModalTag from '../../../../components/ModalTag/ModalTag';

// redux action
import {
    getRecientes, 
    addFavoritos, 
    compartirDashboard, 
    daleteFavoritos, 
    getPendingObjectDashboard,
    daleteObject,
    editObjectFolder,
} from '../../../../actions';


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



class Recientes extends Component {

    constructor() {
        super()
        this.state = {
            editarObjetoFolderModal: false,
            isAdmin: false,
            collapse: '-1',
            compartirModal:false,
            posicion: -1,
            tipoObject: '',
            urlVideo: '',
            author: '',
            rowCollapseNum: '-2',
            selectObject: '-1',
            correoCompartir: '',
            idObjectCompartir: '',
            isOpenModalTag: false,
            isFavorite:'text-white',
            isMoveObject: false,
            selectedDeletedCustomer:null,
            alertDialog: false,
            editCustomerModal: false,
            editCustomer:null,
            addNewCustomerForm:false,

        }

        this.handleSubmitCompartir = this.handleSubmitCompartir.bind(this);

    }

    async componentWillMount() {

       await this.props.getRecientes();
       await this.props.getPendingObjectDashboard();
        var tipoUsuario = localStorage.getItem('tipoUsuario');
        var isAdmin = false;
        if(tipoUsuario === 'admin'){
          isAdmin = true;
        }

        this.setState({isAdmin: isAdmin});

    }
    mouseOver(id) {
        console.log("Mouse over!!!", id);
        this.refs['playerRecientes' + id].play();
    }
    mouseOut(id) {
        console.log("Mouse out!!!", this.refs['playerRecientes' + id]);
        this.refs['playerRecientes' + id].pause();
    }


    onCollapse(objecto, index) {

      let favorites = JSON.parse(localStorage.getItem('objectFavorites'));

      if((favorites)&&(objecto._id == favorites._id || (favorites.children && favorites.children.find(x => x._id == objecto._id)))){
        this.setState({isFavorite:'text-yellow'})
      }else{
        this.setState({isFavorite:'text-white'})
      }
  
        this.setState({ rowCollapseNum: objecto.rowCollapse });
        if (this.state.collapse === objecto.rowCollapse && this.state.posicion === index) {
          if (this.state.tipoObject === 'video') {
            this.refs.playerCollapse.pause();
          }
          console.log('ddd');
          this.setState({ collapse: '-1', posicion: -1, tipoObject: 'none' });
        } else {
    
          if (objecto.type === 'video') {
    
            this.setState({ tipoObject: 'image' });
            console.log('entra video');
    
            setTimeout(() => {    
              this.setState({ collapse: objecto.rowCollapse, urlVideo: objecto.originalURL, author: this.truncateTitle(objecto.name, objecto.lowQualityURL, objecto.type), marginLeftCollap: objecto.marginLeft, posicion: index, tipoObject: objecto.type, selectObject: objecto  });   
            }, 100);
          } else {
            console.log('entra imagen');
            this.setState({ collapse: objecto.rowCollapse, urlVideo: objecto.originalURL, author: this.truncateTitle(objecto.name, objecto.lowQualityURL, objecto.type), marginLeftCollap: objecto.marginLeft, posicion: index, tipoObject: objecto.type, selectObject: objecto  });
    
          }

          setTimeout(() => {
       
            console.log('toScroll->',this.refs[objecto.rowCollapse]);
            this.refs[objecto.rowCollapse].scrollIntoView({ block: 'center', behavior: 'smooth' });
    
          }, 500);
    
    
        }
    
      }
    
      closeCollapse() {
    
        if (this.state.tipoObject === 'video') {
          this.refs.playerCollapse.pause();
        }
    
    
        this.setState({ collapse: '-1', posicion: -1, tipoObject: 'none', rowCollapseNum: '-2', isFavorite:'text-white'});
    
      }

      onBack() {
        const { recientes } = this.props;
    
        console.log('bkacj recientes', recientes);
        console.log('bkacj this.state.posicion', this.state.posicion);
        if (this.state.posicion > 0) {
          var index = this.state.posicion - 1;
          console.log('entra', recientes[index]);
    
          if (recientes[index].type === 'video') {
    
            this.setState({ tipoObject: 'image' });
    
           
            setTimeout(() => {
    
              this.setState({ collapse: recientes[index].rowCollapse, urlVideo: recientes[index].originalURL, author: recientes[index].name, marginLeftCollap: recientes[index].marginLeft, posicion: index, tipoObject: recientes[index].type , selectObject: recientes[index], rowCollapseNum: recientes[index].rowCollapse });
    
    
            }, 100);
          } else {
            this.setState({ collapse: recientes[index].rowCollapse, urlVideo: recientes[index].originalURL, author: recientes[index].name, marginLeftCollap: recientes[index].marginLeft, posicion: index, tipoObject: recientes[index].type , selectObject: recientes[index], rowCollapseNum: recientes[index].rowCollapse });
    
          }

        }
    
      }
      onNext() {
        const { recientes } = this.props;
        console.log('next recientes', recientes);
    
        if (recientes.length - 1 > this.state.posicion) {
    
          var index = this.state.posicion + 1;
    
          console.log('entra', recientes[index].name);
          if (recientes[index].type === 'video') {
    
            this.setState({ tipoObject: 'image' });
    
            setTimeout(() => {
    
              this.setState({ collapse: recientes[index].rowCollapse, urlVideo: recientes[index].originalURL, author: recientes[index].name, marginLeftCollap: recientes[index].marginLeft, posicion: index, tipoObject: recientes[index].type, selectObject: recientes[index], rowCollapseNum: recientes[index].rowCollapse});
    
            }, 100);
          } else {
            this.setState({ collapse: recientes[index].rowCollapse, urlVideo: recientes[index].originalURL, author: recientes[index].name, marginLeftCollap: recientes[index].marginLeft, posicion: index, tipoObject: recientes[index].type, selectObject: recientes[index] , rowCollapseNum:recientes[index].rowCollapse  });
    
          }
    
        }
    
      }
      handleClickFavoritos(folder) {

        console.log('click favorite');
        /** checking if the object exists in favorites */
        let favorites = JSON.parse(localStorage.getItem('objectFavorites'));
    
        if((folder._id == favorites._id || (favorites.children && favorites.children.find(x => x._id == folder._id)))){
          
          this.props.daleteFavoritos(folder);
          this.setState({isFavorite:'text-white'})
        }else{

          this.props.addFavoritos(folder);
          this.setState({isFavorite:'text-yellow'})
        }
    
      }

      handleClickDelete(customer) {
        console.log('delete');
        
        this.setState({ alertDialog: true, selectedDeletedCustomer: customer });
      }

      async deleteCustomer() {
        this.setState({ alertDialog: false });
    
        console.log('this.state.selectedDeletedCustomer', this.state.selectedDeletedCustomer);
        await this.props.daleteObject(this.state.selectedDeletedCustomer);

      }

      handleSubmitCompartir(event) {
        event.preventDefault();
        this.onSubmitCompartirForm();
      }
    
      toggleCompartirModal = () => {
        this.setState({
          compartirModal: !this.state.compartirModal
        });
      }
    
      abrirCompartir(n) {
        console.log('abrirCompartir',n);
        this.setState({
          compartirModal: true,
          correoCompartir: '',
          idObjectCompartir: n._id
        });
      }

      onSubmitCompartirForm() {
        
        console.log('idObjectCompartir',this.state.idObjectCompartir);
        console.log('correoCompartir',this.state.correoCompartir);
    
        var objeto = {
          'idObjectCompartir': this.state.idObjectCompartir,
          'correoCompartir': this.state.correoCompartir
        }
        this.props.compartirDashboard(objeto);
    
        this.setState({
          compartirModal: !this.state.compartirModal
        });
    }

    onShowMore = () => {
      this.setState({
        isOpenModalTag: true
      });
    }
  
    closeShowMore = () => {
      this.setState({
        isOpenModalTag:false
      })
    }

    toggleEditCustomerModal = () => {
      this.setState({
        editCustomerModal: !this.state.editCustomerModal
      });
    }

    handleClickEditObjectRecents(object){
      object.from = "folders";
      console.log('objectEditErnesto',object);
      
      
      this.setState({ objectoEditRecent: object, editarObjetoFolderModal: true });
    }

    closeObjectRecent = ()=>{
      this.setState({ editarObjetoFolderModal: false });
    }

    
  handleClickChangeName(folder) {
    console.log('handleClickChangeName', folder);
    this.onEditCustomer(folder);
    // this.props.cambiarNombreObject(folder, 'test');

  }

  changeName = (name) => {
    this.setState({ author:name });
  }

  onEditCustomer(customer) {
    this.setState({ editCustomerModal: true, editCustomer: customer, addNewCustomerForm: false });
  }

    truncateTitle = (name,src,type) => {

      let ext = fileExtension(src)
      let title = null;
  
      if(type!=='folder'){
  
        if (name.length > 20) {
          title = `${name.substr(0,20)}... .${ext}`
        }else{
          title = `${name}.${ext}`
        }
        
      }else{
        if (name.length > 20) {
          title = `${name.substr(0,20)}..`
        }else{
          title = `${name}`
        }
      }
  
      return title;
  
    }

    render() {
        const { loadingRecientes, recientes } = this.props;
        const { isAdmin } = this.state;
        const { collapse } = this.state;
        const { urlVideo } = this.state;
        const { posicion } = this.state;
        const { author } = this.state;
        const { tipoObject } = this.state;
        const { rowCollapseNum } = this.state;
        const { selectObject } = this.state;
        const { compartirModal } = this.state;
        const { correoCompartir } = this.state;
        const { alertDialog } = this.state;
        const {editCustomerModal} = this.state;
        const {addNewCustomerForm} = this.state;
        const {editCustomer} = this.state;
        const { objectoEditRecent } = this.state;

        console.log('Ernesto2',objectoEditRecent);
        



      /** checking if the object exists in favorites */
      let favorites = JSON.parse(localStorage.getItem('objectFavorites'));
      let sw = false;

      if ((selectObject && selectObject!==-1 && favorites) && (selectObject._id == favorites._id || (favorites.children && favorites.children.find(x => x._id == selectObject._id)))) {
        sw = true;
      }

      /**Getting tag array */
      let tag = [];
      let truncateTag = [];

      if (selectObject && selectObject.metadata) {
        if (selectObject.metadata.descriptiveTags && selectObject.metadata.audiovisualTags) {

          tag = selectObject.metadata.descriptiveTags.concat(selectObject.metadata.audiovisualTags)
    
        }else if(selectObject.metadata.descriptiveTags && !selectObject.metadata.audiovisualTags){
    
          tag = selectObject.metadata.descriptiveTags
    
        }else{
    
          tag = selectObject.metadata.audiovisualTags
    
        }
      }

      
      if(tag.length > 5){
        truncateTag = tag.slice(0,4);
      }      
      
        return (
            <div>

                <RctCollapsibleCard>
                    <div className={'rct-block-title'}>
                        <h4 className="titulo-vistas-recientemente"><b>Vistos Recientemente</b></h4>

                    </div>

                    <div>
                        <GridList className="grid-list-videos text-center" cols={4.5}>

                            {recientes.map((n, index) => {

                              let title = this.truncateTitle(n.name,n.lowQualityURL, n.type)
            

                                return (n.type === 'image' || n.type === 'video') ?
                                    <GridListTile key={index} style={{paddingLeft:'15px', paddingRight:'15px', width:'24.7%', height:'210px'}}>
                                      <ContextMenuTrigger id={index + 'imagevideo-recientes'}>
                                          
                                            {n.type === 'image' &&
                                            <div className="heigth-div-objetos" style={{boxShadow:'none'}}>
                                                <img className="image-colapse-max-width-height" src={n.lowQualityURL} alt={n.name} onClick={() => this.onCollapse(n, index)} />
                                                </div>
                                            }
                                            {n.type === 'video' &&
                                                <div className="heigth-div-objetos" style={{boxShadow:'none'}} onClick={() => this.onCollapse(n, index)} onMouseOver={() => this.mouseOver(index)} onMouseOut={() => this.mouseOut(index)}>

                                                    <Player ref={'playerRecientes' + index} fluid={false} width={'100%'} height={180} muted={true}>
                                                        <BigPlayButton position="center" />
                                                        <ControlBar disableDefaultControls={true} />
                                                        <source src={n.lowQualityURL} />
                                                    </Player>
                                                </div>
                                            }
                                            {
                                              n.type === 'document' &&
                                                <div className="heigth-div-objetos" style={{boxShadow:'none'}}>
                                                <img className="image-colapse-max-width-height" src={require('../../../../assets/img/file.png')} alt={n.name} onClick={() => this.onCollapse(n, index)} />
                                                </div>
                                            }
                                      </ContextMenuTrigger>
                                      <p className="color-texto-carpetas-explorar">{title}</p>
                                    </GridListTile>

                                    : ''

                            })}
                        </GridList>

              <div>
              {recientes.map((o, num) => {

              return (o.type === 'image' || o.type === 'video') ?
                  <div key={'contex' + num} >
                      <ContextMenu id={num + 'imagevideo-recientes'} className="click-derecho-bunkey">
                          <MenuItem onClick={() => { window.open(o.originalURL, '_blank') }} data={{ item: { num } }}>
                              <i className="zmdi zmdi-download color-header-bunkey padding-click-derecho padding-top-click-derecho"></i>
                              <span className="padding-click-derecho">Descargar </span>
                          </MenuItem>
                          <MenuItem onClick={() => this.abrirCompartir(o)} data={{ item: 'item 2' }}>
                              <i className="zmdi zmdi-share color-header-bunkey padding-click-derecho padding-top-click-derecho"></i>
                              <span className="padding-click-derecho">Compartir</span>
                          </MenuItem>
                          <MenuItem onClick={() => this.handleClickEditObjectRecents(o)} data={{ item: 'item 2' }}>
                              <i className="zmdi zmdi-edit color-header-bunkey padding-click-derecho padding-top-click-derecho"></i>
                              <span className="padding-click-derecho">Editar</span>
                          </MenuItem>
                          <MenuItem onClick={() => this.handleClickChangeName(o)} data={{ item: 'item 2' }}>
                              <i className="zmdi zmdi-edit color-header-bunkey padding-click-derecho padding-top-click-derecho"></i>
                              <span className="padding-click-derecho">Cambiar Nombre</span>
                          </MenuItem>
                          <MenuItem onClick={() => this.handleClickFavoritos(o)} data={{ item: 'item 2' }}>
                              <i className="zmdi zmdi-star-outline color-header-bunkey padding-click-derecho padding-top-click-derecho"></i>
                              <span className="padding-click-derecho">Agregar a favoritos</span>
                          </MenuItem>
                          <MenuItem onClick={this.handleClick} data={{ item: 'item 2' }}>
                              <div className="line-click-derecho  padding-top-click-derecho"></div>

                          </MenuItem>
                          {isAdmin &&
                              <MenuItem onClick={() => this.handleClickDelete(o)} data={{ item: 'item 2' }}>
                                  <i className="zmdi ti-trash color-header-bunkey padding-click-derecho padding-top-click-derecho padding-bottom-click-derecho"></i>
                                  <span className="padding-click-derecho">Eliminar</span>
                              </MenuItem>
                          }
                      </ContextMenu>      
                  </div>

                  : ''

              })}
              </div>

  <Collapse isOpen={collapse === rowCollapseNum} className="anchoCollapseRecientes padding-top-triangulo-collapse">
    <div ref={selectObject.rowCollapse}  className="row row-eq-height text-center fondo-videos-seleccionado collapse " id="collapseExample">
      <div className="col-sm-2 col-md-1 col-lg-2">
        <div className="volver-collap-video-image-left">
          <i onClick={() => this.onBack()} className="zmdi ti-angle-left text-white"></i>
        </div>
      </div>
      <div className="col-sm-6 col-md-5 col-lg-6 zindex-collapse-next-close height-image-colapse-div-col" >                          
          {tipoObject === 'image' &&

            <img className="image-colapse-max-width-height" src={selectObject.mediaQualityURL}></img>

          }
          {tipoObject === 'video' &&

            <Player ref="playerCollapse" autoPlay fluid={false} width={'100%'} height={351} >
              <BigPlayButton position="center" />
              <source src={selectObject.mediaQualityURL} />
            </Player>
          }
          {
            tipoObject === 'document' &&
            <img className="image-colapse-max-width-height" src={require('../../../../assets/img/file.png')}></img>
          }
        
      </div>
      <div className="col-sm-4 col-md-3 col-lg-4 zindex-collapse-next-close">
      <div>
      <i onClick={() => this.closeCollapse()} className="zmdi   ti-close text-white volver-collap-video-image-right-close-aux"></i>
      <i onClick={() => this.onNext()} className="zmdi   ti-angle-right text-white volver-collap-video-image-right-aux"></i>
      </div>
        <div className="fondo-videos-padding-top-desc">
          <h3 className="text-white">{author}</h3>

        </div>
        <div>
          <b className="text-white"></b>
          <IconButton onClick={() => this.handleClickEditObjectRecents(selectObject)}> <i className="zmdi zmdi-edit text-white"></i></IconButton>
          <IconButton onClick={() => this.handleClickFavoritos(selectObject)}>
            <i id="recientesFavoriteIcon" className={`zmdi zmdi-star-outline ${this.state.isFavorite}`}></i>
          </IconButton>
          <IconButton onClick={() => this.abrirCompartir(selectObject)}> <i className="zmdi zmdi-share text-white"></i></IconButton>
          <IconButton onClick={() => { window.open(selectObject.originalURL, '_blank') }}> <i className="zmdi zmdi-download text-white"></i></IconButton>
        </div>
        {selectObject !== '-1' &&
          <div>
            <div>
              {
                truncateTag.length > 0 && 
                <Fragment>
                  {
                    truncateTag.map((tags, numTag) => (
                      <span key={'tags-' + numTag} className="text-white tags-collapse-border"> {tags}</span>
                    ))
                    
                  }
                  <button type="button" onClick={this.onShowMore} class="btn btn-sm btn-outline-light">Ver más</button>
                </Fragment>
              }
              {
                truncateTag.length === 0 && tag.length > 0 && tag.map((tags, numTag) => (
                  <span key={'tags-' + numTag} className="text-white tags-collapse-border"> {tags}</span>
                ))
              }
            </div>
            <div>
              {selectObject.metadata.copyRight === 'free' &&
                <span className="text-white">Copy Right: Libre</span>
              }

              {selectObject.metadata.copyRight === 'limited' &&
                <span className="text-white">Copy Right: Limitado</span>
              }
              {selectObject.metadata.copyRight === 'own' &&
                <span className="text-white">Copy Right: Propio</span>
              }
            </div>
            <div>
              {selectObject.metadata.createdDate &&
                <span className="text-white">Fecha de creación: {moment(new Date(selectObject.metadata.createdDate)).format('YYYY-MM-DD')} </span>
              }
            </div>
            {selectObject.metadata.licenseFile &&
              <div onClick={() => { window.open(selectObject.metadata.licenseFile, '_blank') }}>
                <a href="javascript:void(0)">
                  Copy Right: CopyRight.pdf  </a>
              </div>
            }
          </div>
        }
        <div className=" ">
        </div>
      </div>
    </div>
  </Collapse>                  
  </div>                    
</RctCollapsibleCard>

        <Dialog
          open={alertDialog}
          onClose={this.handleClose}
        >
          <DialogTitle>{"Estas seguro de eliminarlo?"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Estas seguro de eliminarlo de forma permanente.
                        </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="raised"  className="btn-danger text-white">
              <IntlMessages id="button.cancel" />
            </Button>
            <Button variant="raised" onClick={() => this.deleteCustomer()} className="btn-primary text-white" autoFocus>
              <IntlMessages id="button.yes" />
            </Button>
          </DialogActions>
        </Dialog>

        {editCustomerModal &&
          <Modal
            isOpen={editCustomerModal}
            toggle={this.toggleEditCustomerModal}
          >
            <ModalHeader toggle={this.toggleEditCustomerModal}>
              {addNewCustomerForm ? 'Crear Carpeta' : 'Cambiar Nombre'}
            </ModalHeader>
            <ModalBody>
              {addNewCustomerForm ?
                <Form id="formAdd" onSubmit={this.handleSubmitAdd}>
                  <FormGroup>
                    <Label for="name">Nombre</Label>
                    <Input
                      autofocus="true"
                      required="true"
                      type="text"
                      name="name"
                      id="name"
                      value={addNewCustomerDetails.name}
                      onChange={(e) => this.onChangeCustomerAddNewForm('name', e.target.value)}
                    />
                  </FormGroup>


                </Form>
                : <Form id="formEdit" onSubmit={this.handleSubmitEdit} >
                  <FormGroup>
                    <Label for="name">Nombre</Label>
                    <Input
                    autofocus="true"
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




          {compartirModal &&
          <Modal
            isOpen={compartirModal}
            toggle={this.toggleCompartirModal}
          >
            <ModalHeader toggle={this.toggleCompartirModal}>
              Compartir
            </ModalHeader>
            <ModalBody>
              <Form id="formCompartir" onSubmit={this.handleSubmitCompartir} >
                <FormGroup>
                  <Label for="name">Email</Label>
                  <Input
                    required="true"
                    type="email"
                    name="correoCompartir"
                    id="correoCompartir"
                    value={correoCompartir}
                    onChange={(event) => this.setState({ correoCompartir: event.target.value })}
                  />
                </FormGroup>
              </Form>
            </ModalBody>
            <ModalFooter>
              <div><Button variant="raised" className="btn-danger text-white alert-botton-cancel-margin" onClick={this.toggleCompartirModal}><IntlMessages id="button.cancel" /></Button>
                <Button form="formCompartir" type="submit" variant="raised" className="btn-primary text-white"><IntlMessages id="Compartir" /></Button>{' '}</div>
            </ModalFooter>
          </Modal>
        }

      {this.state.editarObjetoFolderModal &&
        <Editar key="editarRecientes" closeObjectRecent={this.closeObjectRecent} objectoPending={objectoEditRecent} changeName={this.changeName}/>
      }
        
    <ModalTag
      isOpen={this.state.isOpenModalTag}
      toggle={this.closeShowMore}
      Tags={tag}
    >
    </ModalTag>


            </div>
        )
    }
}

// map state to props
const mapStateToProps = ({ dashboard }) => {
    return dashboard;
}

export default connect(mapStateToProps, {
    getRecientes, 
    addFavoritos, 
    compartirDashboard, 
    daleteFavoritos,
    getPendingObjectDashboard,
    daleteObject,
    editObjectFolder,
})(Recientes);