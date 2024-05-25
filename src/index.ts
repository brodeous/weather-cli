#! /usr/bin/env node
import "dotenv/config";
import { fetchGeoData, fetchWthData } from "./datafetch.js";
import * as debug from "./logger.js";
import organizeData from "./data.js";
import { convertToAscii } from "./generate/imgascii-converter.js";
import display from "./display.js";



const run = async () => {
    try {
         
        const userData = await fetchGeoData();
        //debug.info(`location data recieved\n\t\\___ city: ${userData.city}\n\t\\___ state: ${userData.state_prov}\n\t\\___ country: ${userData.country_code2}\n\t\\___ lat/log: ${userData.latitude}/${userData.longitude}`);

        const weatherData = await fetchWthData(userData.city);
        //debug.info(`weather data recieved\n\t\\___ temp: ${weatherData.current.temp_f}\n\t\\___ condition: ${weatherData.current.condition.text}\n\t\\___ humidity: ${weatherData.current.humidity}\n\t\\___ feels like: ${weatherData.current.feelslike_f}`);
        const ascii = await convertToAscii('http:' + weatherData.current.condition.icon);
        const data = await organizeData(userData, weatherData);
        
        display(ascii, data);

    } catch (e) {
        debug.error(e as string);
    }

}

run();
