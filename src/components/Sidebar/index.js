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
	}

	componentDidMount() {
		window.addEventListener("resize", this.updateDimensions);
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.updateDimensions);
	}

	componentWillReceiveProps(nextProps) {
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
		const { windowWidth, windowHeight } = this.state;
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
							<UserBlock />
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
