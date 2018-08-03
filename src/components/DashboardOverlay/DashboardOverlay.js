/**
 * Dashboard Overlay
 */
/* eslint-disable */
import React, { Component } from 'react';
import classnames from 'classnames';
import $ from 'jquery';

// intl messages
import IntlMessages from '../../util/IntlMessages';

// component
import OrdersStats from './Orders';
import UsersStats from './Users';
import RatingsStats from './Ratings';

class DashboardOverlay extends Component {

    componentDidMount() {
        $('.dashboard-overlay').removeClass('show');
        $('.dashboard-overlay').addClass('d-none');
    }

    render() {
        let self = this;
        const { onClose } = this.props;
        return (
            <div className={classnames("dashboard-overlay")}>
                <div className="overlay-head d-flex justify-content-between mb-40">
                    <div className="dash-user-info">
                        <h2 className="fw-bold mb-0"><IntlMessages id="components.summary" /></h2>
                    </div>
                    <a href="javascript:void(0)" onClick={onClose} className="closed">
                        <i className="ti-close"></i>
                    </a>
                </div>
                <div className="dashboard-overlay-content mb-30">
                    <div className="row row-eq-height">
                        <div className="col-sm-6 col-md-4">
                            <OrdersStats />
                        </div>
                        <div className="col-sm-6 col-md-4">
                            <UsersStats />
                        </div>
                        <div className="col-sm-12 col-md-4">
                            <RatingsStats />
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default DashboardOverlay;
