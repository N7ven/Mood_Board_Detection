import React from 'react';
import { FormControlLabel, FormGroup } from '@mui/material';
import Switch from '@mui/material/Switch';
import PropTypes from 'prop-types';

export function SwitchBox(props) {
  const {
    onClick,
    disabled,
    checked
  } = props;

  return (
    <FormGroup>
      <FormControlLabel
        control={<Switch defaultChecked />}
        onClick={onClick}
        disabled={disabled}
        checked={checked}
      />
    </FormGroup>
  );
}

SwitchBox.propTypes = {
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  checked: PropTypes.bool
};

SwitchBox.defaultProps = {
  onClick: () => {},
  disabled: false,
  checked: false
};

export default SwitchBox;
