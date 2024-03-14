import "dotenv/config";
import chalk from "chalk";

const command = process.argv.splice(2, 1);

const run = async () => {
    // test out weatherapi
    const res = await fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.API_KEY}&fields=city`);
    const ip = await res.json();

    console.log(`${JSON.stringify(ip)}`);
}

run();
