/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import Images from 'assets/Images';
import GaugeChart from 'react-gauge-chart';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import PROFILE from 'assets/images/removable/profile.png';
import AGE from 'assets/images/removable/age.png';
import styles from './dashboard.module.scss';

const columns = [
  {
    field: 'emotions',
    headerName: 'Emotions',
    width: 80,
    renderCell: (params) => {
      return (
        <img src={params.row.emotions} alt="Emoji" width="26" />
      );
    }
  },
  {
    field: 'date',
    headerName: 'Date & Time',
    width: 120,
    renderCel: (param) => {
      return (
        <div>
          <h5>{param.row.date}</h5>
          <p>{param.row.time}</p>
        </div>
      );
    }
  },
  {
    field: 'segment',
    headerName: 'Segment',
    width: 100
  }
];

const rows = [
  {
    id: 1, emotions: Images.HAPPY_ACTIVE, date: '28 / 05 / 2024', time: '10:30 AM - 11:00 AM', segment: 'Star'
  },
  {
    id: 2, emotions: Images.SURPRISED_ACTIVE, date: '28 / 05 / 2024', time: '11:00 AM - 12:00 PM', segment: 'Loyal'
  },
  {
    id: 3, emotions: Images.CONFUSED_ACTIVE, date: '28 / 05 / 2024', time: '12:00 PM - 01:00 PM', segment: 'Bounce'
  },
  {
    id: 4, emotions: Images.DISGUSTED_ACTIVE, date: '28 / 05 / 2024', time: '01:00 PM - 02:00 PM', segment: 'On Brink'
  },
  {
    id: 5, emotions: Images.CONTEMPT_ACTIVE, date: '28 / 05 / 2024', time: '02:00 PM - 03:00 PM', segment: 'Dormant'
  },
  {
    id: 6, emotions: Images.HAPPY_ACTIVE, date: '28 / 05 / 2024', time: '03:00 PM - 04:00 PM', segment: 'Revived'
  }
];

const History = () => {
  return (
    <div className={`${styles.history} customeGrid noPagination`}>
      <div className={styles.history_grid}>
        <header>
          <h4>History</h4>
          <p>Happy</p>
        </header>
        <section>
          <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
            />
          </Box>
        </section>
      </div>
      <div className={styles.history_data}>
        <div className={styles.gaugeChartCont}>
          <div className={styles.resizeChart}>
            <section className={`${styles.chart_container} ${styles.chart_tiny}`}>
              <h3 className={styles.mood}>HAPPY</h3>

              <GaugeChart
                id="gauge-chart2"
                className={styles.chart}
                nrOfLevels={5}
                colors={[ '#FF5656', '#FF8888', '#F1D614', '#84BD32', '#058C1A' ]}
                arcWidth={0.1}
                percent={0.92}
                cornerRadius={3}
                arcPadding={0.02}
              />
              <svg width="314" height="157" viewBox="0 0 314 157" fill="none" className={styles.gradient}>
                <g clipPath="url(#clip0_245_532)">
                  <path d="M313.331 157.303C313.331 116.076 296.867 76.5371 267.56 47.3851C238.253 18.2332 198.504 1.85578 157.058 1.85577C115.612 1.85577 75.8632 18.2332 46.5563 47.3851C17.2494 76.5371 0.784918 116.076 0.784912 157.303L157.058 157.303H313.331Z" fill="url(#paint0_linear_245_532)" />
                </g>

                <linearGradient id="paint0_linear_245_532" x1="157.058" y1="1.85577" x2="157.058" y2="224" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#30AD43" />
                  <stop offset="0.785" stopColor="white" stopOpacity="0" />
                </linearGradient>

              </svg>
              <svg viewBox="-14 -16 500 400" className={styles.chart_label}>
                <path id="curve" fill="transparent" d="M1 239.5C1 239.5 3.00006 13 241.25 0.499985C479.5 13 480 239.5 480 239.5" />
                <text width="500" fontSize="14px">
                  <textPath xlinkHref="#curve">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    CONTEMPT
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    DISGUEST
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    CONFUSED
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    SURPRISED
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    HAPPY
                  </textPath>
                </text>
              </svg>
            </section>
          </div>
        </div>
        <div className={styles.reports}>
          <ul>
            <li className={styles.happy}>
              <p>Happy</p>
              <h3>
                232
                <span>55 %</span>
              </h3>
              <img src={Images.HAPPY_ACTIVE} alt="Happy" width="26" />
            </li>
            <li className={styles.surprised}>
              <p>Surprised</p>
              <h3>
                120
                <span>22 %</span>
              </h3>
              <img src={Images.SURPRISED_ACTIVE} alt="Surprised" width="26" />
            </li>
            <li className={styles.confused}>
              <p>Confused</p>
              <h3>
                54
                <span>12 %</span>
              </h3>
              <img src={Images.CONFUSED_ACTIVE} alt="Confused" width="26" />
            </li>
            <li className={styles.disgusted}>
              <p>Disgusted</p>
              <h3>
                24
                <span>7 %</span>
              </h3>
              <img src={Images.DISGUSTED_ACTIVE} alt="Disgusted" width="26" />
            </li>
            <li className={styles.contempt}>
              <p>Contempt</p>
              <h3>
                43
                <span>10 %</span>
              </h3>
              <img src={Images.CONTEMPT_ACTIVE} alt="Contempt" width="26" />
            </li>
          </ul>
          <div className={styles.userData}>
            <div className={styles.txtData}>
              <p>Accompanied with number of 2 people  </p>
              <h5>Comments</h5>
              <p>
                He is a valuable customer and he spent 10k every month in
                our shop
              </p>
            </div>
            <div className={styles.profile}>
              <img src={PROFILE} alt="Profile" />
              <img src={AGE} alt="age" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default History;
