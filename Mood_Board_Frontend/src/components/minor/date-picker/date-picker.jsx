import React from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import styles from './date-picker.module.scss';

export function Datepicker(props) {
  const {
    value,
    error,
    variant,
    label,
    onChange,
    disabled,
    disablePast,
    minDate
  } = props;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className={`${styles.DatePicker} DatePicker`}>
        <DatePicker
          inputFormat="dd/MM/yyyy"
          label={label}
          error={error}
          errortxt={Boolean(error)}
          value={value}
          variant={variant}
          onChange={onChange}
          disabled={disabled}
          disablePast={disablePast}
          minDate={minDate}
          renderInput={(params) => <TextField {...params} error={error} />}
        />
        {
          error && <p className={styles.error}>{error}</p>
        }
      </div>
    </LocalizationProvider>
  );
}

Datepicker.propTypes = {
  variant: PropTypes.string,
  error: PropTypes.bool,
  disabled: PropTypes.bool,
  disablePast: PropTypes.bool,
  errortxt: PropTypes.string,
  value: PropTypes.string,
  minDate: PropTypes.string,
  onChange: PropTypes.func,
  label: PropTypes.string.isRequired
};

Datepicker.defaultProps = {
  variant: 'outlined',
  error: false,
  errortxt: '',
  disabled: false,
  disablePast: false,
  value: '',
  minDate: '',
  onChange: () => {}
};

export default Datepicker;
