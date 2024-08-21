import * as React from 'react';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import PropTypes from 'prop-types';
import styles from './multiselectbox.module.scss';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

export default function MultiSelectBox(props) {
  const {
    label,
    onChange,
    data,
    value,
    error,
    height,
    keyId = 'id',
    keyName = 'name',
    disabled
  } = props;
  return (
    <div>
      <FormControl fullWidth className={`${styles.SelectField} SelectField`}>
        <InputLabel id="demo-multiple-chip-label" disabled={disabled}>{label}</InputLabel>
        <Select
          sx={{ maxHeight: height, height: 'auto' }}
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          disabled={disabled}
          error={Boolean(error)}
          value={value || []}
          onChange={onChange}
          input={<OutlinedInput id="select-multiple-chip" label={label} />}
          renderValue={(selected) => (
            <Box sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 0.5,
              alignItems: 'center'
            }}
            >
              {selected.map((selvalue) => (
                <Chip
                  key={selvalue[keyId]}
                  label={selvalue[keyName]}
                  sx={{ height: 15 }}
                />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {
            data?.map((item) => {
              return (
                <MenuItem
                  value={item}
                  key={item[keyId]}
                >
                  {item[keyName]}
                </MenuItem>
              );
            })
          }
        </Select>
        {
          error && <p className={styles.error}>{error}</p>
        }
      </FormControl>
    </div>
  );
}

MultiSelectBox.propTypes = {
  label: PropTypes.string.isRequired,
  error: PropTypes.bool,
  onChange: PropTypes.func,
  data: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]))
};

MultiSelectBox.defaultProps = {
  onChange: () => {},
  error: false,
  data: []
};
