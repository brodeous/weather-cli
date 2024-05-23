import fs from "fs";
import Canvas from "canvas";
import * as debug from "../logger.js";

const MAX_HEIGHT = 40;
const MAX_WIDTH = 40;
const fontRatio = 2.0;

const characters = "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\|()1{}[]?-_+~<>i!lI;:,'^`'. ";
const reverse_characters = characters.split("").reverse().join("");

const toGrayScale = (r:number, g:number, b:number) => 0.21*r + 0.72*g + 0.07*b;

const getCharacter = (grayscale: number) => reverse_characters[Math.ceil(((characters.length - 1) * grayscale) / 255)];

const convertToGrayScale = (context: any, width: number, height: number) => {
    const imgData = context.getImageData(0, 0, width, height);

    const grayscales = [];
    
    for (let idx = 0; idx < imgData.data.length; idx+=4) {
        
        // grab rgb values from image data
        const r = imgData.data[idx];
        const g = imgData.data[idx + 1];
        const b = imgData.data[idx + 2];

        // convert rgb values to grayscale
        const grayscale = toGrayScale(r, g, b);

        grayscales.push(grayscale);
    }
    return grayscales;
};

const drawAscii = (grayscales: number[], width: number) => {
    const ascii = grayscales.reduce((asciiImg, grayscale, index) => {
        let nextChar = getCharacter(grayscale);

        // reached max width
        if ((index + 1) % width === 0) {
            nextChar += "\n";
        }

        return asciiImg + nextChar;
    }, "");

    return ascii;
};

const cropDimensions = (width: number, height: number) => {
    const rectifiedWidth = Math.floor(fontRatio * width);
    
    if (width > MAX_WIDTH) {
        const reducedHeight = Math.floor(height * MAX_WIDTH) / rectifiedWidth;
        return [MAX_WIDTH, reducedHeight];
    }

    if (height > MAX_HEIGHT) {
        const reducedWidth = Math.floor(rectifiedWidth * MAX_HEIGHT) / height;
        return [reducedWidth, MAX_HEIGHT];
    }

    return [width, height];
};

export const convertToAscii = async (filename: string): Promise<string> => {
    try {
        const data = fs.readFileSync(filename);

        const img = await Canvas.loadImage(data);
        const canvas = Canvas.createCanvas(img.width, img.height);
        const ctx = canvas.getContext('2d');

        // resize image
        const [width, height] = cropDimensions(img.width, img.height);

        ctx.drawImage(img, 0, 0, width, height);

        const grayscales = convertToGrayScale(ctx, width, height);

        const ascii = drawAscii(grayscales, width);

        return ascii;
    } catch (e) {
        throw e;
    }
};
