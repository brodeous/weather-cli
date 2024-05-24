import { Pixel } from "./lib";

export const ANSI_ESCAPE_CLOSE = "\x1b[0m";
export const ANSI_ESCAPE_COLOR = "\x1b[38;2;";

export const rgbToAnsi = (pixel: Pixel) => {
    const {r, g, b, a} = pixel.color;
    let c = "";
    
    for (var i of [r, g, b]) {
        c += i;
        c += ";";
    }
    c = c.slice(0,-1);

    if (pixel.isTransparent()) {
        pixel.setANSI("");
    } else {
        pixel.setANSI(ANSI_ESCAPE_COLOR + c + "m");
    }
}
