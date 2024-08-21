import React from 'react';
import DateRangePickerComp from 'components/minor/react-date-range/react-date-range';
import GIF001 from 'assets/images/gif/gif001.gif';
import GIF002 from 'assets/images/gif/gif002.gif';
import GIF003 from 'assets/images/gif/gif003.gif';
import styles from './playback.module.scss';

const PlayBack = () => {
  return (
    <div className={styles.playback}>
      <div className={styles.header}>
        <h4>Playback</h4>
        <DateRangePickerComp />
      </div>
      <div className={styles.gridCont}>
        <div className={styles.grid}>
          <img src={GIF001} alt="Gif" />
        </div>
        <div className={styles.grid}>
          <img src={GIF002} alt="Gif" />
        </div>
        <div className={styles.grid}>
          <img src={GIF003} alt="Gif" />
        </div>
        <div className={styles.grid}>
          <img src={GIF002} alt="Gif" />
        </div>
        <div className={styles.grid}>
          <img src={GIF003} alt="Gif" />
        </div>
        <div className={styles.grid}>
          <img src={GIF001} alt="Gif" />
        </div>
      </div>
    </div>
  );
};

export default PlayBack;
