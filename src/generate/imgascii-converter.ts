import { exec } from "child_process";
import fs from "fs";
import path from "path";
import * as debug from "../logger.js";


const appDir = process.cwd();
const iconDir = path.join(appDir, 'icons/png');
const txtDir = path.join(appDir, 'icons/txt');

fs.readdir(iconDir, function(err, folders) {

    if (err) {
        debug.error(`error listing directory\n\t\\___ ${err}`);
        return;
    }

    //debug.ok(`${folders}`);

    for (let idx = 0; idx < folders.length; idx++) {
        
        let currentDir = path.join(iconDir, folders[idx]);
        let outputDir = path.join(txtDir, folders[idx]);

        fs.exists(outputDir, (exists) => {
            if (!exists) {
                debug.info(`creating directory ${outputDir}`);
                fs.mkdir(outputDir, (err) => {
                    if (err) {
                        debug.error(`error making directory: ${outputDir}\t\n\\___ ${err.message}`)
                        return;
                    }
                    debug.ok(`directory ${outputDir} created`);
                });
            }
        })

        fs.readdir(currentDir, function(err, files) {

            if (err) {
                debug.error(`error listing files in directory ${folders[idx]}\n\t\\___ ${err}`);
                return;
            }

            //debug.ok(`${files}`);

            for (let jdx = 0; jdx < files.length; jdx++) {
                
                const currentFile = path.join(currentDir, files[jdx]);

                const file = files[jdx].substr(0, files[idx].length - 4).concat(`.txt`);
                const outputFile = path.join(outputDir, file);
                //debug.ok(currentFile);
                //debug.info(outputFile);
                
                exec(`img2ascii -i ${currentFile} -o ${outputFile}`, (err, stdout, stderr) => {

                    if (err) {
                        debug.error(`error when running img2ascii\n\t\\___ ${err.message}`);
                        return;
                    }
                    
                    if (stderr) {
                        debug.error(`error from img2ascii\n\t\\___ ${stderr}`);
                        return;
                    }

                    debug.ok(`[img2ascii] ${stdout}`);

                });
            }
        });
    }

});
