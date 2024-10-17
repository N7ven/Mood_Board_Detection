import React from 'react'
import styles from './cameras.module.scss'
import CameraList from './cameraList'

const StoreCameras = () => {
  return (
    <div className={styles.cameraContainer}>
        <div className={styles.cameraLists}>
            <CameraList />
        </div>
    </div>
  )
}

export default StoreCameras