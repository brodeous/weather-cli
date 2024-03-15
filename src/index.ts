#! /usr/bin/env node
import "dotenv/config";
import { fetchGeoData, fetchWthData } from "./datafetch.js";
import * as log from "./logger.js";

const run = async () => {
    try {
         
        const userData = await fetchGeoData();
        log.info(`location data recieved\n\t\\___ city: ${userData.city}\n\t\\___ state: ${userData.state_prov}\n\t\\___ country: ${userData.country_code2}\n\t\\___ lat/log: ${userData.latitude}/${userData.longitude}`);

        const weatherData = await fetchWthData(userData.city);
        log.info(`weather data recieved\n\t\\___ temp: ${weatherData.current.temp_f}\n\t\\___ condition: ${weatherData.current.condition.text}\n\t\\___ humidity: ${weatherData.current.humidity}\n\t\\___ feels like: ${weatherData.current.feelslike_f}`);

    } catch (e) {
        log.error(e as string);
    }

}

run();
