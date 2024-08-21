import React from 'react';
import { TextField } from '@mui/material';
import { NumericFormat } from 'react-number-format';
import PropTypes from 'prop-types';
import styles from './currency-input-box.module.scss';

const NumericFormatCustom = React.forwardRef((
  props,
  ref
) => {
  const { onChange, textAlign, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value
          }
        });
      }}
      thousandsGroupStyle="lakh"
      thousandSeparator=","
      valueIsNumericString
      prefix={(textAlign === 'left') ? '₹' : ''}
      suffix={(textAlign === 'left') ? '' : '₹'}
      decimalScale={2}
      fixedDecimalScale
    />
  );
});

NumericFormatCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

const CurrencyInputBox = ({
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
  textAlign = 'right'
}) => {
  return (
    <>
      <TextField
        error={error}
        errortxt={Boolean(error)}
        label={label}
        variant={variant}
        value={value}
        name={name}
        data-testid={testid}
        onChange={onChange}
        type={type}
        validator={validator}
        pattern={pattern}
        disabled={disabled}
        className={`${styles.TextField} TextField`}
        InputProps={{
          inputComponent: NumericFormatCustom,
          inputProps: {
            style: { textAlign },
            textAlign
          }
        }}
      />
      {
        error && <p className={styles.error}>{error}</p>
      }
    </>
  );
};

CurrencyInputBox.propTypes = {
  variant: PropTypes.string,
  error: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  label: PropTypes.string.isRequired
};

CurrencyInputBox.defaultProps = {
  variant: 'outlined',
  error: false,
  disabled: false,
  onChange: () => {}
};

export default CurrencyInputBox;
