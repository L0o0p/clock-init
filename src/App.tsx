import { useState, useEffect } from 'react';
import './App.css'
import Clock from './Component/Clock';
import { Lunar } from 'lunar-typescript';
// types.ts
export interface TimeMap {
  months: {
    [key: number]: string;  // 定义数字索引签名
  };
  weekdays: {
    [key: number]: string;  // 定义数字索引签名
  };
}

// constants.ts

export const TIME_MAP: TimeMap = {
  months: {
    0: 'JAN',
    1: 'FEB',
    2: 'MAR',
    3: 'APR',
    4: 'MAY',
    5: 'JUN',
    6: 'JUL',
    7: 'AUG',
    8: 'SEP',
    9: 'OCT',
    10: 'NOV',
    11: 'DEC'
  },
  weekdays: {
    0: 'SUN',
    1: 'MON',
    2: 'TUE',
    3: 'WED',
    4: 'THU',
    5: 'FRI',
    6: 'SAT'
  }
};


function App() {

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
    console.log('Updated timeData:', timeData);
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
      height: '472px',
      width: '472px',
      backgroundColor: 'green'
    }}>
      <Clock {...timeData}></Clock>
      </div>
    </div>
  )
}

export default App
