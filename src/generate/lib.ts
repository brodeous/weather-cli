export type RGBA = {
    r: number,
    g: number,
    b: number,
    a: number,
}

export class Pixel {
    color: RGBA;
    #char: string;
    #ansi: string;
    #transparent: boolean;
    
    constructor(color: RGBA) {
        this.color = color;
        this.#char = ""; 
        this.#ansi = "";
        this.#transparent = false;
    }

    setChar(char: string) {
        this.#char = char;
    }

    setANSI(ansi: string) {
        this.#ansi = ansi;
    }
    setTransparent(b: boolean) {
        this.#transparent = b;
    }
    
    getChar = () => this.#char;
    getANSI = () => this.#ansi;
    isTransparent = () => this.#transparent;
}
