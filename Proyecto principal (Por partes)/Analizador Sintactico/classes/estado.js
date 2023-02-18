import { ElementoPila } from "./elementoPila.js";

class Estado extends ElementoPila {

    constructor (elemento) {
        super();
        this.elemento = elemento || 0;
    }

    string() {
        return this.elemento.toString();
    }

    value() {
        return this.elemento;
    }
}

export {Estado};