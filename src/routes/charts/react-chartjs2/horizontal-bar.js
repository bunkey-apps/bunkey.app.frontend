import React, {Component} from 'react';
import {HorizontalBar} from 'react-chartjs-2';
import ChartConfig from '../../../constants/chart-config';

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Series A',
      backgroundColor: ChartConfig.color.success,
      borderColor: ChartConfig.color.success,
      borderWidth: 1,
      hoverBackgroundColor: ChartConfig.color.success,
      hoverBorderColor: ChartConfig.color.success,
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
};

const options = {
  legend: {
		labels: {
			fontColor: ChartConfig.legendFontColor
		}
	},
  scales: {
    xAxes: [{
      gridLines: {
        color: ChartConfig.chartGridColor
      },
      ticks: {
        fontColor: ChartConfig.axesColor
      }
    }],
    yAxes: [{
      gridLines: {
        color: ChartConfig.chartGridColor
      },
      ticks: {
        fontColor: ChartConfig.axesColor
      }
    }]
  }
};

export default class HorizontalBarChart extends Component {

  render() {
    return (
      <HorizontalBar data={data} options={options} />
    );
  }
}
