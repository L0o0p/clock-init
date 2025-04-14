import styles from './Clock.module.scss';

interface ClockProps {
    date: string,
    month: string,
    lunarDate: string, // 添加农历日期,
    weekday: string,
    hours: number,
    minutes: number,
    seconds: number,
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Clock: React.FC<ClockProps> = (currentTime) => {

    // const {
    //     date,
    //     month,
    //     lunarDate, // 添加农历日期,
    //     weekday,
    //     hours,
    //     minutes,
    //     seconds
    // } = currentTime;
    // // 计算秒针旋转角度：每秒旋转 6 度
    // const secondRotation = seconds * 6;

    return (
        <div className={styles.container}>
            <div className={styles.background}
                // children={
         
                // }
            />
            <div className={styles.ring} >
                <div className={styles.ringShadow} />
                <div className={styles.blackRing} />
                <div className={styles.metalRing} />
            </div>
            <div className={styles.content}>
          
            </div>

        </div>
    );
}
export default Clock;