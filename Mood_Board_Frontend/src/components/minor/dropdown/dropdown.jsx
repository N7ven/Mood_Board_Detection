import React from 'react';
import {
  FormControl, InputLabel, MenuItem, Select
} from '@mui/material';
import PropTypes from 'prop-types';
import styles from './dropdown.module.scss';

export function Dropdown(props) {
  const {
    data,
    variant,
    error,
    label,
    value,
    name,
    onChange,
    type,
    disabled
  } = props;

  return (
    <FormControl fullWidth className={`${styles.SelectField} SelectField`}>
      <InputLabel id="select-label">{label}</InputLabel>
      <Select
        labelId="select-label"
        error={Boolean(error)}
        label={label}
        variant={variant}
        value={value}
        name={name}
        onChange={onChange}
        type={type}
        disabled={disabled}
      >
        {
          data?.map((val) => {
            return <MenuItem value={val} key={val}>{val}</MenuItem>;
          })
        }
      </Select>
      {
        error && <p className={styles.error}>{error}</p>
      }
    </FormControl>
  );
}

Dropdown.propTypes = {
  variant: PropTypes.string,
  error: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  label: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]))
};

Dropdown.defaultProps = {
  variant: 'outlined',
  error: false,
  disabled: false,
  onChange: () => {},
  data: []
};

export default Dropdown;
