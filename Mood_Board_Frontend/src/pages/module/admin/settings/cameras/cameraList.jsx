import React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import styles from './cameras.module.scss';
import AddCamera from './addCamera';
import { Dialog } from '@mui/material';

const columns = [
    { field: 'id', headerName: 'Camera Id', width: 90 },
    {
      field: 'cameraName',
      headerName: 'Camera name',
      flex:1
    },
    {
      field: 'rtspurl',
      headerName: 'RTSP Url',
      flex:1
    }
];
  
const rows = [
    { id: 'C00011', cameraName: 'CameraT1', rtspurl: '/rtsp0001'},
    { id: 'C00012', cameraName: 'CameraT2', rtspurl: '/rtsp0002'},
    { id: 'C00013', cameraName: 'CameraT3', rtspurl: '/rtsp0003'},
    { id: 'C00014', cameraName: 'CameraT4', rtspurl: '/rtsp0004'},
    { id: 'C00015', cameraName: 'CameraT5', rtspurl: '/rtsp0005'}
];

  
const CameraList = () => {
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
            <h4>Cameras</h4>
            <ul>
                <li><button onClick={handleClickOpenAddCamera}>Add Camera</button></li>
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
            <AddCamera />
        </Dialog>
    </div>
  )
}

export default CameraList