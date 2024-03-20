import chalk from 'chalk';
import {GeoData, WthData } from './datafetch.js';
import getTime from './timefetch.js';

const h = 15;
const w = 50;

const output = (geo: GeoData, wth: WthData, args: any) => {

    if( args.extended )
        printExpand(geo, wth);
}

const printExpand = (geo: GeoData, wth: WthData) => {

    // print header
    console.log(``.padEnd(w, `-`));
    console.log(` Weather Data`.padEnd(w/2), `Time: [${getTime()}]`.padStart(w/2));
    console.log(``.padEnd(w, `-`));

    console.log(`> Location`.padEnd(w/2), `${geo.city}, ${geo.state_prov.slice(0, 2).toUpperCase()}`.padStart(w/2));
    console.log(`> Current Temp`.padEnd(w/2), `${wth.current.temp_f} ^F`.padStart(w/2));
}

export default output;
