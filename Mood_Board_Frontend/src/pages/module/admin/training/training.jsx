import React, { useEffect, useState } from 'react'
import Webcam from "react-webcam";
import styles from './training.module.scss'

const Training = () => {
    const [showForm, setShowForm] = useState(false);
    const webcamRef = React.useRef(null);
    const openDetectedForm = () => {
        setShowForm(true)
    }


    
  useEffect(() => {
    setInterval(() => {
      let imageSrc = webcamRef.current?.getScreenshot();
      if (imageSrc) {
        imageSrc = imageSrc?.replace(/^data:image\/[a-z]+;base64,/, "");
        // console.log("ImageStr",imageSrc)
        // fetch('http://127.0.0.1:5000/receive_image', {
        fetch('https://okotech.ai/api/receive_image', {
          method: 'POST',
          body: JSON.stringify({
            // Add parameters here
            image64: imageSrc
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          }
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            // Handle Fetch data
          })
          .catch((err) => {
            console.log(err.message);
          });
      }
    }, 2000);
  }, [])

  return (
    <div className={styles.tranWrapper}>
        <h5>Face Detection</h5>
        <div className={styles.trainingCont}>
            <div className={styles.webCamCont}>
                <div className={styles.camWrap}>
                {<Webcam
                width='100%'
                height='100%'
                screenshotFormat="image/jpeg"
                aspectRatio={10}
              />}
                </div>
                <button onClick={openDetectedForm}>Detect My Face</button>
            </div>
            {showForm &&
                <div className={styles.detectedForm}>
                    <div className={styles.detectedFaceImage}>
                        
                    </div>
                    <ul>
                            <li>
                                <label>Age</label>
                                <h6>32 Years</h6>
                            </li>
                            <li>
                                <label>Gender</label>
                                <h6>Male</h6>
                            </li>
                            <li>
                                <label>Emotion</label>
                                <h6>Happy</h6>
                            </li>
                        </ul>
                        <div className={styles.fieldCont}>
                            <label>Enter Your Name</label>
                            <input type="text" />
                        </div>
                        <div className={styles.btnCont}>
                            <button>Submit</button>
                        </div>
                </div>
            }
            
        </div>
    </div>
  )
}

export default Training