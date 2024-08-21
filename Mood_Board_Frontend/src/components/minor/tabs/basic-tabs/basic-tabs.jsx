import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import styles from './basic-tabs.module.scss';

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
};

export default function BasicTabs({
  children, tabs = [], handleChange, value
}) {
  return (
    <Box className={styles.tabWrapper}>
      <Box className={styles.tabInnerWrapper}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          variant="scrollable"
          scrollButtons
        >
          {
            tabs.length > 0 && tabs.map((val, i) => (
              <Tab
                className={styles.tabItem}
                label={val}
                {...a11yProps(i)}
              />
            ))
          }
        </Tabs>
      </Box>
      <div className={styles.tabContent}>
        {
          children
        }
      </div>
    </Box>
  );
}
