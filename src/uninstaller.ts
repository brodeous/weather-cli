import fs from "fs";
import path from "path";
import { homedir } from "os";
import { execSync } from "child_process";

const home = homedir();
const _dirname = path.join(home, '.config', 'getwet');
const w = 11;
export const uninstall = () => {
    console.log(`[\x1b[33mUNINSTALLER\x1b[0m] Uninstalling system`);

    if (fs.existsSync(_dirname)) {
        fs.rmSync(_dirname, { recursive: true, force: true });
    }
    console.log(`\t\\___`, `config`.padEnd(w), `: \x1b[31mremoved\x1b[0m`);

    execSync("npm uninstall -g @brodeous/weather-cli");
    console.log(`\t\\___`, `application`.padEnd(w), `: \x1b[31mremoved\x1b[0m`);
}
