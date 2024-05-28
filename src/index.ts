#! /usr/bin/env node
import "dotenv/config";
import { GeoData, fetchGeoData, fetchWthData } from "./datafetch.js";
import * as debug from "./logger.js";
import organizeData from "./data.js";
import { convertToAscii } from "./generate/imgascii-converter.js";
import display from "./display.js";



const run = async () => {
    try {
         
        let userData: GeoData = {
            ip: "",
            city: "",
            state_prov: "",
            country_code2: "",
            latitude: "",
            longitude: "",
            zip: "",
        };

        if (process.argv.length === 2) { // No Arguements
            userData = await fetchGeoData();
            //debug.info(`location data recieved\n\t\\___ city: ${userData.city}\n\t\\___ state: ${userData.state_prov}\n\t\\___ country: ${userData.country_code2}\n\t\\___ lat/log: ${userData.latitude}/${userData.longitude}`);
        } else {
            for (let idx = 2; idx < process.argv.length; idx += 2) {
                switch (process.argv[idx]) {
                    case "-c" || "--city":
                        userData.city = process.argv[idx + 1];
                        break;
                    case "-l" || "--long_lat":
                        userData.longitude = process.argv[idx + 1];
                        userData.latitude = process.argv[idx + 2];
                        idx++;
                        break;
                    case "-z" || "--zip":
                        userData.zip = process.argv[idx + 1];
                        break;
                    default:
                        debug.error(`Incorrect argument given`);
                        break;
                }
            }
        }

        const weatherData = await fetchWthData(userData);
        //debug.info(`weather data recieved\n\t\\___ temp: ${weatherData.current.temp_f}\n\t\\___ condition: ${weatherData.current.condition.text}\n\t\\___ humidity: ${weatherData.current.humidity}\n\t\\___ feels like: ${weatherData.current.feelslike_f}`);
        const ascii = await convertToAscii('http:' + weatherData.current.condition.icon);
        const data = await organizeData(weatherData);
        
        display(ascii, data);

    } catch (e) {
        debug.error(e as string);
    }

}

run();
