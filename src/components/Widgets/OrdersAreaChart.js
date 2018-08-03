/**
 * Orders Area Chart Widget
 */
import React from 'react';
import CountUp from 'react-countup';

// chart
import TinyAreaChart from '../Charts/TinyAreaChart';

// intl messages
import IntlMessages from '../../util/IntlMessages';

// chart config
import ChartConfig from '../../constants/chart-config';

// rct card box
import { RctCard, RctCardContent } from '../../components/RctCard';

// helpers
import { hexToRgbA } from '../../helpers/helpers';

const OrdersAreaChart = ({ data }) => (
    <RctCard>
        <RctCardContent>
            <div className="clearfix">
                <div className="float-left">
                    <h3 className="mb-15"><IntlMessages id="widgets.orders" /></h3>
                    <div className="d-flex">
                        <div className="mr-50">
                            <span className="fs-14 text-muted d-block">Today</span>
                            <CountUp className="counter-point" start={0} end={data.today} duration={5} useEasing={true} />
                        </div>
                        <div className="">
                            <span className="fs-14 text-muted d-block">Total Revenue</span>
                            <CountUp className="counter-point" start={0} end={data.totalRevenue} duration={5} useEasing={true} />
                        </div>
                    </div>
                </div>
                <div className="float-right hidden-md-down">
                    <div className="featured-section-icon">
                        <span className="ti-bolt"></span>
                    </div>
                </div>
            </div>
        </RctCardContent>
        <TinyAreaChart
            label="Orders"
            chartdata={data.chartData.data}
            labels={data.chartData.labels}
            backgroundColor={hexToRgbA(ChartConfig.color.danger, 0.6)}
            borderColor={ChartConfig.color.danger}
            lineTension="0.4"
            height={70}
            gradient
        />
    </RctCard>
);

export default OrdersAreaChart;
