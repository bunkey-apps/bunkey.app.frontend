/**
 * Overall Traffic Status Widget
 */
/* eslint-disable */
import React, { Component, Fragment } from 'react';
import { CircularProgress } from 'material-ui/Progress';

// chart
import StackedBarChart from '../Charts/StackedBarChart';

// intl messages
import IntlMessages from '../../util/IntlMessages';

// chart config
import ChartConfig from '../../constants/chart-config';

export default class OverallTrafficStatus extends Component {
    render() {
        const { chartLabels, chartDatasets, onlineSources, today, lastMonth } = this.props.chartData;
        return (
            <Fragment>
                <div className="border-bottom p-40 display-n">
                    <div className="row">
                        <div className="col-xl-4 col-md-4 col-sm-4">
                            <span className="text-muted mb-5 d-block">Online Sources</span>
                            <div className="d-flex justify-content-between">
                                <h2 className="text-muted mb-0">{onlineSources}</h2>
                                <i className="ti-arrow-up text-info font-2x"></i>
                            </div>
                        </div>
                        <div className="col-xl-4 col-md-4 col-sm-4">
                            <span className="text-muted mb-5 d-block">Today</span>
                            <div className="d-flex justify-content-between">
                                <h2 className="text-muted mb-0">{today} </h2>
                                <i className="ti-arrow-up text-info font-2x"></i>
                            </div>
                        </div>
                        <div className="col-xl-4 col-md-4 col-sm-4">
                            <span className="text-muted mb-5 d-block">Last month %</span>
                            <div className="d-flex justify-content-between">
                                <h2 className="text-muted mb-0">{lastMonth} </h2>
                                <i className="ti-arrow-down text-pink font-2x"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <StackedBarChart
                    labels={chartLabels}
                    datasets={chartDatasets}
                />
            </Fragment>
        );
    }
}
