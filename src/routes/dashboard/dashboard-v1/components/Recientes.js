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
// redux action
import {
    getRecientes
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

            isAdmin: false,
            collapse: '-1',
            posicion: -1,
            tipoObject: '',
            urlVideo: '',
            author: '',
            rowCollapseNum: '-2'

        }


    }
    componentWillMount() {


        this.props.getRecientes();
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
        console.log('objecto', objecto);
    
        console.log('index', index);
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
    
              this.setState({ collapse: objecto.rowCollapse, urlVideo: objecto.originalURL, author: objecto.name, marginLeftCollap: objecto.marginLeft, posicion: index, tipoObject: objecto.type });
    
    
            }, 100);
          } else {
            console.log('entra imagen');
            this.setState({ collapse: objecto.rowCollapse, urlVideo: objecto.originalURL, author: objecto.name, marginLeftCollap: objecto.marginLeft, posicion: index, tipoObject: objecto.type });
    
          }
    
    
    
    
    
    
    
    
    
    
    
    
        }
    
      }
    
      closeCollapse() {
    
        if (this.state.tipoObject === 'video') {
          this.refs.playerCollapse.pause();
        }
    
    
        this.setState({ collapse: '-1', posicion: -1, tipoObject: 'none', rowCollapseNum: '-2' });
    
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

    render() {
        const { loadingRecientes, recientes } = this.props;
        const { isAdmin } = this.state;
        const { collapse } = this.state;
    const { urlVideo } = this.state;
    const { posicion } = this.state;
    const { author } = this.state;
    const { tipoObject } = this.state;
    const { rowCollapseNum } = this.state;

    
        return (
            <div>


                <RctCollapsibleCard>
                    <div className={'rct-block-title'}>
                        <h4 className="titulo-vistas-recientemente"><b>Vistos Recientemente</b></h4>

                    </div>


                    <div>
                        <GridList className="grid-list-videos" cols={4.5}>

                            {recientes.map((n, index) => {

                                return (n.type === 'image' || n.type === 'video') ?

                                    <GridListTile key={index}>
                                          
                                            {n.type === 'image' &&
                                                <img className="imagenes-tam-grid" src={n.originalURL} alt={n.name} onClick={() => this.onCollapse(n, index)} />
                                            }
                                            {n.type === 'video' &&
                                                <div className="heigth-div-objetos" onClick={() => this.onCollapse(n, index)} onMouseOver={() => this.mouseOver(index)} onMouseOut={() => this.mouseOut(index)}>

                                                    <Player ref={'playerRecientes' + index} fluid={false} width={'100%'} height={184} muted={true}>
                                                        <BigPlayButton position="center" />
                                                        <ControlBar disableDefaultControls={true} />
                                                        <source src={n.originalURL} />
                                                    </Player>
                                                </div>
                                            }


                                    </GridListTile>








                                    : ''

                            })}
                        </GridList>

<div>
{recientes.map((o, num) => {

return (o.type === 'image' || o.type === 'video') ?


    <div key={'contex' + num} >
        <ContextMenu id={num + 'imagevideo-recientes'} className="click-derecho-bunkey">
            <MenuItem onClick={() => { window.open(o.originalURL, '_blank', 'download=true') }} data={{ item: { num } }}>
                <i className="zmdi zmdi-download color-header-bunkey padding-click-derecho padding-top-click-derecho"></i>
                <span className="padding-click-derecho">Descargar </span>
            </MenuItem>
            <MenuItem onClick={this.handleClick} data={{ item: 'item 2' }}>
                <i className="zmdi zmdi-share color-header-bunkey padding-click-derecho padding-top-click-derecho"></i>
                <span className="padding-click-derecho">Compartir</span>
            </MenuItem>
            <MenuItem onClick={() => this.handleClickChangeName(o)} data={{ item: 'item 2' }}>
                <i className="zmdi zmdi-edit color-header-bunkey padding-click-derecho padding-top-click-derecho"></i>
                <span className="padding-click-derecho">Cambiar Nombre</span>
            </MenuItem>

            <MenuItem onClick={this.handleClick} data={{ item: 'item 2' }}>
                <i className="zmdi zmdi-long-arrow-tab color-header-bunkey padding-click-derecho padding-top-click-derecho"></i>
                <span className="padding-click-derecho">Mover</span>
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

 <Collapse isOpen={collapse === rowCollapseNum} className="anchoCollapseRecientes padding-top-triangulo-collapse"
                       

                      >

                   

                        <div className="row row-eq-height text-center fondo-videos-seleccionado collapse " id="collapseExample"


                        >

                          <div className="col-sm-2 col-md-1 col-lg-2">
                            <div className="volver-collap-video-image-left">
                              <i onClick={() => this.onBack()} className="zmdi ti-angle-left text-white"></i>

                            </div>

                          </div>
                          <div className="col-sm-6 col-md-5 col-lg-6 zindex-collapse-next-close" >
                            <div>
                              {tipoObject === 'image' &&

                                <img className="collapse-image-width-center " src={urlVideo}></img>

                              }


                              {tipoObject === 'video' &&

                                <Player ref="playerCollapse" autoPlay fluid={false} width={'100%'} height={351} >
                                  <BigPlayButton position="center" />
                                  <source src={urlVideo} />
                                </Player>




                              }
                            </div>
                          </div>
                          <div className="col-sm-4 col-md-3 col-lg-4 zindex-collapse-next-close">
                            <div className="fondo-videos-padding-top-desc">
                              <h3 className="text-white">{author}</h3>

                            </div>
                            <div>
                              <b className="text-white"></b>
                              <IconButton> <i className="zmdi zmdi-star-outline text-white"></i></IconButton>
                              <IconButton> <i className="zmdi zmdi-share text-white"></i></IconButton>
                              <IconButton> <i className="zmdi zmdi-download text-white"></i></IconButton>
                            </div>



                            <div className=" ">
                              <i onClick={() => this.closeCollapse()} className="zmdi   ti-close text-white volver-collap-video-image-right-close"></i>

                              <i onClick={() => this.onNext()} className="zmdi   ti-angle-right text-white volver-collap-video-image-right"></i>

                            </div>

                          </div>

                        </div>

                      </Collapse>
                     
                    </div>
                </RctCollapsibleCard>
            </div>

        )
    }
}

// map state to props
const mapStateToProps = ({ dashboard }) => {
    return dashboard;
}

export default connect(mapStateToProps, {
    getRecientes
})(Recientes);