const DATA_START = 6;

const display = (a: string, d: string) => {
    const ascii = a.split('\n');
    const data = d.split('\n');

    let j = 0;
    for (let i = 0; i < ascii.length; i++) {
        let output = ascii[i];
        if (i >= DATA_START && j < data.length) {
            output += data[j];
            j++;
        }
        console.log(output);
    }
}

export default display;
