const getTime = () => {
    const currentTime = new Date();

    let hour = 0;
    let status = '';
    if (currentTime.getHours() > 12) {
        hour =  currentTime.getHours() - 12;
        status = 'PM';
    } else {
        currentTime.getHours();
        status = 'AM';
    }
    const currentHour = hour < 10 ? `${0}${hour}` : `${hour}`;
    const currentMinute = currentTime.getMinutes() < 10 ? `${0}${currentTime.getMinutes()}` : `${currentTime.getMinutes()}`;
    const time = `${currentHour}:${currentMinute} ${status}`;

    return time;
}

export default getTime;
