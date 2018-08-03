import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';
import ChartConfig from '../../../constants/chart-config';

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Series A',
      fill: false,
      lineTension: 0.1,
      backgroundColor: ChartConfig.color.primary,
      borderColor: ChartConfig.color.primary,
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: ChartConfig.color.warning,
      pointBackgroundColor: ChartConfig.color.warning,
      pointBorderWidth: 5,
      pointHoverRadius: 10,
      pointHoverBackgroundColor: ChartConfig.color.warning,
      pointHoverBorderColor: ChartConfig.color.warning,
      pointHoverBorderWidth: 3,
      pointRadius: 10,
      pointHitRadius: 10,
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

export default class LineChartComponent extends Component {

	render(){
  	return (
    	<Line data={data} options={options} />
    );
  }
}
