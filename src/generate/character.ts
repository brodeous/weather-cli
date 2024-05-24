import { Pixel } from "./lib";

const characters = "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\|()1{}[]?-_+~<>i!lI;:,'^`'. ";
const reverse_characters = characters.split("").reverse().join("");

const toGrayScale = (r:number, g:number, b:number) => 0.21*r + 0.72*g + 0.07*b;

const getCharacter = (grayscale: number) => reverse_characters[Math.ceil(((characters.length - 1) * grayscale) / 255)];

export const rgbToAscii = (pixel: Pixel) => {
    const grayscale = toGrayScale(pixel.color.r, pixel.color.g, pixel.color.b);
    const char = (pixel.color.a > 120) ? getCharacter(grayscale) : " ";
    pixel.setChar(char);
}
