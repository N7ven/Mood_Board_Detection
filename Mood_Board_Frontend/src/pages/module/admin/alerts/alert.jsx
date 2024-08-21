import React from 'react';
import Images from 'assets/Images';
import GIF001 from 'assets/images/gif/gif001.gif';
import GIF002 from 'assets/images/gif/gif002.gif';
import GIF003 from 'assets/images/gif/gif003.gif';
import GIF004 from 'assets/images/gif/gif005.gif';
import styles from './alert.module.scss';

const AlertHome = () => {
  return (
    <div className={styles.alertCont}>
      <h2>Alert( Possible Shoplifting )</h2>
      <div className={styles.gridContainer}>
        <div className={styles.gridCol}>
          <div className={`${styles.grid} ${styles.active}`}>
            <img src={GIF004} alt="Gif" />
            <span>C001</span>
          </div>
        </div>
        <div className={styles.gridCol}>
          <div className={styles.grid}>
            <img src={GIF002} alt="Gif" />
            <span>C005</span>
          </div>
        </div>
        <div className={styles.gridCol}>
          <div className={styles.grid}>
            <img src={GIF003} alt="Gif" />
            <span>C008</span>
          </div>
        </div>
        <div className={styles.gridCol}>
          <div className={styles.grid}>
            <img src={GIF001} alt="Gif" />
            <span>C009</span>
          </div>
        </div>
      </div>

      <div className={styles.customer}>
        <h5>P001</h5>
        <div className={styles.customerContBox}>
          <span><img src={Images.ALERT} alt="Alert" width="26" /></span>
          <img src={Images.PROFILE_IMAGE} alt="profile" />
        </div>
      </div>
    </div>
  );
};

export default AlertHome;
