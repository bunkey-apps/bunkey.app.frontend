/**
 * Users Area Chart Widget
 */
import React from 'react';
import CountUp from 'react-countup';

// chart
import TinyAreaChart from '../Charts/TinyAreaChart';

// chart config
import ChartConfig from '../../constants/chart-config';

// rct card box
import { RctCard, RctCardContent } from '../../components/RctCard';

// helpers
import { hexToRgbA } from '../../helpers/helpers';

const UsersAreaChart = ({ data }) => (
    <RctCard>
        <RctCardContent>
            <div className="clearfix">
                <div className="float-left">
                    <h3 className="mb-15">Sales</h3>
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
                        <span className="ti-shopping-cart"></span>
                    </div>
                </div>
            </div>
        </RctCardContent>
        <TinyAreaChart
            label="Sales"
            chartdata={data.chartData.data}
            labels={data.chartData.labels}
            backgroundColor={hexToRgbA(ChartConfig.color.success, 0.6)}
            borderColor={ChartConfig.color.success}
            lineTension="0.4"
            height={70}
            gradient
        />
    </RctCard>
);

export default UsersAreaChart;
