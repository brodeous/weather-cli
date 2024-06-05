#! /usr/bin/env node
import { Command } from "commander";
import Config from "./config.js";
import { GeoData, fetchGeoData, fetchWthData } from "./datafetch.js";
import * as debug from "./logger.js";
import { organizeData } from "./data.js";
import { convertToAscii } from "./generate/imgascii-converter.js";
import { display } from "./display.js";
import { uninstall } from "./uninstaller.js";

export const config = new Config();
export const program = new Command();

const main = async (opts: any) => {
    try {

        if (opts.uninstall) {
            uninstall();
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
        const data = await organizeData(weatherData);
        
        display(ascii, data);

    } catch (e) {
        debug.error(e as string);
        process.exit(1);
    }

}

const conf = async (options: any) => {
        try {
            if (options.init)
                await config.init();
            if (options.edit)
                await config.edit();
            if (options.remove)
                await config.remove();
            if (options.print)
                config.print();

            process.exit(0);
        } catch (e) {
            debug.error(e as string);
            process.exit(1);
        }
}

program
    .name("getwet")
    .description(`A CLI that retrieves current weather data for a specific location.
    > No option will return data based on current public ip.`)
    .version("1.0.8")
    .usage("[options] args")
    .option("-c, --city <city>", "specific city")
    .option("-z, --zipcode <zipcode>", "specific zipcode")
    .option("-l, --lat_long <lat,long>", "specific latitude and longitude")
    .option("-u, --uninstall", "uninstall getwet")
    .action( async (options) => {
        await main(options);
    })
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
        $ getwet -s weatherapi=<api key>`)

program
    .command("config")
    .description("configure .conf file")
    .option("-i, --init", "initialize config file")
    .option("-e, --edit", "edit config file")
    .option("-rm, --remove", "remove config file")
    .option("-p, --print", "print config")
    .action( async (options) => {
        await conf(options);
    })
    .showHelpAfterError("(run -h, --help for additional information)")

program.parse(process.argv);
