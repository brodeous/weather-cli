#! /usr/bin/env node
import "dotenv/config";
import { Command } from "commander";
import Config from "./config.js";
import { GeoData, fetchGeoData, fetchWthData } from "./datafetch.js";
import * as debug from "./logger.js";
import { organizeData } from "./data.js";
import { convertToAscii } from "./generate/imgascii-converter.js";
import { display } from "./display.js";

export const config = new Config();
export const program = new Command();

program
    .name("GetWet")
    .description(`A CLI that retrieves current weather data for a specific location.
    > No option will return data based on current public ip.`)
    .version("1.0.0")
    .usage("[options] args")
    .option("-c, --city <city>", "specific city")
    .option("-z, --zipcode <zipcode>", "specific zipcode")
    .option("-l, --lat_long <lat,long>", "specific latitude and longitude")
    .option("-s, --set_key <name>=<key>", "set api key")
    .option("-ls, --list_keys", "list api keys")
    .showHelpAfterError("(run -h, --help for additional information)")
    .addHelpText("after",`

Example:
    --city
        $ getwet -c Dallas
        $ getwet -c 'San Diego'
        $ getwet -c San_Diego
    --zipcode
        $ getwet -z 77007
    --lat_long
        $ getwet -l 39.76893679731222,-86.1639944813316
    --set-key
        $ getwet -s geolocation=<api key>
        $ getwet -s weatherapi=<api key>
`)

program.parse(process.argv);

const run = async () => {
    try {

        await config.init();
        const opts = program.opts();

        if (opts.list_keys) {
            config.list();
            return;
        }

        if (opts.set_key) {
            await config.setAPI(opts.set_key.split('=')[0], opts.set_key.split('=')[1]);
            return;
        }

        const geo = await fetchGeoData();

        let userData: GeoData = {
            ip: geo.ip,
            city: opts.city ? opts.city : geo.city,
            state_prov: "",
            country_code2: "",
            latitude: opts.lat_long ? opts.lat_long.split(',')[0] : "",
            longitude: opts.lat_long ? opts.lat_long.split(',')[1] : "",
            zip: opts.zipcode ? opts.zipcode : "",
        };

        const weatherData = await fetchWthData(userData);
        const ascii = await convertToAscii('http:' + weatherData.current.condition.icon);
        const data = await organizeData(geo, weatherData);
        
        display(ascii, data);

    } catch (e) {
        debug.error(e as string);
    }

}

run();
