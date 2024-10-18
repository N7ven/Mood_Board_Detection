import React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import styles from './manageusers.module.scss';
// import AddCamera from './addCamera';
import { Dialog } from '@mui/material';

const columns = [
    // { field: 'id', headerName: 'Camera Id', width: 90 },
    {
      field: 'name',
      headerName: 'Name',
      flex:1
    },
    {
      field: 'email',
      headerName: 'Email',
      flex:1
    },
    {
      field: 'status',
      headerName: 'Status',
      flex:1
    }
];
  
const rows = [
    { id: 'C00011', name: 'Darlene Robertson', email: 'trungkienspktnd@gamail.com', status: 'Active'},
    { id: 'C00012', name: 'Devon Lane', email: 'tranthuy.nute@gmail.com', status: 'Active'},
    { id: 'C00013', name: 'Cody Fisher', email: 'tienlapspktnd@gmail.com', status: 'Active'},
    { id: 'C00014', name: 'Theresa Webb', email: 'thuhang.nute@gmail.com', status: 'Active'},
    { id: 'C00015', name: 'Savannah Nguyen', email: 'manhhachkt08@gmail.com', status: 'Active'}
];

  
const ManageUsers = () => {
  const [openAddCamera, setOpenAddCamera] = React.useState(false);

  const handleClickOpenAddCamera = () => {
    setOpenAddCamera(true);
  };

  const handleCloseAddCamera = () => {
    setOpenAddCamera(false);
  };
  return (
    <div className={styles.cameraListCont}>
        <header>
            <h4 style={{marginBottom: '10px'}}>Manage Users</h4>
            <ul>
                {/* <li><button onClick={handleClickOpenAddCamera}>Add Users</button></li> */}
            </ul>
        </header>
        
         <Box sx={{ height: 320, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                        pageSize: 5,
                        },
                    },
                }}
                disableRowSelectionOnClick
            />
        </Box>

        <Dialog open={openAddCamera} onClose={handleCloseAddCamera}>
            {/* <AddCamera /> */}
        </Dialog>
    </div>
  )
}

export default ManageUsers