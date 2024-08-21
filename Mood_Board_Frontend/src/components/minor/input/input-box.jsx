import React from 'react';
import { TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { SIZE } from 'utils/variants-constants';
import styles from './input-box.module.scss';

export function InputBox(props) {
  const {
    variant,
    error,
    label,
    value,
    name,
    onChange,
    type,
    testid,
    validator,
    disabled,
    pattern,
    size = SIZE.SMALL,
    float = true
  } = props;

  return (
    <>
      <TextField
        id="outlined-size-small"
        error={Boolean(error)}
        errortxt={error}
        placeholder={float ? '' : label}
        label={float ? label : ''}
        variant={variant}
        value={value}
        name={name}
        data-testid={testid}
        onChange={onChange}
        type={type}
        validator={validator}
        pattern={pattern}
        disabled={disabled}
        className={`TextField ${styles.TextField} 
            ${styles[`input_${size}`]}`}
      />
      {
        error && <p className={styles.error}>{error}</p>
      }
    </>
  );
}

InputBox.propTypes = {
  variant: PropTypes.string,
  error: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  label: PropTypes.string.isRequired
};

InputBox.defaultProps = {
  variant: 'outlined',
  error: false,
  disabled: false,
  onChange: () => {}
};

export default InputBox;
