import "dotenv/config"

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
    
        const res = await fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.GEO_API_KEY}&fields=geo`);
        const data = await res.json() as GeoData;

        return data;
}

export const fetchWthData = async (geo: GeoData) => {
    let param = "";

    if (geo.city !== "") {
        param = geo.city;
    } else if (geo.zip !== "") {
        param = geo.zip;
    } else if (geo.latitude !== "") {
        param = geo.latitude + ',' + geo.longitude;
    } else {
        param = geo.ip;
    }

    const res = await fetch(`http://api.weatherapi.com/v1/current.json?key=${process.env.WTH_API_KEY}&q=${param}`);
    const data = await res.json() as WthData;

    return data;
}
