/**
 * Reactify Sidebar
 */
import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';
import $ from 'jquery';

// redux actions
import { collapsedSidebarAction } from '../../actions';

// components
import UserBlock from './UserBlock';
import SidebarContent from './SidebarContent';

class Sidebar extends Component {

	

	componentWillMount() {
		this.updateDimensions();
		const clienteSelect = localStorage.getItem('clienteSelect');
		const clienteSelectJson = JSON.parse(clienteSelect);

		const userMe = localStorage.getItem('user_me');
			const userMeJson = JSON.parse(userMe);
			var showChangeCliente = false;
			var tipoUsuario = localStorage.getItem('tipoUsuario');
      
			if((userMeJson.workClients && userMeJson.workClients.length > 1) || tipoUsuario === 'admin'){

				showChangeCliente = true;
			}




		if(clienteSelectJson){
			console.log('clienteSelectJson.name',clienteSelectJson.name);
			this.setState({nameCliente : clienteSelectJson.name, imagenCliente : clienteSelectJson.acountSetting.logo, showChangeCliente: showChangeCliente});
		}
			
			if(userMeJson){
				this.setState({name : userMeJson.name, imagen : userMeJson.avatar, showChangeCliente: showChangeCliente});

			}else{
				this.setState({showChangeCliente: showChangeCliente, name: '', imagen : 'data:image/png;base64,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'});

			}

			
		
	}

	componentDidMount() {
		window.addEventListener("resize", this.updateDimensions);
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.updateDimensions);
	}

	componentWillReceiveProps(nextProps) {
		const clienteSelect = localStorage.getItem('clienteSelect');
		const clienteSelectJson = JSON.parse(clienteSelect);
		const userMe = localStorage.getItem('user_me');
			const userMeJson = JSON.parse(userMe);
		var showChangeCliente = false;
		var tipoUsuario = localStorage.getItem('tipoUsuario');
      
			if((userMeJson.workClients && userMeJson.workClients.length > 1) || tipoUsuario === 'admin'){

			showChangeCliente = true;
		}

		if(clienteSelectJson){
			console.log('clienteSelectJson.name',clienteSelectJson.name);
			this.setState({nameCliente : clienteSelectJson.name, imagenCliente : clienteSelectJson.acountSetting.logo,showChangeCliente: showChangeCliente});
		}
			
			if(userMeJson){
				this.setState({name : userMeJson.name, imagen : userMeJson.avatar, showChangeCliente: showChangeCliente});
			}else{
				this.setState({showChangeCliente: showChangeCliente, name : '', imagen : 'data:image/png;base64,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'});

			}
		
		const { windowWidth } = this.state;
		const { collapsedSidebar } = this.props;
		if (nextProps.location !== this.props.location) {
			if (windowWidth <= 1199) {
				this.props.collapsedSidebarAction(false);
			}
		}
	}

	updateDimensions = () => {
		this.setState({ windowWidth: $(window).width(), windowHeight: $(window).height() });
	}

	closeDrawer() {
		const val = false;
		const { collapsedSidebarAction } = this.props;
		collapsedSidebarAction(val);
	}

	render() {
		const { windowWidth, windowHeight, name, imagen , nameCliente, imagenCliente, showChangeCliente} = this.state;
		const { sidebarActiveFilter, enableSidebarBackgroundImage, selectedSidebarImage, rtlLayout } = this.props;
		return (
			<Drawer
				open={windowWidth <= 1199 ? this.props.navCollapsed : !this.props.navCollapsed}
				variant={windowWidth <= 1199 ? 'temporary' : 'persistent'}
				onClose={() => this.closeDrawer()}
				anchor={rtlLayout ? 'right' : 'left'}
			>
			<div
			className={classNames('rct-sidebar')}
			style={{ background: '#18232A' }}
		>
				<Scrollbars autoHeight autoHeightMin={100} autoHeightMax={windowHeight} autoHide autoHideDuration={100}>
					
						<div className={`rct-sidebar-wrap`}>
							<UserBlock name={name} imagen = {imagen} nameCliente={nameCliente} imagenCliente={imagenCliente} showChangeCliente={showChangeCliente}/>
							<SidebarContent />
						</div>
					
				</Scrollbars>
				</div>
			</Drawer>
		);
	}
}

// map state to props
const mapStateToProps = ({ settings }) => {
	return settings;
};

export default withRouter(connect(mapStateToProps, {
	collapsedSidebarAction,
})(Sidebar));
