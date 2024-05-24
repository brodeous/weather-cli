import fs from "fs";
import Canvas from "canvas";
import { RGBA, Pixel } from "./lib.js";
import * as debug from "../logger.js";
import { rgbToAscii } from "./character.js";
import { ANSI_ESCAPE_CLOSE, rgbToAnsi } from "./color.js";

const MAX_HEIGHT = 55;
const MAX_WIDTH = 55;
const fontRatio = 2.0;

const getPixelData = (context: any, width: number, height: number) => {
    const imgData = context.getImageData(0, 0, width, height);

    const pixels = [];
    
    for (let idx = 0; idx < imgData.data.length; idx+=4) {
        
        // grab rgb values from image data
        const r = imgData.data[idx];        // red
        const g = imgData.data[idx + 1];    // green
        const b = imgData.data[idx + 2];    // blue
        const a = imgData.data[idx + 3];    // alpha

        // convert rgb values to grayscale
        const pixel = new Pixel({ r, g, b, a});
        if (a < 120) {
            pixel.setTransparent(true);
        }
        rgbToAscii(pixel);
        rgbToAnsi(pixel);

        pixels.push(pixel);
    }
    return pixels;
};

const drawAscii = (pixels: Pixel[], width: number) => {
    let ascii = pixels.reduce((asciiImg, pixel, index) => {
        let nextChar = pixel.getANSI() + pixel.getChar();

        // reached max width
        if ((index + 1) % width === 0) {
            nextChar += "\n";
        }

        return asciiImg + nextChar;
    }, "");
    // add ansi close
    ascii += ANSI_ESCAPE_CLOSE;
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

export const convertToAscii = async (url: string): Promise<string> => {
    try {
        const img = await Canvas.loadImage(url);
        const canvas = Canvas.createCanvas(img.width, img.height);
        const ctx = canvas.getContext('2d');

        // resize image
        const [width, height] = cropDimensions(img.width, img.height);

        ctx.drawImage(img, 0, 0, width, height);

        const pixels = getPixelData(ctx, width, height);

        const ascii = drawAscii(pixels, width);

        return ascii;
    } catch (e) {
        throw e;
    }
};
