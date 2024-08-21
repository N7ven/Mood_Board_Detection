import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { CircularProgress, Pagination, Paper } from '@mui/material';
import styles from './select-search.module.scss';

const SelectSearch = ({
  data,
  label,
  placeholder,
  onInputChange,
  onChange,
  onFocus,
  error,
  keyName = 'name',
  keyId = 'id',
  onPageChange,
  total = 0,
  disabled,
  value
}) => {
  const [ open, setOpen ] = useState(false);
  const [ totalPage, setTotalPage ] = useState(0);
  const [ page, setPage ] = useState(1);
  const [ inputValue, setInputValue ] = useState('a');
  const loading = open && data.length === 0;
  const itemPerPage = 5;

  useEffect(() => {
    const remain = total % itemPerPage;
    const pages = Math.floor((total / itemPerPage)) + ((remain > 0) ? 1 : 0);
    setTotalPage(pages);
  }, [total]);

  const onHandlePage = (p) => {
    onPageChange(inputValue, (p * itemPerPage - itemPerPage));
    setPage(p);
  };

  const onHandleInputChange = (e) => {
    if (!e) return;
    onInputChange(e.target.value);
    setInputValue(e.target.value);
    setPage(1);
  };

  return (
    <>
      <Autocomplete
        disabled={disabled}
        disablePortal
        id="combo-box-demo"
        noOptionsText="No Records Found..."
        open={open}
        value={value || null}
        options={data || []}
        onOpen={() => { setOpen(true); }}
        onClose={() => { setOpen(false); }}
        getOptionLabel={(option) => (option[keyName] ? option[keyName] : '')}
        isOptionEqualToValue={(option, val) => option[keyId] === val[keyId]}
        onInputChange={(e) => { if (onInputChange) { onHandleInputChange(e); } }}
        onChange={onChange}
        onFocus={onFocus}
        sx={{ width: 300 }}
        className="TextField"
        PaperComponent={(props) => (
          <div
            onMouseDown={(e) => e.preventDefault()}
            role="button"
            tabIndex="0"
          >
            <Paper elevation={4} {...props}>
              {props.children}
              { totalPage > 0 && (
                <div className={styles.paginationWrapper}>
                  <Pagination
                    count={totalPage}
                    page={page}
                    variant="outlined"
                    shape="rounded"
                    size="small"
                    color="primary"
                    onChange={(e, p) => onHandlePage(p)}
                  />
                </div>
              )}
            </Paper>
          </div>
        )}
        renderInput={(params) => (
          <TextField
            error={Boolean(error)}
            {...params}
            label={label}
            placeholder={placeholder}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </>
              )
            }}
          />
        )}
      />
      {
        error && <p className={styles.error}>{error}</p>
      }
    </>
  );
};

export default SelectSearch;
