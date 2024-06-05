import fs from 'fs';
import path from 'path';
import * as debug from '../logger.js';
import { convertToAscii } from './imgascii-converter.js';

export const generate = async () => {

    const wd = process.cwd();
    const input = path.join(wd, 'icons', 'png');

    fs.readdir(input, async (err, folders) => {

        if (err) {
            debug.error(`error reading directory\n\t\\___ ${err.message}`);
            return;
        }

        for (let i = 0; i < folders.length; i++) {

            let folder = folders[i];
            let folderPath = path.join(input, folder);

            fs.readdir(folderPath, async (err, files) => {

                if (err) {
                    debug.error(`error reading files in directory ${folder}\n\t\\___ ${err.message}`);
                    return;
                }

                const output = path.join(wd, 'icons', `${folder}.ts`); 

                fs.writeFileSync(output, `// Module icons/${folder} is autogenerated; DO NOT EDIT DIRECTLY\n// See src/generate/icon-generator.ts for more information\n\n const ${folder} = {\n`);

                for (let j = 0; j < files.length; j++) {
                    const name = files[j].substring(0, files[j].length - 4);

                    const filePath = path.join(folderPath, files[j]);
                    const ascii = await convertToAscii(filePath);
                    //debug.info(`[generator] ${ascii}`);

                    fs.appendFileSync(output, `// ${name} is generated from ${files[j]}\n`);
                    fs.appendFileSync(output, `\t${name} : \`\n${ascii}\`,`);

                    fs.appendFileSync(output, `\n`);
                }

                fs.appendFileSync(output, `}\n\nexport default ${folder}\n`);

                debug.ok(`finished generating ${folder} icons`);
            });
        }
    });
}
