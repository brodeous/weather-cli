const getTime = () => {
    const currentTime = new Date();
    const currentHour = currentTime.getHours() < 10 ? `${0}${currentTime.getHours()}` : `${currentTime.getHours()}`;
    const currentMinute = currentTime.getMinutes() < 10 ? `${0}${currentTime.getMinutes()}` : `${currentTime.getMinutes()}`;
    const status = parseInt(currentHour) < 12 ? 'AM' : 'PM';
    const time = `${currentHour}:${currentMinute}:${status}`;

    return time;
}

export default getTime;
