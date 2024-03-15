import chalk from 'chalk';

const info = (msg: string) => {
    console.log(chalk.white(`[i] ${msg}`));
}

const ok = (msg: string) => {
    console.log(chalk.green(`[+] ${msg}`));
}

const warn = (msg: string) => {
    console.log(chalk.yellow(`[w] ${msg}`));
}

const error = (msg: string) => {
    console.log(chalk.red(`[!]`), `${msg}`);
}

export {
    info,
    ok,
    warn,
    error,
}
