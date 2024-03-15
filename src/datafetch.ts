import "dotenv/config"

interface GeoData {
    ip: string,
    city: string
}

interface WthData {

}

const fetchGeoData = async () => {
    
    const geoRes = await fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.GEO_API_KEY}&fields=city`);
    const data = await geoRes.json() as GeoData;
    console.log(`${data.city}`);

    return data.city;

}

const fetchWthData = async (city: string) => {

    const wthRes = await fetch(`http://api.weatherapi.com/v1/current.json?key=${process.env.WTH_API_KEY}&q=${city}`);
    const res = await wthRes.json();
    console.log(`${JSON.stringify(res)}`);

    return res;
}

export {
    fetchGeoData,
    fetchWthData
}
