import "dotenv/config"
import { config } from "./index.js"

export type GeoData = {
    ip: string,
    city: string,
    state_prov: string,
    country_code2: string,
    latitude: string,
    longitude: string,
    zip: string
}

export type WthData = {
    location: {
        name: string,
        region: string,
        country: string,
    },
    current: {
        temp_f: number,
        condition: {
            text: string,
            icon: string,
        }
        humidity: number,
        feelslike_f: number
    }
}

export const fetchGeoData = async () => {
    
    try{
        const res = await fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${config.ip_geo_api}&fields=geo`);
        const data = await res.json() as GeoData;

        return data;
    } catch (e) {
        throw new Error(`[\x1b[33mFETCH\x1b[0m] Invalid Geolocation API Key`);
    }
}

export const fetchWthData = async (geo: GeoData) => {
    let param = "";

    try {
        if (geo.zip !== "") {
            param = geo.zip;
        } else if (geo.latitude !== "") {
            param = geo.latitude + ',' + geo.longitude;
        } else {
            param = geo.city; // be given by either user or geo api
        }

        const res = await fetch(`http://api.weatherapi.com/v1/current.json?key=${config.weather_api}&q=${param}`);
        const data = await res.json() as WthData;

        return data;
    } catch (e) {
        throw new Error(`[\x1b[33mFETCH\x1b[0m] Invalid Weather API Key`);
    }
}
