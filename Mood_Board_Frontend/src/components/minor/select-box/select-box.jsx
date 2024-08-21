import React from 'react';
import {
  FormControl, InputLabel, MenuItem, Select
} from '@mui/material';
import PropTypes from 'prop-types';
import styles from './select-box.module.scss';

export function SelectBox(props) {
  const {
    data,
    variant,
    error,
    label,
    value,
    name,
    onChange,
    onFocus,
    type,
    disabled,
    onKeyUp,
    height,
    keyId = 'id',
    keyName = 'name',
    float = true
  } = props;

  return (
    <FormControl fullWidth className={`${styles.SelectField} SelectField`}>
      <InputLabel id="select-label" disabled={disabled}>{label}</InputLabel>
      <Select
        labelId="select-label"
        error={Boolean(error)}
        placeholder={float ? '' : label}
        label={float ? label : ''}
        variant={variant}
        value={value}
        name={name}
        onChange={onChange}
        onFocus={onFocus}
        type={type}
        disabled={disabled}
        onKeyUp={onKeyUp}
        sx={{ height }}
      >
        {
          data?.map((val) => {
            return (
              <MenuItem
                value={val}
                key={val[keyId]}
              >
                {val[keyName]}
              </MenuItem>
            );
          })
        }
      </Select>
      {
        error && <p className={styles.error}>{error}</p>
      }
    </FormControl>
  );
}

SelectBox.propTypes = {
  variant: PropTypes.string,
  error: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  label: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string
  }))
};

SelectBox.defaultProps = {
  variant: 'outlined',
  error: false,
  disabled: false,
  onChange: () => {},
  data: []
};

export default SelectBox;
