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

const generarFilas = (simbolo, tipoS, tipo) => {
    let row = document.createElement("DIV");

    let column1 = document.createElement("DIV");
    let span1 = document.createElement("SPAN");
    column1.classList.add("column");
    span1.textContent = simbolo;
    column1.appendChild(span1);
    row.appendChild(column1);

    let column2 = document.createElement("DIV");
    let span2 = document.createElement("SPAN");
    column2.classList.add("column");
    span2.textContent = tipoS;
    column2.appendChild(span2);
    row.appendChild(column2);

    let column3 = document.createElement("DIV");
    let span3 = document.createElement("SPAN");
    column3.classList.add("column");
    span3.textContent = tipo;
    column3.appendChild(span3);
    row.appendChild(column3);

    row.classList.add("row", "row-content");

    return row;
}

let fuente = "";
const botonAnLexico = document.getElementById("boton-lexico");
botonAnLexico.addEventListener("click", () => {
    const input = document.getElementById("input-lexico");
    fuente = input.value;
    fuente = fuente.trim();

    let an = new Analizador(fuente);

    console.log("Resultado del analisis Lexico");

    if(fuente.length != 0) {
        console.log("Simbolo             Tipo           Id_tipo   ");
        
        let resultado = document.getElementById("resultado-lexico");
        let tabla = resultado.firstElementChild;
        let vacio = document.getElementById("vacio");
        vacio.classList.add("oculto");

        resultado.classList.remove("oculto");

        [...tabla.children].forEach(element => {
            if(element != tabla.firstElementChild) {
                tabla.removeChild(element);
            } 
        });

        while(!an.termina()) {
            console.log("entra");
            an.obtenerSimbolo();

            imprimirRubros(an.simbolo, an.tipoS, an.tipo);
            
            tabla.appendChild(generarFilas(an.simbolo, an.tipoS, an.tipo));
        }
    } else {
        console.log("Entrada vacia");
        let resultado = document.getElementById("resultado-lexico");
        resultado.classList.add("oculto");

        let vacio = document.getElementById("vacio");
        vacio.classList.remove("oculto");
    }
});
