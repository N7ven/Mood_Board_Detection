import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import ReactApexChart from 'react-apexcharts';
import styles from './chart.module.scss';
import DateRangePickerComp from '../react-date-range/react-date-range';

const LineCharts = () => {
  const series = [{
    name: 'Happy',
    data: [ 10, 41, 35, 51, 49, 62, 69, 91, 67, 17, 56, 34, 98 ]
  },
  {
    name: 'Surprised',
    data: [ 30, 52, 16, 38, 62, 78, 83, 23, 56, 23, 67, 34, 87 ]
  },
  {
    name: 'Confused',
    data: [ 23, 72, 46, 76, 12, 32, 87, 28, 34, 67, 34, 56, 23 ]
  },
  {
    name: 'Disgusted',
    data: [ 15, 34, 86, 45, 25, 73, 45, 53, 52, 34, 67, 12, 87 ]
  },
  {
    name: 'Contempt',
    data: [ 27, 25, 87, 35, 76, 56, 24, 74, 76, 45, 87, 34, 67 ]
  }];
  const options = {
    chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight',
      width: [ 2, 2, 2, 2, 2 ]
    },
    title: {
      text: 'Emot Trend',
      align: 'left'
    },
    grid: {
      row: {
        colors: [ '#f3f3f3', 'transparent' ], // takes an array which will be repeated on columns
        opacity: 0
      }
    },
    xaxis: {
      categories: [ '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00  PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM' ]
    }
  };

  return (
    <div className={styles.chartContainer}>
      <div className={styles.filter}>
        <DateRangePickerComp />
      </div>
      <div id="chart">
        <ReactApexChart options={options} series={series} type="line" height={350} />
      </div>
    </div>
  );
};

export default LineCharts;
