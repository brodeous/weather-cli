const info = (msg: string) => {
    const text = `[i] ${msg}`;
    printLog(text);
}

const ok = (msg: string) => {
    const text = (`\x1b[32m[+] ${msg}\x1b[0m`);
    printLog(text);
}

const warn = (msg: string) => {
    const text = `\x1b[33m[w] ${msg}\x1b[0m`;
    printLog(text);
}

const error = (msg: string) => {
    const text = `\x1b[31m[!]\x1b[0m` + ` ${msg}`;
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
