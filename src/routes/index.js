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
  AsyncContratosComponent,
  AsyncClientesComponent,
  AsyncPagosComponent
} from '../components/AsyncComponent/AsyncComponent';

class MainApp extends Component {

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    const { navCollapsed } = this.props.settings;
    return (
      <div className={classnames('app', { 'collapsed-sidebar': navCollapsed })}>
        <div className="app-container">
          <div className="rct-page-wrapper">
            <Sidebar />
            <div className="rct-app-content">
              <Header />
              <div className="rct-page">
                <div className="rct-page-content">
                  <Route path={`${this.props.match.url}/dashboard`} component={AsyncDashboardComponent} />
                  <Route path={`${this.props.match.url}/tags`} component={AsyncTagsComponent} />
                  <Route path={`${this.props.match.url}/usuarios`} component={AsyncUsuariosComponent} />
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
