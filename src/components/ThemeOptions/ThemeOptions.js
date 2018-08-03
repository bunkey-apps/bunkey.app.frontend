/**
 * Theme Options
 */
/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { DropdownToggle, DropdownMenu, Dropdown } from 'reactstrap';
import Button from 'material-ui/Button';
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import { Scrollbars } from 'react-custom-scrollbars';
import Switch from 'material-ui/Switch';
import $ from 'jquery';

// redux actions
import {
    activateSidebarFilter,
    toggleSidebarImage,
    setSidebarBgImageAction,
    miniSidebarAction,
    darkModeAction,
    boxLayoutAction,
    rtlLayoutAction
} from '../../actions';

// intl messages
import IntlMessages from '../../util/IntlMessages';

class ThemeOptions extends Component {

    state = {
        switched: false,
        themeOptionPanelOpen: true
    }

    componentDidMount() {
        const { darkMode, boxLayout, rtlLayout, miniSidebar } = this.props;
        if (darkMode) {
            this.darkModeHanlder(true);
        }
        if (boxLayout) {
            this.boxLayoutHanlder(true);
        }
        if (rtlLayout) {
            this.rtlLayoutHanlder(true);
        }
        if (miniSidebar) {
            this.miniSidebarHanlder(true);
        }
    }

    /**
     * Set Sidebar Background Image
     */
    setSidebarBgImage(sidebarImage) {
        this.props.setSidebarBgImageAction(sidebarImage);
    }

    /**
     * Function To Toggle Theme Option Panel
     */
    toggleThemePanel() {
        this.setState({
            themeOptionPanelOpen: !this.state.themeOptionPanelOpen
        });
    }

    /**
     * Mini Sidebar Event Handler
    */
    miniSidebarHanlder(isTrue) {
        if (isTrue) {
            $('body').addClass('mini-sidebar');
        } else {
            $('body').removeClass('mini-sidebar');
        }
        this.props.miniSidebarAction(isTrue);
    }

    /**
     * Dark Mode Event Hanlder
     * Use To Enable Dark Mode
     * @param {*object} event
    */
    darkModeHanlder(isTrue) {
        if (isTrue) {
            $('body').addClass('dark-mode');
        } else {
            $('body').removeClass('dark-mode');
        }
        this.props.darkModeAction(isTrue);
    }

    /**
     * Box Layout Event Hanlder
     * Use To Enable Boxed Layout
     * @param {*object} event
    */
    boxLayoutHanlder(isTrue) {
        if (isTrue) {
            $('body').addClass('boxed-layout');
        } else {
            $('body').removeClass('boxed-layout');
        }
        this.props.boxLayoutAction(isTrue);
    }

    /**
     * Rtl Layout Event Hanlder
     * Use to Enable rtl Layout
     * @param {*object} event
    */
    rtlLayoutHanlder(isTrue) {
        if (isTrue) {
            $('body').addClass('rtl-layout');
        } else {
            $('body').removeClass('rtl-layout');
        }
        this.props.rtlLayoutAction(isTrue);
    }

    render() {
        const { sidebarFilters, sidebarActiveFilter, enableSidebarBackgroundImage, sidebarBackgroundImages, selectedSidebarImage, locale, miniSidebar, darkMode, boxLayout, rtlLayout } = this.props;
        return (
            <div className="fixed-plugin">
                <Dropdown isOpen={this.state.themeOptionPanelOpen} toggle={() => this.toggleThemePanel()}>
                    <DropdownToggle>
                        <i className="fa fa-cog fa-2x fa-spin tour-step-5"></i>
                    </DropdownToggle>
                    <DropdownMenu>
                        <Scrollbars autoHeight autoHeightMin={100} autoHeightMax={500} autoHide autoHideDuration={100}>
                            <ul className="list-unstyled text-center mb-0">
                                <li className="header-title mb-10">
                                    <IntlMessages id="themeOptions.sidebarOverlay" />
                                </li>
                                <li className="adjustments-line">
                                    <a href="javascript:void(0)">
                                        <div className="badge-colors text-center">
                                            {sidebarFilters.map((filter, key) => (
                                                <span
                                                    key={key}
                                                    onClick={() => this.props.activateSidebarFilter(filter)}
                                                    className={classnames(`badge filter gradient-${filter}`, { 'active': filter === sidebarActiveFilter })}>
                                                </span>
                                            ))}
                                        </div>
                                        <div className="clearfix"></div>
                                    </a>
                                </li>
                                <li className="header-title mb-10">
                                    <IntlMessages id="themeOptions.sidebarBackgroundImages" />
                                </li>
                                <li className="header-title">
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={enableSidebarBackgroundImage}
                                                onClick={() => this.props.toggleSidebarImage()}
                                            />
                                        }
                                        label={<IntlMessages id="themeOptions.sidebarImage" />}
                                    />
                                </li>
                                {enableSidebarBackgroundImage &&
                                    <li className="background-img">
                                        {sidebarBackgroundImages.map((sidebarImage, key) => (
                                            <a className={classnames('img-holder', { 'active': selectedSidebarImage === sidebarImage })} href="javascript:void(0)" key={key} onClick={() => this.setSidebarBgImage(sidebarImage)}>
                                                <img src={sidebarImage} alt="sidebar image" className="img-fluid" width="" height="" />
                                            </a>
                                        ))}
                                    </li>
                                }
                            </ul>
                            <ul className="list-unstyled mb-0 p-10">
                                <li className="header-title mb-10">
                                    <IntlMessages id="themeOptions.appSettings" />
                                </li>
                                <li className="header-title">
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={miniSidebar}
                                                onChange={(e) => this.miniSidebarHanlder(e.target.checked)}
                                            />
                                        }
                                        label={<IntlMessages id="themeOptions.miniSidebar" />}
                                        className="m-0"
                                    />
                                </li>
                                <li className="header-title">
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={boxLayout}
                                                onChange={(e) => this.boxLayoutHanlder(e.target.checked)}
                                            />
                                        }
                                        label={<IntlMessages id="themeOptions.boxLayout" />}
                                        className="m-0"
                                    />
                                </li>
                                <li className="header-title">
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={rtlLayout}
                                                onChange={(e) => this.rtlLayoutHanlder(e.target.checked)}
                                            />
                                        }
                                        label={<IntlMessages id="themeOptions.rtlLayout" />}
                                        className="m-0"
                                    />
                                </li>
                                <li className="header-title">
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={darkMode}
                                                onChange={(e) => this.darkModeHanlder(e.target.checked)}
                                            />
                                        }
                                        label="Dark Mode"
                                        label={<IntlMessages id="themeOptions.darkMode" />}
                                        className="m-0"
                                    />
                                </li>
                            </ul>
                        </Scrollbars>
                    </DropdownMenu>
                </Dropdown>
            </div>
        );
    }
}

// map state to props
const mapStateToProps = ({ settings }) => {
    return settings;
};

export default connect(mapStateToProps, {
    activateSidebarFilter,
    toggleSidebarImage,
    setSidebarBgImageAction,
    miniSidebarAction,
    darkModeAction,
    boxLayoutAction,
    rtlLayoutAction
})(ThemeOptions);
