import chalk from 'chalk';
import {GeoData, WthData } from './datafetch.js';
import getTime from './timefetch.js';

const h = 15;
const w = 50;

const organizeData = async (geo: GeoData, wth: WthData): Promise<string> => {

    let data = "";
    // print header
    data += ` Weather Data`.padEnd(w/2) + chalk.cyan(`Time: [${getTime()}]\n`.padStart(w/2));
    data += chalk.gray(` `.padEnd(w, `-`)) + '\n';

    data += `> City`.padEnd(w/2) + `${geo.city}\n`.padStart(w/2);
    data += `> State/Province`.padEnd(w/2) + `${geo.state_prov}\n`.padStart(w/2);
    data += `> Condition`.padEnd(w/2) + `${wth.current.condition.text}\n`.padStart(w/2);
    data += `> Current Temp`.padEnd(w/2) + `${wth.current.temp_f}^F\n`.padStart(w/2);
    data += `> Humidity`.padEnd(w/2) + `${wth.current.humidity}%\n`.padStart(w/2);
    data += `> Feels Like`.padEnd(w/2) + `${wth.current.feelslike_f}^F\n`.padStart(w/2);

    return data;
}

export default organizeData;
