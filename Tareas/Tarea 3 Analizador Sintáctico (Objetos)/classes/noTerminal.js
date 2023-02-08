import { ElementoPila } from "./elementoPila.js";

class NoTerminal extends ElementoPila {

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

export {NoTerminal};