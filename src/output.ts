import chalk from 'chalk';
import {GeoData, WthData } from './datafetch.js';
import getTime from './timefetch.js';
import { convertToAscii } from './generate/imgascii-converter.js';

const h = 15;
const w = 50;

const output = async (geo: GeoData, wth: WthData, args: any) => {

    try {
        const ascii = await convertToAscii('http:' + wth.current.condition.icon);
        console.log(`\n${ascii}\n`);
    } catch (e) {
        console.log(e);
    }

    if( args.extended )
        printExpand(geo, wth);
}

const printExpand = (geo: GeoData, wth: WthData) => {

    // print header
    console.log(`\n Weather Data`.padEnd(w/2), chalk.cyan(`Time: [${getTime()}]`.padStart(w/2)));
    console.log(chalk.gray(` `.padEnd(w, `-`)));

    console.log(`> City`.padEnd(w/2), `${geo.city}`.padStart(w/2));
    console.log(`> State/Province`.padEnd(w/2), `${geo.state_prov}`.padStart(w/2));
    console.log(`> Condition`.padEnd(w/2), `${wth.current.condition.text}`.padStart(w/2));
    console.log(`> Current Temp`.padEnd(w/2), `${wth.current.temp_f}^F`.padStart(w/2));
    console.log(`> Humidity`.padEnd(w/2), `${wth.current.humidity}%`.padStart(w/2));
    console.log(`> Feels Like`.padEnd(w/2), `${wth.current.feelslike_f}^F`.padStart(w/2));
    console.log(``);
}

export default output;
