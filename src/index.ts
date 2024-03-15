import "dotenv/config";
import { fetchGeoData, fetchWthData } from "./datafetch.js";
import chalk from "chalk";

const command = process.argv.splice(2, 1);

interface geoData {
    ip: string,
    city: string
}

const run = async () => {
    // test out weatherapi
    const userCity = await fetchGeoData();
    const data = await fetchWthData(userCity);
}

run();
