import React from 'react';
import Images from 'assets/Images';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Box } from '@mui/material';
import { Dropdown, Menu, MenuButton } from '@mui/base';
import styles from './header.module.scss';

function AppHeader() {
  const [ store, setStore ] = React.useState(10);

  const handleChange = (event) => {
    setStore(event.target.value);
  };
  return (
    <div className={styles.appHeaderWrapper}>
      <section className={styles.appTitle}>
        <h4>Mood Board</h4>
        <p>10 / 04 / 2024</p>
      </section>
      <section className="selectStore">
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <Select
              value={store}
              label="Store"
              onChange={handleChange}
            >
              <MenuItem value={10}>Jayam Super Market</MenuItem>
              <MenuItem value={20}>Jayam Jewellary</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </section>
      <section className={styles.profile}>
        <div className={styles.profileName}>
          <h6>Ashok Kumar</h6>
          <p>Store Manager</p>
        </div>
        <div className={styles.profileImage}>

          <Dropdown>
            <MenuButton><img src={Images.PROFILE} alt="Profile" width={24} /></MenuButton>
            <Menu className={styles.menu}>
              <MenuItem>
                <a>
                  <img src={Images.TWOFACTOR} alt="Two Factor" width="22" />
                  {' '}
                  Two factor authentication
                </a>
              </MenuItem>
              <MenuItem>
                <a>
                  <img src={Images.LOGOUT} alt="Logout" width="22" />
                  {' '}
                  Logout
                </a>
              </MenuItem>
            </Menu>
          </Dropdown>
        </div>
      </section>
    </div>
  );
}

export default AppHeader;
