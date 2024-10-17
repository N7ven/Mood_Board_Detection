import React from 'react';
import styles from './settings.module.scss';
import Images from 'assets/Images';
import { Outlet, useNavigate } from 'react-router';
import { NavLink } from 'react-router-dom';

const Settings = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.settingsCont}>
      <div className={styles.leftMenu}>
        <h4>Settings</h4>
        <ul>
          <li>
            <NavLink to="/settings/users">
              <span><img src={Images.USERS} alt="Users" width="24" /></span>Manage Users
            </NavLink>
          </li>
          <li>
            <NavLink to="/settings/resetpasswords">
              <span><img src={Images.PASSWORD} alt="Users" width="16" /></span>Reset Passwords
            </NavLink>
          </li>
          <li>
            <NavLink to="/settings/timing">
              <span><img src={Images.CLOCK} alt="Users" width="22" /></span>Store Timing
            </NavLink>
          </li>
          <li>
            <NavLink to="/settings/notifications">
              <span><img src={Images.NOTIFICATIONS} alt="Users" width="22" /></span>Notifications to SMS / Email
            </NavLink>
          </li>
          <li>
            <NavLink to="/settings/cameras">
              <span><img src={Images.CAMERA} alt="Users" width="20" /></span>Cameras
            </NavLink>
          </li>
        </ul>
      </div>
      <div className={styles.settingsContentContainer}>
        <Outlet />
      </div>
    </div>
  );
};

export default Settings;
