import React from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';
import PropTypes from 'prop-types';

export function CheckBox(props) {
  const {
    onClick,
    value,
    defaultChecked,
    checked,
    label
  } = props;

  return (
    <FormControlLabel
      control={(
        <Checkbox
          sx={{
            color: '#E5E5E5',
            strokeWidth: ' 1px ',
            '&.Mui-checked': {
              color: '#1739B0'
            }
          }}
          value={value}
          checked={checked}
          defaultChecked={defaultChecked}
          defaultValue={defaultChecked}
          onClick={onClick}
          label={label}
        />
      )}
      label={label}
    />

  );
}

CheckBox.propTypes = {
  onClick: PropTypes.func,
  value: PropTypes.bool,
  defaultChecked: PropTypes.bool
};

CheckBox.defaultProps = {
  onClick: () => {},
  value: false,
  defaultChecked: false

};

export default CheckBox;
