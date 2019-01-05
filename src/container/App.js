/**
 * App.js Layout Start Here
 */
/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { MuiThemeProvider } from 'material-ui/styles';
import { IntersectingCirclesSpinner } from 'react-epic-spinners';
import { IntlProvider } from 'react-intl';
import { Redirect, Route } from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';

// app routes
import MainApp from '../routes';

// app signin
import AppSignIn from './SigninFirebase';
import AppSignUp from './SignupFirebase';
import AppRegistro from '../routes/registro/components/Registro';
import AppCompartidos from '../routes/compartidos/components/Compartidos';

// App locale
import AppLocale from '../lang';

// themes
import lightTheme from './themes/lightTheme';
import darkTheme from './themes/darkTheme';

// async components
import {
  AsyncSessionLoginComponent,
  AsyncSessionRegisterComponent,
  AsyncSessionLockScreenComponent,
  AsyncSessionForgotPasswordComponent,
  AsyncSessionPage404Component,
  AsyncSessionPage500Component,
  AsyncTermsConditionComponent,
  AsyncRegistroComponent
} from '../components/AsyncComponent/AsyncComponent';

/**
 * Initial Path To Check Whether User Is Logged In Or Not
 */
const InitialPath = ({ component: Component, ...rest, authUser }) =>
  <Route
    {...rest}
    render={props =>
      authUser
        ? <Component {...props} />
        : <Redirect
          to={{
            pathname: '/signin',
            state: { from: props.location }
          }}
        />}
  />;

class App extends Component {

  state = {
    loading: true
  }

  componentDidMount() {
    let self = this;
    setTimeout(() => {
      self.setState({ loading: false });
    }, 1000);
  }

  render() {
    const { locale, darkMode } = this.props.settings;
    if (this.state.loading) {
      return (
        <div className="d-flex justify-content-center">
          <IntersectingCirclesSpinner color="red" className="rct-loader" />
        </div>
      );
    }
    if (this.props.location.pathname === '/') {
      if (this.props.user === null) {
        return (<Redirect to={'/signin'} />);
      } else {
        return (<Redirect to={'/app/clientes'} />);
      }
    }
    const currentAppLocale = AppLocale[locale.locale];
    let theme = '';
    if (darkMode) {
      theme = darkTheme
    } else {
      theme = lightTheme
    }
    return (
      <MuiThemeProvider theme={theme}>
        <IntlProvider
          locale={currentAppLocale.locale}
          messages={currentAppLocale.messages}
        >
          <React.Fragment>
            <NotificationContainer />
            <InitialPath path={`${this.props.match.url}app`} authUser={this.props.user} component={MainApp} />
            <Route path="/signin" component={AppSignIn} />
            <Route path="/signup" component={AppSignUp} />
            <Route path="/session/login" component={AsyncSessionLoginComponent} />
            <Route path="/session/register" component={AsyncSessionRegisterComponent} />
            <Route path="/session/lock-screen" component={AsyncSessionLockScreenComponent} />
            <Route path="/session/forgot-password" component={AsyncSessionForgotPasswordComponent} />
            <Route path="/session/404" component={AsyncSessionPage404Component} />
            <Route path="/session/500" component={AsyncSessionPage500Component} />
            <Route path="/terms-condition" component={AsyncTermsConditionComponent} />
            <Route path="/usuario-invitado" component={AppRegistro} />
            <Route path="/archivos-compartidos" component={AppCompartidos} />

          </React.Fragment>
        </IntlProvider>
      </MuiThemeProvider>
    );
  }
}

// map state to props
const mapStateToProps = ({ settings, authUser }) => {
  const { user } = authUser;
  return { settings, user };
};

export default connect(mapStateToProps)(App);
