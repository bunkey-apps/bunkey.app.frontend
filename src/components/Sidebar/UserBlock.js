/**
 * User Block Component
 */
/* eslint-disable */
import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { NotificationManager } from 'react-notifications';

// components
import SupportPage from '../Support/Support';

// redux action
import { logoutUserFromFirebase } from '../../actions';

// intl messages
import IntlMessages from '../../util/IntlMessages';

// app config
import AppConfig from '../../constants/AppConfig';

class UserBlock extends Component {
    constructor(props) {
        super()
        console.log('props.name', props.name);
        this.state = {
            userDropdownMenu: false,
            isSupportModal: false,
            name: props.name,
            imagen: props.imagen,
            nameCliente: props.nameCliente,
            imagenCliente: props.imagenCliente,
            showChangeCliente: props.showChangeCliente
        }

    }
    componentWillReceiveProps(nextProps) {
        console.log('porpsppspspssp', nextProps.name);
        this.setState({ name: nextProps.name, imagen: nextProps.imagen, nameCliente: nextProps.nameCliente, imagenCliente: nextProps.imagenCliente });

    }
    /**
     * Logout User
     */
    logoutUser() {
        this.props.logoutUserFromFirebase();
    }

    /**
     * Toggle User Dropdown Menu
     */
    toggleUserDropdownMenu() {
        this.setState({ userDropdownMenu: !this.state.userDropdownMenu });
    }

    /**
     * Open Support Modal
     */
    openSupportModal() {
        this.setState({ isSupportModal: true });
    }

    /**
     * On Close Support Page
     */
    onCloseSupportPage() {
        this.setState({ isSupportModal: false });
    }

    /**
     * On Submit Support Page
     */
    onSubmitSupport() {
        this.setState({ isSupportModal: false });
        NotificationManager.success('Message has been sent successfully!');
    }



/*
 {this.state.imagenCliente &&
                    <div>

                        <div className="text-center">
                            <img src={this.state.imagenCliente} className="img-fluid logo-menu-rect" />

                        </div>
                        <div className="text-center nombre-cliente-menu">
                            {this.state.nameCliente}

                        </div>

                    </div>

                }

                */

    render() {
        return (
            <div className="top-sidebar">
                <div className="site-logo">

                    <Link to="/app/dashboard" className="logo-normal user-title-menu">
                        <img src={require('../../assets/img/logo_bunkey-w.svg')} className="img-fluid" alt="site-logo" />
                    </Link>
                </div>

               

               

                <div className="sidebar-user-block media">
                {this.state.showChangeCliente && this.state.imagenCliente &&
                        <div className="text-center nombre-cliente-menu">
                                    <Link to="/app/clientes" className="logo-normal user-title-menu">
                                    Cambiar cliente
                                    </Link>
                                </div>
                }
                {this.state.showChangeCliente && !this.state.imagenCliente &&
                        <div className="text-center nombre-cliente-menu">
                                    <Link to="/app/clientes" className="logo-normal user-title-menu">
                                    Seleccionar cliente
                                    </Link>
                                </div>
                }
                </div>
                <SupportPage
                    isOpen={this.state.isSupportModal}
                    onCloseSupportPage={() => this.onCloseSupportPage()}
                    onSubmit={() => this.onSubmitSupport()}
                />
            </div>
        );
    }
}

export default connect(null, {
    logoutUserFromFirebase
})(UserBlock);
