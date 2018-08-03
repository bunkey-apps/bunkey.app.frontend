/**
 * Visitor Area Chart Widget
 */
import React from 'react';
import CountUp from 'react-countup';

// chart
import TinyAreaChart from '../Charts/TinyAreaChart';

// intl messages
import IntlMessages from '../../util/IntlMessages';

// rct card box
import { RctCard, RctCardContent } from '../../components/RctCard';

// chart config
import ChartConfig from '../../constants/chart-config';

// helpers
import { hexToRgbA } from '../../helpers/helpers';

const VisitorAreaChart = ({ data }) => (
    <RctCard>
        <RctCardContent>
            <div className="clearfix">
                <div className="float-left">
                    <h3 className="mb-15"><IntlMessages id="widgets.visitors" /></h3>
                    <div className="d-flex">
                        <div className="mr-50">
                            <span className="fs-14 text-muted d-block">Weekly</span>
                            <CountUp className="counter-point" start={0} end={data.weekly} duration={5} useEasing={true} />
                        </div>
                        <div className="">
                            <span className="fs-14 text-muted d-block">Monthly</span>
                            <CountUp className="counter-point" start={0} end={data.monthly} duration={5} useEasing={true} />
                        </div>
                    </div>
                </div>
                <div className="float-right hidden-md-down">
                    <div className="featured-section-icon">
                        <span className="ti-world"></span>
                    </div>
                </div>
            </div>
        </RctCardContent>
        <TinyAreaChart
            label="Visitors"
            chartdata={data.chartData.data}
            labels={data.chartData.labels}
            backgroundColor={hexToRgbA(ChartConfig.color.primary, 0.6)}
            borderColor={hexToRgbA(ChartConfig.color.primary, 1)}
            lineTension="0.4"
            height={70}
            gradient
        />
    </RctCard>
);

export default VisitorAreaChart;
