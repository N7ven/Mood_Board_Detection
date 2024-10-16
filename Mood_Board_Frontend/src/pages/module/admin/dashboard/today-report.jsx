/* eslint-disable import/no-extraneous-dependencies */
import React,{useState,useEffect} from 'react';
import Images from 'assets/Images';
import GaugeChart from 'react-gauge-chart';
import styles from './dashboard.module.scss';

const TodayReport = ({data}) => {
  const emotionValue = ["HAPPY","SURPRISED","NEUTRAL","CONFUSED","UNHAPPY"]
  const [emotionsArray, setEmotionsArray] = useState([]);
  const [mxIndex, setMxIndex] = useState(0);
  const [emotionIndex, setEmotionIndex] = useState(0);

  const getbgimage=() => {
    const key=emotionValue[emotionIndex]
    console.log("KEY",key)
    switch (key) {
      case "HAPPY":
        return Images.HAPPY_BG
      case "SURPRISED":
        return Images.SURPRISED_BG
      case "NEUTRAL":
        return Images.SURPRISED_BG
      case "CONFUSED":
        return Images.DISGUSTED_BG
      case "UNHAPPY":
        return Images.CONTEMPT_BG          
      default :
      return Images.HAPPY_BG
    }
  }
  const getsmileye=(smile) => {

    const key=emotionValue[emotionIndex]
    console.log("KEY",key)
    if(key=="HAPPY" && smile=="hap")
      return styles.animated
    if(key=="SURPRISED" && smile=="sur")
      return styles.animated
    if(key=="NEUTRAL" && smile=="sur")
      return styles.animated
    if(key=="CONFUSED" && smile=="con")
      return styles.animated
    if(key=="UNHAPPY" && smile=="cont")
      return styles.animated
    else
      return null       
    
    // switch (key) {
    //   case "HAPPY" & smile=="hap":
    //     return styles.animated
    //   case "SURPRISED" & smile=='sur':
    //     return styles.animated
    //   case "CONFUSED" & smile=='con':
    //     return styles.animated
    //   case "DISGUSTED" & smile=='cont':
    //     return styles.animated
    //   case "CONTEMPT" & smile=='cont':
    //     return styles.animated  
    //   default :
    //     return null       
    // }
  }
  const indexOfMax = (arr) => { 
    let maxIndex = 0; 
    for (let i = 1; i < arr.length; i++) { 
        if (parseInt(arr[i]) > parseInt(arr[maxIndex])) { 
            maxIndex = i; 
        } 
    } 
    return maxIndex; 
}

  const findIndexValue = () => {
    const maxIndex=indexOfMax(emotionsArray)
    console.log(maxIndex)
    console.log(emotionsArray)
    if(maxIndex==0){setMxIndex(0.9)}
    if(maxIndex==1){setMxIndex(0.7)}
    if(maxIndex==2){setMxIndex(0.5)}
    if(maxIndex==3){setMxIndex(0.3)}
    if(maxIndex==4){setMxIndex(0.0)}
    setEmotionIndex(maxIndex)
  }    

   useEffect(() => {
    if(data){setEmotionsArray([data?.emotion_happy,data?.emotion_surprised,data?.emotion_neutral,data?.emotion_sad,data?.emotion_fear,data?.emotion_angry]);}
  }, [data]);

  useEffect(() => {
    if(emotionsArray.length>0){findIndexValue();}
  }, [emotionsArray]);
  console.log(mxIndex)
  
  return (
    <div className={styles.today_report}>
      <img className={styles.BG_IMAGE} src={getbgimage()}/>
      <div className={styles.reports}>
        <ul>
          <li className={styles.happy}>
            <p>Happy</p>
            <h3>
              {data?.emotion_happy}
              <span>55 %</span>
            </h3> 
            <img className={getsmileye("hap")} src={Images.HAPPY_ACTIVE } alt="Happy" width="30" />
          </li>
          <li className={styles.surprised}>
            <p>Surprised</p>
            <h3>
            {data?.emotion_surprised}
              <span>22 %</span>
            </h3>
            <img className={getsmileye("sur")} src={Images.SURPRISED_ACTIVE} alt="Surprised" width="30" />
          </li>
          <li className={styles.surprised}>
            <p>Neutral</p>
            <h3>
            {data?.emotion_neutral}
              <span>22 %</span>
            </h3>
            <img className={getsmileye("sur")} src={Images.SURPRISED_ACTIVE} alt="Surprised" width="30" />
          </li>
          <li className={styles.confused}>
            <p>Confused</p>
            <h3>
            {data?.emotion_sad}
              <span>12 %</span>
            </h3>
            <img className={getsmileye("con")} src={Images.CONFUSED_ACTIVE} alt="Confused" width="30" />
          </li>
          <li className={styles.disgusted}>
            <p>Unhappy</p>
            <h3>
            {data?.emotion_fear}
              <span>7 %</span>
            </h3>
            <img className={getsmileye("dis")} src={Images.DISGUSTED_ACTIVE} alt="Disgusted" width="30" />
          </li>
        </ul>
        <section className={styles.chart_container}>
          <h3 className={styles.mood}>{emotionValue[emotionIndex]}</h3>
          <GaugeChart
            id="gauge-chart2"
            className={styles.chart}
            nrOfLevels={5}
            colors={[ '#FF5656', '#FF8888', '#F1D614', '#84BD32', '#058C1A' ]}
            arcWidth={0.1}
            percent={mxIndex}
            cornerRadius={3}
            arcPadding={0.02}
            animate={false} 
          />
          <svg width="314" height="157" viewBox="0 0 314 157" fill="none" className={styles.gradient}>
            <g clipPath="url(#clip0_245_532)">
              <path d="M313.331 157.303C313.331 116.076 296.867 76.5371 267.56 47.3851C238.253 18.2332 198.504 1.85578 157.058 1.85577C115.612 1.85577 75.8632 18.2332 46.5563 47.3851C17.2494 76.5371 0.784918 116.076 0.784912 157.303L157.058 157.303H313.331Z" fill="url(#paint0_linear_245_532)" />
            </g>

            <linearGradient id="paint0_linear_245_532" x1="157.058" y1="1.85577" x2="157.058" y2="224" gradientUnits="userSpaceOnUse">
              <stop stopColor="#30AD43" />
              <stop offset="0.785" stopColor="white" stopOpacity="0" />
            </linearGradient>

          </svg>
          <svg viewBox="-14 -16 530 400" className={styles.chart_label}>
            <path id="curve" fill="transparent" d="M1 239.5C1 239.5 3.00006 13 241.25 0.499985C479.5 13 480 239.5 480 239.5" />
            <text width="500" fontSize="14px" fill="#FFFFFF">
              <textPath xlinkHref="#curve">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                CONTEMPT
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                DISGUEST
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                CONFUSED
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                SURPRISED
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                HAPPY
              </textPath>
            </text>
          </svg>
        </section>
      </div>
      <div className={styles.customer_details}>
        <div className={styles.pro_detail}>
          <img src={`data:image/png;base64,${data?.image64}`} alt="profile" className={styles.proimg} />
          <p>
            Age:{data?.age} & {data?.gender}
          </p> 
          <p>
            Accompanied with
            <ul className={styles.acc_user}>
              <li>
                <a className={styles.less}>
                  <img src={Images.LESS} alt="Less" width="28" />
                </a>
              </li>
              <li>
                <input type="text" />
              </li>
              <li>
                <a className={styles.add}>
                  <img src={Images.ADD} alt="Add" width="28" />
                </a>
              </li>
            </ul>
            people
          </p>
          <textarea placeholder="Comments" />
          <div className={styles.btn_cont}>
            <button type="button">Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodayReport;
