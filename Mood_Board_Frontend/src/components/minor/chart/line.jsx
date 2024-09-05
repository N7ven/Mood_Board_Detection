import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import ReactApexChart from 'react-apexcharts';
import styles from './chart.module.scss';
import DateRangePickerComp from '../react-date-range/react-date-range';

const LineCharts = ({data}) => {
  console.log("chart_value",data)
  const series = [{
    name: 'Happy',
    data: []
  },
  {
    name: 'Surprised',
    data: []
  },
  {
    name: 'Confused',
    data: []
  },
  {
    name: 'Disgusted',
    data: []
  },
  {
    name: 'Contempt',
    data: []
  }];


  const xaxis_time=[]

  for (let i = 1; i < data.length; i++) { 
    xaxis_time.push(data[i][1])
    series[0].data.push(data[i][2])
    series[1].data.push(data[i][3])
    series[2].data.push(data[i][4])
    series[3].data.push(data[i][5])
    series[4].data.push(data[i][6])
  } 

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
      categories:xaxis_time
    }
  };

  return (
    <div className={styles.chartContainer}>
      <div className={styles.filter}>
        <DateRangePickerComp />
      </div>
      <div className={styles.chartwrapper}>
      <div id="chart" className={styles.chart}>
        <ReactApexChart options={options} series={series} type="line" height={350} />
      </div>
      </div>
    </div>
  );
};

export default LineCharts;
