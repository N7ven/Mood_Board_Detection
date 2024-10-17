import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import styles from './chart.module.scss';
import DateRangePickerComp from '../react-date-range/react-date-range';

const LineCharts = ({ data }) => {
  const [chartSeries, setChartSeries] = useState([{
    name: 'Happy',
    data: [],
    dataIndex: 2
  },
  {
    name: 'Surprised',
    data: [],
    dataIndex: 3
  },
  {
    name: 'Confused',
    data: [],
    dataIndex: 4
  },
  {
    name: 'Disgusted',
    data: [],
    dataIndex: 5
  },
  {
    name: 'Contempt',
    data: [],
    dataIndex: 6
  }]);
  const [categories, setCategories] = useState([]);


  useEffect(() => {
    if (data?.length > 0) {
      const reverseData = data?.reverse();
      const cat = reverseData?.map((x) => x[1])
      setCategories(cat);
      const temp = chartSeries?.map((cat) => {
        const resData = reverseData.map(item => item[cat.dataIndex]);
        return ({
        ...cat,
        data: [...resData]
      })})
      setChartSeries(temp);
    }
  }, [data])

  const options = {
    chart: {
      id: 'realtime',
      height: 350,
      type: 'line',
      zoom: {
        enabled: false
      }
    },
    animations: {
      enabled: true,
      easing: 'linear',
      dynamicAnimation: {
        enabled: true,
        speed: 500
      },
      animateGradually: {
        enabled: true,
        delay: 150
    },
    },
    dataLabels: {
      style: {
        fontSize: '8px',
        fontWeight: 'bold',
      },
      background: {
        enabled: true,
        foreColor: '#fff',
        borderRadius: 2,
        padding: 4,
        opacity: 0.9,
        borderWidth: 1,
        borderColor: '#fff'
      },
    },
    stroke: {
      show: true,
      curve: 'smooth',
      width: 2,
    },
    title: {
      text: 'Mood Board',
      align: 'left'
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0
      }
    },
    xaxis: {
      categories,
    },
    legend: {
      show: false
    },
  };

  return (
    <div className={styles.chartContainer}>
      <div className={styles.filter}>
        <DateRangePickerComp />
      </div>
      <div className={styles.chartwrapper}>
      <div id="chart" className={styles.chart}>
        <ReactApexChart options={options} series={chartSeries} type="line" height={350} />
      </div>
      </div>
    </div>
  );
};

export default LineCharts;
