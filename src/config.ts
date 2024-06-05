import fs from "fs";
import path from "path";
import { homedir } from "os";
import { spawnSync } from "child_process";

const home = homedir();
const _dirname = path.join(home, '.config', 'getwet');

class Config {
    ip_geo_api: string;
    weather_api: string;

    constructor() {
        this.ip_geo_api = "";
        this.weather_api = "";
    }
    
    getData = async () => {
        this.#readFile();
    }

    init = async () => {
        await this.#createFile();
        await this.#readFile();
        console.log(`[\x1b[33mCONFIG\x1b[0m] initialized\n\t\\___ location: \x1b[32m${_dirname}/getwet.conf\x1b[0m`);
    }

    edit = async () => {
        const editor = process.env.EDITOR || "nano";
        spawnSync(`${editor}`, [path.join(_dirname, "getwet.conf")], { stdio: "inherit" });
        await this.#readFile();
        console.log(`[\x1b[33mCONFIG\x1b[0m] updated`);
    }

    remove = async () => {
        fs.rmSync(_dirname, { recursive: true, force: true });
        console.log(`[\x1b[33mCONFIG\x1b[0m] \x1b[31mremoved\x1b[0m`);
    }

    print = () => {
        let out = '\n';
        out += "[\x1b[33mCONFIG\x1b[0m] print\n\n"
        out += `Geolocation > ${this.ip_geo_api}\n`;
        out += `Weather API > ${this.weather_api}\n`;
        
        console.log(out);
    }

    #createFile = async () => {
        if (!fs.existsSync(path.join(_dirname, 'getwet.conf'))) {
            fs.mkdirSync(_dirname);
            await this.#saveFile();
        } else {
            throw new Error(`[\x1b[33mCONFIG\x1b[0m] file already exists\n\t\\___ location: \x1b[32m${_dirname}/getwet.conf\x1b[0m`);
        }
    }

    #readFile = async () => {
        try {
            if (!fs.existsSync(path.join(_dirname, 'getwet.conf'))) {
                await this.#createFile();
            }
            const res = fs.readFileSync(path.join(_dirname, 'getwet.conf'));
            const data = JSON.parse(res.toString());

            this.ip_geo_api = data.ip_geo_api;
            this.weather_api = data.weather_api;
        } catch (e) {
            throw new Error(`[\x1b[33mCONFIG\x1b[0m] Issue reading/writing config file\n\t\\___Try again or check for config file.`);
        }
    }

    #saveFile = async () => {
        const file = {
            ip_geo_api: this.ip_geo_api,
            weather_api: this.weather_api,
        }
        fs.writeFileSync(path.join(_dirname, 'getwet.conf'), JSON.stringify(file, null, 2));
    }
}

export default Config;
