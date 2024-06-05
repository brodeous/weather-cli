import chalk from 'chalk';

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
//    fs.appendFile("logs", `[${chalk.cyan(getTime())}] ${log}\n`, (error) => {
//        if (error) throw error;
//    });
    console.log(log);
}

export {
    info,
    ok,
    warn,
    error,
}
