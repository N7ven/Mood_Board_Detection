import React from 'react';
import PropTypes from 'prop-types';
import { SIZE, TYPE, VARIANT } from 'utils/variants-constants';
import styles from './button.module.scss';

const Button = ({
  onClick,
  label,
  datatestid,
  size,
  type,
  variant,
  disabled
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      data-testid={datatestid}
      className={`
      ${styles.btn} 
      ${styles[`btn_${size}`]} 
      ${styles[`btn_${type}`]} 
      ${styles[`btn_${variant}`]}`}
      disabled={disabled}
      style={{ opacity: disabled ? '0.5' : '1' }}
    >
      {
        label && <p>{label}</p>
      }
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  label: PropTypes.string,
  datatestid: PropTypes.string,
  size: PropTypes.string,
  type: PropTypes.string,
  variant: PropTypes.string
};

Button.defaultProps = {
  onClick: () => {},
  label: 'Button',
  datatestid: '1',
  size: SIZE.NORMAL,
  type: TYPE.DARK,
  variant: VARIANT.SOLID
};

export default Button;
