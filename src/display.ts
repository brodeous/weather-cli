import chalk from 'chalk';
const DATA_START = 6;
const FOOT_START = 20

const w = 50;
const footer = () => {
    let data = "";

    data += ` ` + chalk.bold(chalk.gray(`$ getwet\n`.padStart(w)));
    data += ` ` + chalk.gray(`@NMeekGit\n`.padStart(w));
    data += ` ` + chalk.gray(`MIT License\n`.padStart(w));
    return data;
}

const display = (a: string, d: string) => {
    const ascii = a.split('\n');
    const data = d.split('\n');
    const foot = footer().split('\n');

    let j = 0, k = 0;
    for (let i = 0; i < ascii.length; i++) {
        let output = ascii[i];
        if (i >= DATA_START && j < data.length) {
            output += data[j];
            j++;
        }
        if (i >= FOOT_START && k < foot.length) {
            output += foot[k];
            k++;
        }
        console.log(output);
    }
}

export default display;
