/**
 * Sidebar Content
 */
import React, { Fragment, Component } from 'react';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import ListSubheader from 'material-ui/List/ListSubheader';
import Collapse from 'material-ui/transitions/Collapse';
import { NavLink, withRouter } from 'react-router-dom';
import classNames from 'classnames';
import { connect } from 'react-redux';

import IntlMessages from '../../util/IntlMessages';

// redux actions
import { onToggleMenu } from '../../actions';

class SidebarContent extends Component {

    state = {
        multilevel1: false,
        subLevel: false
    }

    toggleMenu(menu, stateCategory) {
        let data = {
            menu,
            stateCategory
        }
        this.props.onToggleMenu(data);
    }

    render() {
        const { sidebarMenus } = this.props.sidebar;
        return (
            <div className="rct-sidebar-nav">
                <nav className="navigation">
                    <List
                        className="rct-mainMenu p-0 m-0 list-unstyled"
                        subheader={
                            <ListSubheader className="side-title" component="li">
                                <IntlMessages id="sidebar.general" />
                            </ListSubheader>}>
                        {sidebarMenus.category1.map((menu, key) => {
                            if (menu.child_routes != null) {
                                return (
                                    <Fragment key={key}>
                                        <ListItem button component="li" onClick={() => this.toggleMenu(menu, 'category1')} className={classNames({ 'item-active': menu.open })}>
                                            <ListItemIcon className="menu-icon">
                                                <i className={menu.menu_icon}></i>
                                            </ListItemIcon>
                                            <span className="menu">
                                                <IntlMessages id={menu.menu_title} />
                                            </span>
                                            {menu.open ? <i className="ti-angle-down side-arrow"></i> : <i className="ti-angle-right side-arrow"></i>}
                                        </ListItem>
                                        <Collapse in={menu.open} timeout="auto">
                                            <List className="sub-menu list-unstyled">
                                                {menu.child_routes.map((subMenu, index) => {
                                                    return (
                                                        <ListItem button component="li" key={index}>
                                                            <NavLink activeClassName="item-active" to={subMenu.path}>
                                                                <span className="menu">
                                                                    <IntlMessages id={subMenu.menu_title} />
                                                                </span>
                                                            </NavLink>
                                                        </ListItem>
                                                    );
                                                })}
                                            </List>
                                        </Collapse>
                                    </Fragment>
                                );
                            }
                            else {
                                return (
                                    <ListItem button component="li" key={key}>
                                        <NavLink activeClassName="item-active" to={menu.path}>
                                            <ListItemIcon className="menu-icon">
                                                <i className={menu.menu_icon}></i>
                                            </ListItemIcon>
                                            <span className="menu">
                                                <IntlMessages id={menu.menu_title} />
                                            </span>
                                        </NavLink>
                                    </ListItem>
                                );
                            }
                        })}
                    </List>
                </nav>
            </div>
        );
    }
}

// map state to props
const mapStateToProps = ({ sidebar }) => {
    return { sidebar };
};

export default withRouter(connect(mapStateToProps, {
    onToggleMenu
})(SidebarContent));
