import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import styles from './vertical-tabs.module.scss';

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`
  };
}

const VerticalTabs = ({
  children, tabs = [], handleChange, value
}) => {
  return (
    <Box
      className={styles.tabWrapper}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={styles.tabsContent}
      >
        {
          tabs.length > 0 && tabs.map((tab, i) => (
            <Tab
              className={styles.tabItem}
              key={`${tab + i}`}
              label={tab}
              {...a11yProps(0)}
            />
          ))
        }

      </Tabs>
      <div className={styles.childrenWrapper}>
        {
          children
        }
      </div>
    </Box>
  );
};

export default VerticalTabs;
