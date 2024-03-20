import chalk from 'chalk';
import fs from 'fs';
import config from './config.js';
import getTime from './timefetch.js'


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
    fs.appendFile("logs", `[${chalk.cyan(getTime())}] ${log}\n`, (error) => {
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
