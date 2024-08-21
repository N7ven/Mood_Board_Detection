import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import DateRangePickerComp from 'components/minor/react-date-range/react-date-range';
import Images from 'assets/Images';
import styles from './specialday.module.scss';

const columns = [
  {
    field: 'profile',
    width: '50',
    headerName: '',
    renderCell: () => (
      <div className={styles.profileImg}>
        <img src={Images.PROFILE} alt="user" width="26" />
      </div>
    )
  },
  { field: 'id', headerName: ' Customer ID', width: 150 },
  {
    field: 'customername',
    headerName: 'Customer Name',
    width: '180'
  },
  {
    field: 'customertype',
    headerName: 'Customer Type',
    width: '160'
  },
  {
    field: 'segment',
    headerName: 'Segment',
    width: '160'
  },
  {
    field: 'mode',
    headerName: 'Customer Mode',
    width: '160'
  },
  {
    field: 'dob',
    headerName: 'Date Of Birth',
    width: '160'
  },
  {
    field: 'gift',
    headerName: 'Gift Presented',
    width: '160'
  },
  {
    field: 'button',
    width: '130',
    headerName: '',
    renderCell: () => (
      <button type="button" className={styles.btnactive}>
        Present
      </button>
    )
  }
];

const rows = [
  {
    id: 'CUST001', customername: 'Mukesh Kumar', customertype: 'N', segment: 'Star', mode: 'Happy', dob: '10 / 06 / 1992', gift: 'Presented'
  },
  {
    id: 'CUST002', customername: 'Sunil Kumar', customertype: 'E', segment: 'Loyal', mode: 'Surprised', dob: '10 / 06 / 1995', gift: 'Presented'
  },
  {
    id: 'CUST003', customername: 'Rahul', customertype: 'EN', segment: 'Bounce', mode: 'Confused', dob: '10 / 06 / 1990', gift: 'Presented'
  },
  {
    id: 'CUST004', customername: 'Pritish Kanth', customertype: 'N', segment: 'On Brink', mode: 'Happy ', dob: '10 / 06 / 1984', gift: 'Not'
  },
  {
    id: 'CUST005', customername: 'Ajay Malhoutra', customertype: 'E', segment: 'Dormant', mode: 'Confused', dob: '10 / 06 / 2012', gift: 'Not'
  },
  {
    id: 'CUST006', customername: 'Jack Dhasan', customertype: 'EN', segment: 'Revived', mode: 'Surprised', dob: '10 / 06 / 2005', gift: 'Not'
  }
];
const SpecialDay = () => {
  return (
    <div className={`${styles.specialday} customeGrid`}>
      <div className={styles.header}>
        <h4>Special Day</h4>
        <DateRangePickerComp />
      </div>
      <Box sx={{ height: 400 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5
              }
            }
          }}
          pageSizeOptions={[5]}
        />
      </Box>
    </div>
  );
};

export default SpecialDay;
