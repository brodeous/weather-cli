import fs from "fs";
import path from "path";
import { homedir } from "os";

const home = homedir();
const _dirname = path.join(home, '.config', 'getwet');

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

    #createFile = async () => {
        fs.mkdirSync(_dirname);
        await this.#saveFile();
    }

    #readFile = async () => {
        console.log(_dirname);
        try {
            if (!fs.existsSync(path.join(_dirname, 'getwet.conf'))) {
                await this.#createFile();
            }
            const res = fs.readFileSync(path.join(_dirname, 'getwet.conf'));
            const data = JSON.parse(res.toString());

            this.ip_geo_api = data.ip_geo_api;
            this.weather_api = data.weather_api;
        } catch (e) {
            throw new Error(`[\x1b[33mCONFIG\x1b[0m] Issue reading/writing config file. Try again or make sure there is a config.json file.\n${e}`);
        }
    }

    #saveFile = async () => {
        const file = {
            ip_geo_api: this.ip_geo_api,
            weather_api: this.weather_api,
        }
        fs.writeFileSync(path.join(_dirname, 'getwet.conf'), JSON.stringify(file, null, 2));
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
