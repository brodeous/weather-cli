import chalk from 'chalk';

const getTime = () => {
    const currentTime = new Date();
    const currentHour = currentTime.getHours() < 10 ? `${0}${currentTime.getHours()}` : `${currentTime.getHours()}`;
    const currentMinute = currentTime.getMinutes() < 10 ? `${0}${currentTime.getMinutes()}` : `${currentTime.getMinutes()}`;
    const currentSecond = currentTime.getSeconds() < 10 ? `${0}${currentTime.getSeconds()}` : `${currentTime.getSeconds()}`;
    const time = `${currentHour}:${currentMinute}:${currentSecond}`;

    return time;
}

export default getTime;
