/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import Images from 'assets/Images';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import styles from './dashboard.module.scss';

const columns = [
  {
    field: 'profile',
    width: '50',
    headerName: '',
    renderCell: () => (
      <div className={styles.profileImg}>
        <img src={Images.SHOPPING_BAG} alt="user" width="20" />
      </div>
    )
  },
  { field: 'id', headerName: ' Product ID', flex: 1 },
  {
    field: 'productname',
    headerName: 'Product Name',
    flex: 1
  },
  {
    field: 'quantity',
    headerName: 'Quantity',
    flex: 1
  },
  {
    field: 'price',
    headerName: 'Price',
    flex: 1,
    type: 'number'
  },
  {
    field: 'agent',
    headerName: 'Agent',
    flex: 1
  }
];

const rows = [
  {
    id: 'PROD0028', productname: 'Basmathi Rice', quantity: '8 Kilogram', price: '₹ 960.00', agent: 'Mukesh Kumar'
  },
  {
    id: 'PROD0034', productname: 'Gold winner Oil', quantity: '4 Litre', price: '₹ 520.00', agent: 'Mukesh Kumar'
  },
  {
    id: 'PROD0032', productname: 'Dove Soap 110g', quantity: '6 Piece', price: '₹ 380.00', agent: 'Mukesh Kumar'
  },
  {
    id: 'PROD0067', productname: 'Himalaya Kit ', quantity: '2 Pack', price: '₹ 2,400.00', agent: 'Mukesh Kumar '
  },
  {
    id: 'PROD0054', productname: 'Coffee Powder ', quantity: '1 Litre', price: '₹ 200.00', agent: 'Mukesh Kumar'
  }
];
const Purchases = () => {
  return (
    <div className={`${styles.purchases} customeGrid`}>
      <h4>Purchase Order</h4>
      <Box sx={{ height: 400 }}>
        <DataGrid
          rows={rows}
          columns={columns}
        />
      </Box>
    </div>
  );
};

export default Purchases;
