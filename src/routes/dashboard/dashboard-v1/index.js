/**
 * Dashboard V1
 */
/* eslint-disable */
import React, { Component } from 'react';

import Folders from './components/Folders';
import Favoritos from './components/Favoritos';
import Recientes from './components/Recientes';
import Compartidos from './components/Compartidos';

// Main Component
export default class DashboardOne extends Component {

  state = {
    collapse: false,
    urlVideo: '',
    author: '',
    title: ''
  }

  goToBusqueda = () => {
    const { history } = this.props;
    history.push('/app/busqueda');
  }

  goToImagenes= () => {
    const { history } = this.props;
    history.push('/app/imagenes');

  }

  onCollapse(title) {
    if (!this.state.collapse) {
      setTimeout(function () {
        window.scrollTo(500, 400);
      }, 500);
    }
    this.setState({ collapse: !this.state.collapse, urlVideo: title.link, author: title.author, title: title.title });
  }

  render() {
    return (
      <div className="dashboard-v1">
        <Recientes />
        <Folders/>
        <Favoritos/>
        <Compartidos />
      </div>
    );
  }
}
