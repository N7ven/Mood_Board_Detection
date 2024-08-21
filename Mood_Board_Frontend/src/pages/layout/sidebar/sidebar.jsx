import React from 'react';
import Images from 'assets/Images';
import { NavLink } from 'react-router-dom';
import styles from './sidebar.module.scss';

function SideNavbar() {
  return (
    <div className={styles.sidenavbar}>
      <div className={styles.logo}>
        <img src={Images.LOGO} alt="Logo" width="30" />
      </div>
      <nav className={`${styles.nav} sideNavBar`}>
        <ul>
          <li>
            <NavLink to="/dashboard">
              <img src={Images.DASHBOARD} alt="Dashboard" width="24" />
              <p>DASHBOARD</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="/alert">
              <img src={Images.ALERT} alt="alert" width="24" />
              <p>ALERTS</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="/specialday">
              <img src={Images.SPECIALDAY} alt="specialday" width="24" />
              <p>SPECIAL DAY</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="/playback">
              <img src={Images.PLAYBACK} alt="playback" width="24" />
              <p>PLAYBACK</p>
            </NavLink>
          </li>
          {/* <li>
            <NavLink to="/settings">
              <img src={Images.SETTINGS} alt="Settings" width="24" />
              <p>SETTINGS</p>
            </NavLink>
          </li> */}
        </ul>
      </nav>
    </div>
  );
}

export default SideNavbar;
