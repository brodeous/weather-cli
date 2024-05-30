#! /usr/bin/env node
import "dotenv/config";
import { Command } from "commander";
import { GeoData, fetchGeoData, fetchWthData } from "./datafetch.js";
import * as debug from "./logger.js";
import { organizeData } from "./data.js";
import { convertToAscii } from "./generate/imgascii-converter.js";
import { display } from "./display.js";

export const program = new Command();

program
    .name("GetWet")
    .description(`A CLI that retrieves current weather data for a specific location.
    > No option will return data based on current public ip.`)
    .version("0.1.0")
    .usage("[options] args")
    .option("-c, --city <city>", "specific city")
    .option("-z, --zipcode <zipcode>", "specific zipcode")
    .option("-l, --lat_long <lat,long>", "specific latitude and longitude")
    .addHelpText("after",`

Example:
    --city
        $ getWet -c Dallas
        $ getWet -c 'San Diego'
        $ getWet -c San_Diego
    --zipcode
        $ getWet -z 77007
    --lat_long
        $ getWet -l 39.76893679731222,-86.1639944813316
`)

program.parse(process.argv);

const run = async () => {
    try {
         

        const opts = program.opts();
        const geo = await fetchGeoData();

        let userData: GeoData = {
            ip: geo.ip,
            city: opts.city ? opts.city : "",
            state_prov: "",
            country_code2: "",
            latitude: opts.lat_long ? opts.lat_long.split(',')[0] : "",
            longitude: opts.lat_long ? opts.lat_long.split(',')[1] : "",
            zip: opts.zipcode ? opts.zipcode : "",
        };

        const weatherData = await fetchWthData(userData);
        const ascii = await convertToAscii('http:' + weatherData.current.condition.icon);
        const data = await organizeData(weatherData);
        
        display(ascii, data);

    } catch (e) {
        debug.error(e as string);
    }

}

run();
