import fs from "fs";

class Config {
    ip_geo_api: string;
    weather_api: string;

    constructor() {
        this.ip_geo_api = "";
        this.weather_api = "";
    }

    init = async () => {
        await this.#readFile();
    }

    setAPI = async (key: string, val:string) => {
        switch (key) {
            case "geolocation":
                this.ip_geo_api = val;
                await this.#saveFile();
                await this.#readFile()
                console.log(`[\x1b[33mCONFIG\x1b[0m] geolocation set`);
                break;
            case "weatherapi":
                this.weather_api = val;
                await this.#saveFile();
                await this.#readFile()
                console.log(`[\x1b[33mCONFIG\x1b[0m] weatherapi set`);
                break;
            default:
                throw new Error(`[\x1b[33mCONFIG\x1b[0m] incorrect key variable given`);
        }
    }

    #readFile = async () => {
        try {
            if (!fs.existsSync(`${__dirname}/config.json`)) {
                await this.#saveFile();
            }
            const res = fs.readFileSync(`${__dirname}/config.json`);
            const data = JSON.parse(res.toString());

            this.ip_geo_api = data.ip_geo_api;
            this.weather_api = data.weather_api;
        } catch (e) {
            throw new Error(`[\x1b[33mCONFIG\x1b[0m] Issue reading config file. Try again or make sure there is a config.json file.\n${e}`);
        }
    }

    #saveFile = async () => {
        const file = {
            ip_geo_api: this.ip_geo_api,
            weather_api: this.weather_api,
        }

        try {
            fs.writeFileSync(`${__dirname}/config.json`, JSON.stringify(file, null, 2));
        } catch (e) {
            throw new Error(`[\x1b[33mCONFIG\x1b[0m] Issue saving to config.json. Try again.`);
        }
    }

    list = () => {
        let out = '\n';
        out += "[\x1b[33mAPI KEYS\x1b[0m]\n\n"
        out += `Geolocation > ${this.ip_geo_api}\n`;
        out += `Weather API > ${this.weather_api}\n`;
        
        console.log(out);
    }

}

export default Config;
