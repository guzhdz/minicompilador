import {Analizador} from './classes/analizador.js';

const imprimirRubros = (simbolo, tipoS, tipo) => {
    for (let i = simbolo.length; i < 20; i++) {
        simbolo += " ";
    }

    for (let i = tipoS.length; i < 15; i++) {
        tipoS += " ";
    }

    console.log(simbolo + tipoS + tipo);
}

let fuente = "-{}while , casa*int 39.1 120";
let an = new Analizador(fuente);

console.log("Resultado del analisis Lexico");
if(fuente.length != 0) {
    console.log("Simbolo             Tipo           Id_tipo   ");

    an.obtenerSimbolo();

    while(an.simbolo != "%%") {
        imprimirRubros(an.simbolo, an.tipoS, an.tipo);
        an.obtenerSimbolo();
    }
} else {
    console.log("Entrada vacia");
}

