import React,{useState,useEffect} from 'react';
import Images from 'assets/Images';
import LineCharts from 'components/minor/chart/line';
import DateRangePickerComp from 'components/minor/react-date-range/react-date-range';
import Webcam from "react-webcam";
import ReactDOM from 'react-dom';
import { Buffer } from 'buffer';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import GIF001 from 'assets/images/gif/gif001.gif';
import GIF002 from 'assets/images/gif/gif002.gif';
import GIF003 from 'assets/images/gif/gif003.gif';
import GIF004 from 'assets/images/gif/gif004.gif';
import GIF005 from 'assets/images/gif/gif005.gif';
import Purchases from './purchases';
import History from './history';
import TodayReport from './today-report';
import styles from './dashboard.module.scss';
import { socket } from './socket';


const Dashboard = () => {
  // @ts-ignore
  window.Buffer = Buffer;
  // Bala Code
  const [ value, setValue ] = React.useState('1');
  const [todayReport, setTodayReport] = useState([]);
  const [todayReportChart, setTodayReportChart] = useState([]);

  const [selectedTodayReport, setSelectedTodayReport] = useState();
  const [selectedReportIndex, setSelectedReportIndex] = useState(0);
  const [indexId, setIndexId] = useState(null);
  const webcamRef = React.useRef(null);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
      function onConnect() {
        console.log('Connected', fooEvents)
        // sendImage()
        setIsConnected(true);
      }
  
      function onDisconnect() {
        setIsConnected(false);
      }
  
      function onFooEvent(value) {
        console.log('custom-message',value)
        if(value) {
          var b = value.replace(/'/g, '"');
          const d = JSON.parse(b);
          console.log('custom-message',d)
          setFooEvents(previous => [...previous, value]);
          const response = d
          if(response.answer_to_send && response.answer_to_send.length>0) {
              setTodayReport(response.answer_to_send)
              console.log("Old",selectedTodayReport)
              console.log("New",response.answer_to_send[selectedReportIndex])
              setSelectedTodayReport(response.answer_to_send[selectedReportIndex])
          }
          // Chart Data Fetch
          if(response.answer_to_chart && response.answer_to_chart.length>0) {
            setTodayReportChart(response.answer_to_chart)
            }
        }
      }
      socket.on("connect_error", (error) => {
        console.log('error', error)
      });
  
      socket.on('connect', onConnect);
      socket.on('custom-message', onFooEvent);
  
      return () => {
        socket.off('connect', onConnect);
        socket.off('foo', onFooEvent);
      };
    }, []);

    useEffect(() => {
      setInterval(() => {
        let imageSrc = webcamRef.current.getScreenshot();
        if(imageSrc) {
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

    useEffect(() => {
      if(indexId){
      clrInterval()
      }
      //startInterval()
      fetchUserData()
    }, [selectedReportIndex]);


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  const startInterval = () => {
    const intervalId=setInterval(() => {
       fetchUserData()
    }, 7000);
    setIndexId(intervalId)
  };

  const clrInterval = () => {
    clearInterval(indexId)
  };

  const fetchUserData = () => {
  // fetch('hhttp://127.0.0.1:5000/get_users_data')
  fetch('https://okotech.ai/api/get_users_data')
  .then(response => response.json())
  .then(response => {
    console.log("User Response",response)
      if(response.answer_to_send && response.answer_to_send.length>0) {
          setTodayReport(response.answer_to_send)
          console.log("Old",selectedTodayReport)
          console.log("New",response.answer_to_send[selectedReportIndex])
          setSelectedTodayReport(response.answer_to_send[selectedReportIndex])
      }
      // Chart Data Fetch
      if(response.answer_to_chart && response.answer_to_chart.length>0) {
        setTodayReportChart(response.answer_to_chart)
      }      
  })
  };

//   const updateImage = () => {
//     // Using Fetch API
//     let imageSrc = webcamRef.current.getScreenshot();
//     imageSrc = imageSrc.replace(/^data:image\/[a-z]+;base64,/, "");
//     console.log("ImageStr",imageSrc)
//     fetch('http://127.0.0.1:5000/receive_image', {
//     method: 'POST',
//     body: JSON.stringify({
//     // Add parameters here
//     image64: imageSrc
//     }),
//     headers: {
//       'Content-type': 'application/json; charset=UTF-8',
//     }
//   })
//    .then((response) => response.json())
//    .then((data) => {
//       console.log(data);
//       // Handle data
//    })
//    .catch((err) => {
//       console.log(err.message);
//    });
//  };
  
  let happy_count=0,surprised_count=0,sad_count=0,angry_count=0,fear_count=0,neutral_count=0,unhappy_count=0;
  for (let i = 0; i < todayReport.length; i++) {
    happy_count+=parseInt(todayReport[i]?.emotion_happy)
    surprised_count+=parseInt(todayReport[i]?.emotion_surprised)
    neutral_count+=parseInt(todayReport[i]?.emotion_neutral)
    sad_count+=parseInt(todayReport[i]?.emotion_sad)
    angry_count+=parseInt(todayReport[i]?.emotion_angry)
    fear_count+=parseInt(todayReport[i]?.emotion_fear)
    unhappy_count=angry_count+fear_count
  } 

  return (
    <div className={styles.dashboard_container}>
      <div className={styles.dashboard_data}>
        <div className={styles.chartContainer}>
          {/* Selva Code */}
          <ul className={styles.moodList}>
            <li className={styles.happy}>
              <div className={styles.emoji}>
                <img src={Images.HAPPY} alt="Happy" width="24" />
              </div>
              <div className={styles.txtCont}>
                <h6>Happy</h6>
                <h3>
                  {/* {todayReport[2]?.emotion_happy} */}
                  {happy_count}
                  <span>60%</span>
                </h3>
              </div>
            </li>
            <li className={styles.surprised}>
              <div className={styles.emoji}>
                <img src={Images.SURPRISED} alt="surprised" width="24" />
              </div>
              <div className={styles.txtCont}>
                <h6>Surprised</h6>
                <h3>
                  {surprised_count}
                  <span>20%</span>
                </h3>
              </div>
            </li>
            <li className={styles.surprised}>
              <div className={styles.emoji}>
                <img src={Images.SURPRISED} alt="surprised" width="24" />
              </div>
              <div className={styles.txtCont}>
                <h6>Neutral</h6>
                <h3>
                  {neutral_count}
                  <span>20%</span>
                </h3>
              </div>
            </li>
            <li className={styles.confused}>
              <div className={styles.emoji}>
                <img src={Images.CONFUSED} alt="confused" width="24" />
              </div>
              <div className={styles.txtCont}>
                <h6>Confused</h6>
                <h3>
                  {sad_count}
                  <span>8%</span>
                </h3>
              </div>
            </li>
            <li className={styles.disgusted}>
              <div className={styles.emoji}>
                <img src={Images.DISGUSTED} alt="disgusted" width="24" />
              </div>
              <div className={styles.txtCont}>
                <h6>Unhappy</h6>
                <h3>
                {unhappy_count}
                  <span>7%</span>
                </h3>
              </div>
            </li>
          </ul>
          <div className={styles.emotTrend}>
            <LineCharts data={todayReportChart}/>
          </div>
        </div>
        <div className={styles.customer_data}>
          <div className={styles.customer_list}>
            <ul>
            {/* Bala code */}
            {
                todayReport?.length > 0 && todayReport?.map((report,index) => (
                  <li className={`${selectedReportIndex === index && styles.active} ${styles.happy}`} onClick={() =>{setSelectedTodayReport(report);setSelectedReportIndex(index)} }>
                    <a>
                      <span className={styles.segments}>
                        <img src={Images.SEGMENT01} alt="Segments" width="16" />
                      </span>
                      <div className={styles.user}>
                        <span className={styles.profileimg}>
                          <img src={`data:image/png;base64,${report?.image64}`} alt="Customer" width="36" />
                        </span>
                        <h5 className={styles.user}>
                          {report?.name}
                        </h5>
                      </div>
                      <span className={styles.customer_type}>
                        E
                      </span>
                    </a>
                  </li>
                ))
              }
              {console.log(todayReport)}
              {/* <li className={`${styles.active} ${styles.happy}`}>
                <a>
                  <span className={styles.segments}>
                    <img src={Images.SEGMENT01} alt="Segments" width="16" />
                  </span>
                  <div className={styles.user}>
                    <span className={styles.profileimg}>
                      <img src={Images.CUSTOMER01} alt="Customer" width="36" />
                    </span>
                    <h5 className={styles.user}>
                      P001
                    </h5>
                  </div>
                  <span className={styles.customer_type}>
                    E
                  </span>
                </a>
              </li>
              <li className={`${styles.surprised}`}>
                <a>
                  <span className={styles.segments}>
                    <img src={Images.SEGMENT02} alt="Segments" width="16" />
                  </span>
                  <div className={styles.user}>
                    <span className={styles.profileimg}>
                      <img src={Images.CUSTOMER02} alt="Customer" width="36" />
                    </span>
                    <h5>
                      P002
                    </h5>
                  </div>
                  <span className={styles.customer_type}>
                    N
                  </span>
                </a>
              </li>
              <li className={`${styles.confused}`}>
                <a>
                  <span className={styles.segments}>
                    <img src={Images.SEGMENT03} alt="Segments" width="16" />
                  </span>
                  <div className={styles.user}>
                    <span className={styles.profileimg}>
                      <img src={Images.CUSTOMER03} alt="Customer" width="36" />
                    </span>
                    <h5>
                      P003
                    </h5>
                  </div>
                  <span className={styles.customer_type}>
                    EN
                  </span>
                </a>
              </li>
              <li className={`${styles.disgusted}`}>
                <a>
                  <span className={styles.segments}>
                    <img src={Images.SEGMENT04} alt="Segments" width="16" />
                  </span>
                  <div className={styles.user}>
                    <span className={styles.profileimg}>
                      <img src={Images.CUSTOMER01} alt="Customer" width="36" />
                    </span>
                    <h5>
                      P004
                    </h5>
                  </div>
                  <span className={styles.customer_type}>
                    N
                  </span>
                </a>
              </li>
              <li className={`${styles.contempt}`}>
                <a>
                  <span className={styles.segments}>
                    <img src={Images.SEGMENT05} alt="Segments" width="16" />
                  </span>
                  <div className={styles.user}>
                    <span className={styles.profileimg}>
                      <img src={Images.CUSTOMER02} alt="Customer" width="36" />
                    </span>
                    <h5>
                      P005
                    </h5>
                  </div>
                  <span className={styles.customer_type}>
                    E
                  </span>
                </a>
              </li>
              <li className={`${styles.happy}`}>
                <a>
                  <span className={styles.segments}>
                    <img src={Images.SEGMENT06} alt="Segments" width="16" />
                  </span>
                  <div className={styles.user}>
                    <span className={styles.profileimg}>
                      <img src={Images.CUSTOMER03} alt="Customer" width="36" />
                    </span>
                    <h5>
                      P006
                    </h5>
                  </div>
                  <span className={styles.customer_type}>
                    N
                  </span>
                </a>
              </li> */}
            </ul>
          </div>
          <div className={`${styles.customer_detail} ${styles.happy}`}>
            {/* <img className={styles.BG_IMAGE} src={Images.CONFUSED_BG}/> */}
            <header>
              <h3>{selectedTodayReport?.name}</h3>
              <DateRangePickerComp />
            </header>
            <section className={`${styles.tab_container} custom_tab`}>
              <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                      <Tab label="TODAY" value="1" />
                      <Tab label="HISTORY" value="2" />
                      <Tab label="PURCHASES" value="3" />
                    </TabList>
                  </Box>
                  <TabPanel value="1">
                    <TodayReport data={selectedTodayReport}/>
                  </TabPanel>
                  <TabPanel value="2">
                    <History />
                  </TabPanel>
                  <TabPanel value="3">
                    <Purchases />
                  </TabPanel>
                </TabContext>
              </Box>
            </section>
          </div>
        </div>
      </div>
      <div className={styles.dashboard_camera}>
        <h4>Camera</h4>
        <a className={styles.collapsable}>
          <img src={Images.COLLAPSE} alt="collapse" width="3" />
        </a>
        <ul className={styles.cameraList}>
          <li>
            <a>
               {/* <img src={GIF004} alt="Camera01" />  */}
                {<Webcam 
                 width='100%'
                 height='100%'
                 screenshotFormat="image/jpeg"
                 aspectRatio={10}
                />}
                {<Webcam 
                 width={1000}
                 height={800}
                 ref={webcamRef}
                 screenshotFormat="image/jpeg"
                 aspectRatio={10}
                 style={{opacity: 1, flex:1, position:'absolute', zIndex:0}}
                />}
              <span>CAM001</span>
            </a>
            <ul>
              <li className={styles.happy} style={{ height: '40%' }}><span>40%</span></li>
              <li className={styles.surprised} style={{ height: '20%' }}><span>20%</span></li>
              <li className={styles.confused} style={{ height: '20%' }}><span>20%</span></li>
              <li className={styles.disgusted} style={{ height: '10%' }}><span>10%</span></li>
              <li className={styles.contempt} style={{ height: '10%' }}><span>10%</span></li>
            </ul>
          </li>
          <li>
            <a>
              <img src={GIF002} alt="Camera02" />
              <span>CAM002</span>
            </a>
            <ul>
              <li className={styles.happy} style={{ height: '40%' }}><span>40%</span></li>
              <li className={styles.surprised} style={{ height: '20%' }}><span>20%</span></li>
              <li className={styles.confused} style={{ height: '20%' }}><span>20%</span></li>
              <li className={styles.disgusted} style={{ height: '10%' }}><span>10%</span></li>
              <li className={styles.contempt} style={{ height: '10%' }}><span>10%</span></li>
            </ul>
          </li>
          <li>
            <a>
              <img src={GIF005} alt="Camera03" />
              <span>CAM003</span>
            </a>
            <ul>
              <li className={styles.happy} style={{ height: '40%' }}><span>40%</span></li>
              <li className={styles.surprised} style={{ height: '20%' }}><span>20%</span></li>
              <li className={styles.confused} style={{ height: '20%' }}><span>20%</span></li>
              <li className={styles.disgusted} style={{ height: '10%' }}><span>10%</span></li>
              <li className={styles.contempt} style={{ height: '10%' }}><span>10%</span></li>
            </ul>
          </li>
          <li>
            <a>
              <img src={GIF001} alt="Camera04" />
              <span>CAM004</span>
            </a>
            <ul>
              <li className={styles.happy} style={{ height: '40%' }}><span>40%</span></li>
              <li className={styles.surprised} style={{ height: '20%' }}><span>20%</span></li>
              <li className={styles.confused} style={{ height: '20%' }}><span>20%</span></li>
              <li className={styles.disgusted} style={{ height: '10%' }}><span>10%</span></li>
              <li className={styles.contempt} style={{ height: '10%' }}><span>10%</span></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
