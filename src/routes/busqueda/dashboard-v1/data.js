// dashboard-v1 data

// chart config
import ChartConfig from '../../../constants/chart-config';

// helpers
import { hexToRgbA } from '../../../helpers/helpers';

// total earns
export const totalEarns = {
    labels: ['Jan 1', 'Jan 7', 'Jan 14', 'Jan 21', 'Jan 28', 'Feb 4', 'Feb 11', 'Feb 18', 'Feb 25', 'Feb 28', 'Mar 2', 'Mar 6'],
    datasets: [
        {
            label: 'Sales',
            fill: true,
            lineTension: 0.4,
            fillOpacity: 0.5,
            backgroundColor: hexToRgbA(ChartConfig.color.primary, 0.9),
            borderColor: 'transparent',
            pointBorderColor: ChartConfig.color.white,
            pointBackgroundColor: ChartConfig.color.white,
            pointBorderWidth: 0,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: hexToRgbA(ChartConfig.color.primary, 1),
            pointHoverBorderColor: hexToRgbA(ChartConfig.color.primary, 1),
            pointHoverBorderWidth: 8,
            pointRadius: 0,
            pointHitRadius: 10,
            data: [250, 350, 270, 420, 380, 220, 400, 550, 480, 190, 390, 380]
        },
        {
            label: 'Visitors',
            fill: true,
            lineTension: 0.4,
            fillOpacity: 0.5,
            backgroundColor: hexToRgbA(ChartConfig.color.greyLighten, 0.8),
            borderColor: 'transparent',
            pointBorderColor: ChartConfig.color.white,
            pointBackgroundColor: ChartConfig.color.white,
            pointBorderWidth: 0,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: hexToRgbA(ChartConfig.color.greyLighten, 1),
            pointHoverBorderColor: hexToRgbA(ChartConfig.color.greyLighten, 1),
            pointHoverBorderWidth: 8,
            pointRadius: 0,
            pointHitRadius: 10,
            data: [600, 400, 500, 350, 650, 630, 450, 480, 650, 500, 530, 550,]
        }
    ]
}

// social accounts feeds
export const feeds = {
    facebook: {
        friendsCount: '89k',
        feedsCount: '1220'
    },
    twitter: {
        friendsCount: '89k',
        feedsCount: '459'
    },
    linkedIn: {
        friendsCount: '89k',
        feedsCount: '850'
    },
    google: {
        friendsCount: '89k',
        feedsCount: '1520'
    }
}

// traffic Status
export const trafficStatus = {
    chartLabels: ['0.00', '1.0', '2.0', '3.0', '4.0', '5.0', '6.0'],
    chartDatasets: [
        {
            label: 'Series A',
            backgroundColor: ChartConfig.color.primary,
            borderColor: ChartConfig.color.primary,
            borderWidth: 1,
            hoverBackgroundColor: ChartConfig.color.primary,
            hoverBorderColor: ChartConfig.color.primary,
            data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
            label: 'Series B',
            backgroundColor: ChartConfig.color.warning,
            borderColor: ChartConfig.color.warning,
            borderWidth: 1,
            hoverBackgroundColor: ChartConfig.color.warning,
            hoverBorderColor: ChartConfig.color.warning,
            data: [45, 39, 40, 60, 35, 25, 60]
        }
    ],
    onlineSources: '3500',
    today: '17,020',
    lastMonth: '20.30%'
}

// total sales
export const totalSales = {
    label: 'Sales',
    chartdata: [250, 310, 150, 420, 250, 450],
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June'],
}

// net profit
export const netProfit = {
    label: 'Net Profit',
    chartdata: [250, 310, 150, 420, 250, 450],
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June'],
}

// tax stats
export const taxStats = {
    label: 'Tax',
    chartdata: [250, 310, 150, 420, 250, 450],
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June'],
}

// expenses stats
export const expenses = {
    label: 'Expenses',
    chartdata: [250, 310, 150, 420, 250, 450],
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June'],
}
