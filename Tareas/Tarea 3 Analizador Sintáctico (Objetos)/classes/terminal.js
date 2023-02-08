import { ElementoPila } from "./elementoPila.js";

class Terminal extends ElementoPila {

    constructor (elemento) {
        super();
        this.elemento = elemento || "";
    }

    string() {
        return this.elemento;
    }

    value() {
        return this.elemento;
    }
}

export {Terminal};