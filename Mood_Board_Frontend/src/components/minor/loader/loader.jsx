import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import styles from './loader.module.scss';

const Loader = ({ linear, cover }) => {
  if (linear) {
    return (
      <Box className={styles.linearProgress}>
        <LinearProgress />
      </Box>
    );
  }
  return (
    <div className={cover ? styles.cover : styles.normal}>
      <Box>
        <CircularProgress
          size={cover ? 100 : 50}
          sx={{
            color: '#1739B0'
          }}
        />
      </Box>
    </div>
  );
};

export default Loader;
