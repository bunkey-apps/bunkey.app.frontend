/**
 * App Routes
 */
import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import classnames from 'classnames';

// Components
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer/Footer';
import SearchForm from '../components/SearchForm/SearchForm';
import Tour from '../components/Tour';
import ThemeOptions from '../components/ThemeOptions/ThemeOptions';

// routes
import Pages from './pages';
import AdvanceUIComponents from './advance-ui-components';
import CalendarComponents from './calendar';
import ChartsComponents from './charts';
import FormElements from './forms';
import Users from './users';
import Components from './components';
import Tables from './tables';
import Icons from './icons';
import Maps from './maps';
import DragAndDrop from './drag-drop';
import Editor from './editor';
import Ecommerce from './ecommerce';
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';

// async component
import {
  AsyncDashboardComponent,
  AsyncAboutUsComponent,
  AsyncWidgetsComponent,
  AsyncChatComponent,
  AsyncMailComponent,
  AsyncTodoComponent,
  AsyncTagsComponent,
  AsyncUsuariosComponent,
  AsyncResultadosComponent,
  AsyncContratosComponent,
  AsyncClientesComponent,
  AsyncPagosComponent,
  AsyncImagenesComponent,
  AsyncConfiguracionComponent,
  AsyncExplorarComponent,
  AsyncBusquedaComponent
} from '../components/AsyncComponent/AsyncComponent';

class MainApp extends Component {

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0);
    }
  }
  goToBusqueda = () => {

    const { match, history } = this.props;
    console.log('texto', this.state.busqueda)
    localStorage.setItem('textoBusqeuda',this.state.busqueda);

    history.push('/app/busqueda');

  }

  componentWillMount() {
    const clienteSelect = localStorage.getItem('clienteSelect');
		const clienteSelectJson = JSON.parse(clienteSelect);
		if(clienteSelectJson){
			console.log('header',clienteSelectJson.acountSetting.background);
			this.setState({background : clienteSelectJson.acountSetting.background, busqueda: ''});
		}else{
      this.setState({background : 'http://www.fondos12.com/data/media/2/big/azul-difuminado-29047-1920x1080__wallpaper_480x300.jpg', busqueda: ''});
    }
	}


  componentWillReceiveProps(nextProps) {
		const clienteSelect = localStorage.getItem('clienteSelect');
		const clienteSelectJson = JSON.parse(clienteSelect);
		if(clienteSelectJson){
			console.log('header',clienteSelectJson.acountSetting.background);
			this.setState({background : clienteSelectJson.acountSetting.background, busqueda: ''});
		}else{
      this.setState({background : 'http://www.fondos12.com/data/media/2/big/azul-difuminado-29047-1920x1080__wallpaper_480x300.jpg', busqueda: ''});
    }
	
	}

  render() {
    const { navCollapsed } = this.props.settings;
    const { background, busqueda } = this.state;
    return (
      <div className={classnames('app', { 'collapsed-sidebar': navCollapsed })}>
        <div className="app-container">
          <div className="rct-page-wrapper">
            <Sidebar />
            <div className="rct-app-content">
              <Header />
              <div className="rct-page">
              <div className="fondo-busqueda text-white"
              style={{ backgroundImage: `url(${background})` }}

              
              >


<div className="margen-busqueda text-white padding-top-busqueda">
  <h3><b classNmae="text-white">Encuentra tu contenido de forma simple</b></h3>
  <p className="text-white">Busca por palabra, frase o palabras compuestas</p>
</div>
<div>


  <div className="row">
    <div className="input-group col-md-6 padding-bottom-busqueda padding-left-input-search">

      <input value={busqueda}  onChange={(event) => this.setState({ busqueda: event.target.value })} className="form-control py-2 border-right-0 border input-search-form-new" type="text" placeholder="Encontrar imagenes, videos o vectores" id="example-search-input">
      </input>

    </div>
    <div className="input-group col-md-1 padding-bottom-busqueda margin-left-select-search div-container-separador-form">
      <div className="div-separador-search-form"></div>
    </div>
    <div className="input-group col-md-3 padding-bottom-busqueda margin-left-select-search">
      <Input type="select"
        name="tipoArchivo"
        id="tipoArchivo"
        className="select-resultados altura-select-search"
      >
        <option value="tipoArchivo">Tipo de Archivo</option>
        <option value="Imagen">imágen</option>
        <option value="vector">vector</option>
        <option value="clip">clip</option>
      </Input>
      <i class="fa fa-chevron-down flecha-select-test"></i>
    </div>
    <div className="input-group col-md-2 padding-bottom-busqueda">
      <button onClick={() => this.goToBusqueda()} className="btn btn-outline-secondary color-boton-lupa-busqueda lupa-form-search" type="button">
        <i className="fa fa-search"></i>
      </button>
    </div>
  </div>
</div>





</div>
                <div className="rct-page-content">
                  <Route path={`${this.props.match.url}/dashboard`} component={AsyncDashboardComponent} />
                  <Route path={`${this.props.match.url}/tags`} component={AsyncTagsComponent} />
                  <Route path={`${this.props.match.url}/usuarios`} component={AsyncUsuariosComponent} />
                  <Route path={`${this.props.match.url}/configuracion`} component={AsyncConfiguracionComponent} />
                  <Route path={`${this.props.match.url}/resultados`} component={AsyncResultadosComponent} />
                  <Route path={`${this.props.match.url}/imagenes`} component={AsyncImagenesComponent} />
                  <Route path={`${this.props.match.url}/exlporar`} component={AsyncExplorarComponent} />
                  <Route path={`${this.props.match.url}/busqueda`} component={AsyncBusquedaComponent} />

                  <Route path={`${this.props.match.url}/clientes`} component={AsyncClientesComponent} />
                  <Route path={`${this.props.match.url}/contratos`} component={AsyncContratosComponent} />
                  <Route path={`${this.props.match.url}/Pagos`} component={AsyncPagosComponent} />
                  <Route path={`${this.props.match.url}/pages`} component={Pages} />
                  <Route path={`${this.props.match.url}/advanced-component`} component={AdvanceUIComponents} />
                  <Route path={`${this.props.match.url}/calendar`} component={CalendarComponents} />
                  <Route path={`${this.props.match.url}/charts`} component={ChartsComponents} />
                  <Route path={`${this.props.match.url}/about-us`} component={AsyncAboutUsComponent} />
                  <Route path={`${this.props.match.url}/widgets`} component={AsyncWidgetsComponent} />
                  <Route path={`${this.props.match.url}/forms`} component={FormElements} />
                  <Route path={`${this.props.match.url}/chat`} component={AsyncChatComponent} />
                  <Route path={`${this.props.match.url}/mail`} component={AsyncMailComponent} />
                  <Route path={`${this.props.match.url}/todo`} component={AsyncTodoComponent} />
                  <Route path={`${this.props.match.url}/users`} component={Users} />
                  <Route path={`${this.props.match.url}/ui-components`} component={Components} />
                  <Route path={`${this.props.match.url}/tables`} component={Tables} />
                  <Route path={`${this.props.match.url}/icons`} component={Icons} />
                  <Route path={`${this.props.match.url}/maps`} component={Maps} />
                  <Route path={`${this.props.match.url}/drag-andDrop`} component={DragAndDrop} />
                  <Route path={`${this.props.match.url}/editor`} component={Editor} />
                  <Route path={`${this.props.match.url}/ecommerce`} component={Ecommerce} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <SearchForm />
        <Tour />
      
      </div>
    );
  }
}

const mapStateToProps = ({ settings }) => {
  return { settings }
}

export default withRouter(connect(mapStateToProps)(MainApp));
