import React from 'react';
import {
  FormControl, FormControlLabel, Radio, RadioGroup
} from '@mui/material';

export function RadioButton({
  data,
  value,
  onChange,
  disabled
}) {
  return (
    <FormControl>
      <RadioGroup
        value={value}
        onChange={onChange}
      >
        {data?.length && data.map((val) => (
          <FormControlLabel
            value={val}
            disabled={disabled}
            control={(
              <Radio />
            )}
            label={val}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}

export default RadioButton;
