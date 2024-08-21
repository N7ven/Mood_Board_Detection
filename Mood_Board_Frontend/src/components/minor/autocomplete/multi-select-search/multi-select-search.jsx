import React, { useState, useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CircularProgress from '@mui/material/CircularProgress';
import { Pagination, Paper } from '@mui/material';
import styles from './multi-select-search.module.scss';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function MultiSelectSearch({
  data,
  label,
  placeholder = 'Search',
  onInputChange,
  onChange,
  onFocus,
  value,
  error,
  keyName = 'name',
  onPageChange,
  total = 0,
  disabled
}) {
  const [ open, setOpen ] = useState(false);
  const [ totalPage, setTotalPage ] = useState(0);
  const [ page, setPage ] = useState(1);
  const [ inputValue, setInputValue ] = useState(null);
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
    setInputValue(e?.target.value);
    onInputChange(e?.target.value);
    setPage(1);
  };

  return (
    <>
      <Autocomplete
        value={value || []}
        sx={{ width: 100 }}
        multiple
        disabled={disabled}
        id="checkboxes-tags-demo"
        open={open}
        onOpen={() => { setOpen(true); }}
        onClose={() => { setOpen(false); }}
        options={data || []}
        disableCloseOnSelect
        onInputChange={(e) => { if (onInputChange) { onHandleInputChange(e); } }}
        onChange={onChange}
        onFocus={onFocus}
        getOptionLabel={(option) => option[keyName]}
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
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option[keyName]}
          </li>
        )}
        style={{ width: 'auto' }}
        renderInput={(params) => (
          <TextField
            error={Boolean(error)}
            {...params}
            label={label}
            value={inputValue}
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
}

