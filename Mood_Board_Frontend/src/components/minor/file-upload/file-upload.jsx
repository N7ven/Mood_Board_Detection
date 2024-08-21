import { Button } from '@mui/material';
import React, { useState } from 'react';

import styles from './file-upload.module.scss';

const FileUpload = ({ handleChange }) => {
  return (
    <div className={styles.fileUploadCont}>
      <Button
        variant="contained"
        component="label"
      >
        Browse File
        <input
          type="file"
          hidden
          accept="image/png, image/jpeg, application/pdf"
          style={{ display: 'none' }}
          onChange={handleChange}
          multiple
        />
      </Button>
    </div>
  );
};

export default FileUpload;
