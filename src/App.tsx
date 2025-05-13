import { useState, useEffect } from 'react';
import './App.css'
import Clock from './Component/Clock';
import { Lunar } from 'lunar-typescript';
import { TIME_MAP } from './constants.ts/constants';
// types.ts
export interface TimeMap {
  months: {
    [key: number]: string;  // 定义数字索引签名
  };
  weekdays: {
    [key: number]: string;  // 定义数字索引签名
  };
}

function App() {
  useEffect(() => {
    try {
      Loader?.postMessage(JSON.stringify({ loading: false }))
    } catch (e) {
      console.error(e)
    }
  }, [])
  const [timeData, setTimeData] = useState({
    date: '',
    month: '',
    lunarDate: '', // 添加农历日期,
    weekday: '',
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // 获取农历信息
      const lunar = Lunar.fromDate(now);
      const lunarMonth = lunar.getMonthInChinese(); // 获取农历月份
      const lunarDay = lunar.getDayInChinese();     // 获取农历日期
      setTimeData({
        date: String(now.getDate()).padStart(2, '0'),
        month: TIME_MAP.months[now.getMonth()],
        lunarDate: `${lunarMonth}月${lunarDay}`, // 例如："腊月廿八"
        weekday: TIME_MAP.weekdays[now.getDay()],
        hours: now.getHours(), // 小时
        minutes: now.getMinutes(), // 分钟
        seconds: now.getSeconds(), // 秒
      });

    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // 添加这个 useEffect 来监听 timeData 的变化
  useEffect(() => {
    // console.log('Updated timeData:', timeData);
    let accelerometer = null;
    try {
      accelerometer = new Accelerometer({ frequency: 10 });
      accelerometer.onerror = (event) => {
        // Handle runtime errors.
        if (event.error.name === 'NotAllowedError') {
          console.log('Permission to access sensor was denied.');
        } else if (event.error.name === 'NotReadableError') {
          console.log('Cannot connect to the sensor.');
        }
      };
      accelerometer.onreading = (e) => {
        console.log(e);
      };
      accelerometer.start();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
      // Handle construction errors.
      if (error.name === 'SecurityError') {
        console.log('Sensor construction was blocked by the Permissions Policy.');
      } else if (error.name === 'ReferenceError') {
        console.log('Sensor is not supported by the User Agent.');
      } else {
        throw error;
      }
    }
  }, [timeData]);


  return (
    <div style={{
      backgroundColor: '#333',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div style={{
        height: '480px',
        width: '480px',
        backgroundColor: 'green'
      }}>
        <Clock {...timeData}></Clock>
      </div>
    </div>
  )
}

export default App
