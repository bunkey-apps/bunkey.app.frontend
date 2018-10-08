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
            imagenCliente: props.imagenCliente
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





    render() {
        return (
            <div className="top-sidebar">
                <div className="site-logo">

                    <Link to="/" className="logo-normal user-title-menu">
                        <img src={require('../../assets/img/logo_bunkey-w.svg')} className="img-fluid" alt="site-logo" />
                    </Link>
                </div>

                {this.state.imagenCliente &&
                    <div>

                        <div>
                            <img src={this.state.imagenCliente} className="img-fluid logo-menu-rect" />

                        </div>
                        <div className="text-center nombre-cliente-menu">
                            {this.state.nameCliente}

                        </div>

                    </div>

                }

                <div className="sidebar-user-block media">
                    <div className="user-profile">
                        <img src={this.state.imagen} alt="user profile" className="img-fluid rounded-circle borde-perfil-bunkey" width="60" height="129" />
                    </div>
                    <Dropdown isOpen={this.state.userDropdownMenu} toggle={() => this.toggleUserDropdownMenu()} className="rct-dropdown media-body pt-10">
                        <DropdownToggle nav>
                            <div>
                                {this.state.name}
                                <i className="ti-angle-down pull-right flecha-name-user"></i>
                            </div>

                        </DropdownToggle>
                        <DropdownMenu>
                            <ul className="list-unstyled mb-0">

                                <li className="border-top">
                                    <Link to={{
                                        pathname: '/app/clientes',
                                        state: { activeTab: 0 }
                                    }}>
                                        <i className="ti ti-user"></i>
                                        <IntlMessages id="Seleccionar Cliente" />
                                    </Link>
                                </li>
                                <li className="border-top">
                                    <a href="javascript:void(0)" onClick={() => this.logoutUser()}>
                                        <i className="ti ti-power-off"></i>
                                        Salir
                                    </a>
                                </li>
                            </ul>
                        </DropdownMenu>
                    </Dropdown>
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
