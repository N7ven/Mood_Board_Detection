import React from 'react';
import { TextField } from '@mui/material';
import PropTypes from 'prop-types';
import styles from './text-area.module.scss';

export function TextArea(props) {
  const {
    variant,
    error,
    label,
    value,
    name,
    errortxt,
    onChange,
    type = 'textarea',
    rows,
    placeholder
  } = props;

  return (
    <>
      <TextField
        placeholder={placeholder}
        error={error}
        errortxt={errortxt}
        label={label}
        variant={variant}
        value={value}
        name={name}
        multiline
        rows={rows}
        onChange={onChange}
        type={type}
        className={`${styles.TextField} TextField`}
      />
      {
        errortxt && <p className={styles.error}>{errortxt}</p>
      }
    </>
  );
}
TextArea.propTypes = {
  variant: PropTypes.string,
  error: PropTypes.bool,
  errortxt: PropTypes.string,
  onChange: PropTypes.func,
  label: PropTypes.string.isRequired,
  rows: PropTypes.number
};

TextArea.defaultProps = {
  variant: 'outlined',
  error: false,
  errortxt: '',
  rows: 2,
  onChange: () => {}
};

export default TextArea;
