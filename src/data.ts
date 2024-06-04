import chalk from 'chalk';
import {GeoData, WthData } from './datafetch.js';
import getTime from './timefetch.js';

const h = 15;
const w = 50;

export const organizeData = async (geo: GeoData, data: WthData): Promise<string> => {

    let out = "";
    // print header
	out += chalk.bold(`  Weather Data`.padEnd(w/2) + chalk.cyan(`Time: [${getTime()}]\n`.padStart(w/2)));
	out += chalk.gray(` `.padEnd(w, `-`)) + '\n';

	out += `> City`.padEnd(w/2) + `${geo.city ? geo.city : data.location.name}\n`.padStart(w/2);
	out += `> State/Province`.padEnd(w/2) + `${geo.state_prov ? geo.state_prov : data.location.region}\n`.padStart(w/2);
	out += `> Country`.padEnd(w/2) + `${data.location.country}\n`.padStart(w/2);
	out += `> Condition`.padEnd(w/2) + `${data.current.condition.text}\n`.padStart(w/2);
	out += `> Current Temp`.padEnd(w/2) + `${data.current.temp_f}^F\n`.padStart(w/2);
	out += `> Humidity`.padEnd(w/2) + `${data.current.humidity}%\n`.padStart(w/2);
	out += `> Feels Like`.padEnd(w/2) + `${data.current.feelslike_f}^F\n`.padStart(w/2);

    return out;
}
