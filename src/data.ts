import { WthData } from './datafetch.js';
import getTime from './timefetch.js';

const w = 50;

export const organizeData = async (data: WthData): Promise<string> => {

    let out = "";
    // print header
	out += `\x1b[1m` + `  Weather Data`.padEnd(w/2) + `\x1b[36m` + `Time: [${getTime()}]  `.padStart(w/2) + `\x1b[0m\n`;
	out += `\x1b[90m` + ` `.padEnd(w-1, `-`) + '\x1b[0m\n';

	out += `> City`.padEnd(w/2) + `${data.location.name}`.padStart(w/2) + `\n`;
	out += `> State/Province`.padEnd(w/2) + `${data.location.region}`.padStart(w/2) + `\n`;
	out += `> Country`.padEnd(w/2) + `${data.location.country}`.padStart(w/2) + `\n`;
	out += `> Condition`.padEnd(w/2) + `${data.current.condition.text}`.padStart(w/2) + `\n`;
	out += `> Current Temp`.padEnd(w/2) + `${data.current.temp_f}^F`.padStart(w/2) + `\n`;
	out += `> Humidity`.padEnd(w/2) + `${data.current.humidity}%`.padStart(w/2) + `\n`;
	out += `> Feels Like`.padEnd(w/2) + `${data.current.feelslike_f}^F`.padStart(w/2) + `\n`;

    return out;
}
