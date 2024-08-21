import React from 'react';
import PropTypes from 'prop-types';
import styles from './icon-button.module.scss';

export function IconButton(props) {
  const {
    onClick,
    icon,
    size,
    datatestid,
    classname
  } = props;

  return (
    <button
      type="button"
      onClick={onClick}
      data-testid={datatestid}
      className={`${styles.iconBtn} ${classname}`}
      {...props}
    >
      <img src={icon} alt="icon" width={size} />
    </button>
  );
}

IconButton.propTypes = {
  onClick: PropTypes.func,
  icon: PropTypes.string,
  size: PropTypes.number
};

IconButton.defaultProps = {
  onClick: () => {},
  icon: '',
  size: 16
};

export default IconButton;
