import "dotenv/config"

interface GeoData {
    city: string,
    state_prov: string,
    country_code2: string,
    latitude: string,
    longitude: string
}

interface WthData {
    current: {
        temp_f: number
        condition: {
            text: string
        }
        humidity: number,
        feelslike_f: number
    }
}

const fetchGeoData = async () => {
    
        const res = await fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.GEO_API_KEY}&fields=geo`);
        const data = await res.json() as GeoData;

        return data;
}

const fetchWthData = async (city: string) => {

    const res = await fetch(`http://api.weatherapi.com/v1/current.json?key=${process.env.WTH_API_KEY}&q=${city}`);
    const data = await res.json() as WthData;

    return data;
}

export {
    fetchGeoData,
    fetchWthData
}
