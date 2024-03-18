import chalk from 'chalk';
import fs from 'fs';
import config from './config.js';

const currentTime = new Date();
const currentHour = currentTime.getHours() < 10 ? `${0}${currentTime.getHours()}` : `${currentTime.getHours()}`;
const currentMinute = currentTime.getMinutes() < 10 ? `${0}${currentTime.getMinutes()}` : `${currentTime.getMinutes()}`;
const currentSecond = currentTime.getSeconds() < 10 ? `${0}${currentTime.getSeconds()}` : `${currentTime.getSeconds()}`;
const time = chalk.cyan(`${currentHour}:${currentMinute}:${currentSecond}`);

const info = (msg: string) => {
    const text = chalk.white(`[i] ${msg}`);
    printLog(text);
}

const ok = (msg: string) => {
    const text = chalk.green(`[+] ${msg}`);
    printLog(text);
}

const warn = (msg: string) => {
    const text = chalk.green(`[w] ${msg}`);
    printLog(text);
}

const error = (msg: string) => {
    const text = chalk.red(`[!]`) + ` ${msg}`;
    printLog(text);
}

const printLog = (log: string) => {
    fs.appendFile("logs", `[${time}] ${log}\n`, (error) => {
        if (error) throw error;
    });

    if (config.isDev)
        console.log(log);
}

export {
    info,
    ok,
    warn,
    error,
}
