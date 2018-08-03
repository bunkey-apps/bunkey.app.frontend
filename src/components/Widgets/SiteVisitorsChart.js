/**
 * Site Visitors Chart
 */
// /* eslint-disable */
import React, { Component } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

// chart config
import ChartConfig from '../../constants/chart-config';

class SiteVisitorChart extends Component {
    render() {
        return (
            <ResponsiveContainer width='100%' height={330}>
                <LineChart data={this.props.data}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Line type="monotone" dataKey="pv" stroke={ChartConfig.color.primary} />
                    <Line type="monotone" dataKey="uv" stroke={ChartConfig.color.warning} />
                </LineChart>
            </ResponsiveContainer>
        )
    }
}

export default SiteVisitorChart;
