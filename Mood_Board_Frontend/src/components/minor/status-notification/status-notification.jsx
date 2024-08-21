import React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import _ from 'lodash';
import Modal from '@mui/material/Modal';
import ErrorIcon from '@mui/icons-material/Error';
import Loader from '../loader/loader';
import styles from './status-notification.module.scss';

export const ErrorAlerts = ({ errorDetails, handleDismiss }) => {
  return (
    <Modal open>
      <div className={styles.errorWrapper}>
        <header>
          <div className={styles.warnIcon}>
            <ErrorIcon />
            <h4>Error!</h4>
          </div>
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={handleDismiss}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        </header>
        <section>
          {
            errorDetails?.length > 0
              && errorDetails.map((error) => (<li>{error.description}</li>))
          }
        </section>
      </div>
    </Modal>
  );
};

export const SuccessAlerts = ({ errorDetails, handleDismiss }) => {
  return (
    <Modal open>
      <div className={styles.errorWrapper}>
        <header>
          <div className={styles.warnIcon}>
            <ErrorIcon />
            <h4>Error!</h4>
          </div>
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={handleDismiss}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        </header>
        <section>
          <Stack className={styles.alertWrapper} spacing={2}>
            <Alert icon={false} severity="error">
              {
                errorDetails?.length > 0
              && errorDetails.map((error) => (<li>{error.description}</li>))
              }
            </Alert>
          </Stack>
        </section>
      </div>
    </Modal>
  );
};

function StatusNotification({
  request,
  handleDismiss,
  loader,
  linearLoader,
  coverLoader
}) {
  const {
    isLoading,
    hasErrors,
    errorDetails,
    success
  } = request;
  if (hasErrors && errorDetails?.length > 0) {
    return (
      <ErrorAlerts
        errorDetails={errorDetails}
        handleDismiss={handleDismiss}
      />
    );
  }

  if (!hasErrors && _.isString(success)) {
    return (
      <SuccessAlerts
        success={success}
        handleDismiss={handleDismiss}
      />
    );
  }

  if (loader && isLoading) {
    return (
      <Loader />
    );
  }

  if ((linearLoader || coverLoader) && isLoading) {
    return (
      <Loader
        cover={coverLoader}
        linear={linearLoader}
      />
    );
  }

  return null;
}

export default StatusNotification;
