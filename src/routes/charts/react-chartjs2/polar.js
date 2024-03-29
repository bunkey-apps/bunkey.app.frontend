import React, {Component} from 'react';
import {Polar} from 'react-chartjs-2';
import ChartConfig from '../../../constants/chart-config';

const data = {
  datasets: [{
    data: [
      11,
      16,
      7,
      3
    ],
    backgroundColor: [
        ChartConfig.color.primary,
        ChartConfig.color.warning,
        ChartConfig.color.danger,
        ChartConfig.color.success
    ],
    label: 'My dataset'
  }],
  labels: [
    'Series A',
    'Series B',
    'Series C',
    'Series D'
  ]
};

const options = {
	legend: {
		labels: {
			fontColor: ChartConfig.legendFontColor
		}
	}
};

export default class PolarChart extends Component {

  render() {
    return (
      <Polar data={data} options={options} />
    );
  }
}
