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
    
    init = async () => {
        await this.#createFile();
        console.log(`[\x1b[33mCONFIG\x1b[0m] initialized\n\t\\___ location > \x1b[32m${_dirname}/getwet.conf\x1b[0m`);
    }

    edit = async () => {
        const editor = process.env.EDITOR || "nano";
        spawnSync(`${editor}`, [path.join(_dirname, "getwet.conf")], { stdio: "inherit" });
        await this.readFile();
        console.log(`[\x1b[33mCONFIG\x1b[0m] updated`);
    }

    remove = async () => {
        fs.rmSync(_dirname, { recursive: true, force: true });
        console.log(`[\x1b[33mCONFIG\x1b[0m] \x1b[31mremoved\x1b[0m`);
    }

    print = async () => {
        await this.readFile();
        let out = '\n';
        out += "[\x1b[33mCONFIG\x1b[0m] print\n"
        out += `\t\\___ Geolocation > \x1b[32m${this.ip_geo_api}\x1b[0m\n`;
        out += `\t\\___ Weather API > \x1b[32m${this.weather_api}\x1b[0m\n`;
        
        console.log(out);
    }

    #createFile = async () => {
        if (!fs.existsSync(path.join(_dirname, 'getwet.conf'))) {
            fs.mkdirSync(_dirname);
            const file = {
                ip_geo_api: this.ip_geo_api,
                weather_api: this.weather_api,
            }
            fs.writeFileSync(path.join(_dirname, 'getwet.conf'), JSON.stringify(file, null, 2));
        } else {
            throw new Error(`[\x1b[33mCONFIG\x1b[0m] file already exists\n\t\\___ location: \x1b[32m${_dirname}/getwet.conf\x1b[0m`);
        }
    }

    readFile = async () => {
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
}

export default Config;
