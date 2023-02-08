import {Analizador} from './classes/analizador.js';
import { Sintactico } from './classes/sintactico.js';

const obtenerFuente = () => {
    const input = document.getElementById("input");
    let fuente = input.value;
    fuente = fuente.trim();
    return fuente;
}

const imprimirRubros = (columna1, columna2, columna3) => {
    for (let i = columna1.length; i < 30; i++) {
        columna1 += " ";
    }

    for (let i = columna2.length; i < 20; i++) {
        columna2 += " ";
    }

    console.log(columna1 + columna2 + columna3);
}

const generarFilasTabla = (columna1, columna2, columna3) => {
    let resultado = document.getElementById("resultado");
    let tabla = resultado.firstElementChild;

    let row = document.createElement("DIV");

    let column1 = document.createElement("DIV");
    let span1 = document.createElement("SPAN");
    column1.classList.add("column");
    span1.textContent = columna1;
    column1.appendChild(span1);
    row.appendChild(column1);

    let column2 = document.createElement("DIV");
    let span2 = document.createElement("SPAN");
    column2.classList.add("column");
    span2.textContent = columna2;
    column2.appendChild(span2);
    row.appendChild(column2);

    let column3 = document.createElement("DIV");
    let span3 = document.createElement("SPAN");
    column3.classList.add("column");
    span3.textContent = columna3;
    column3.appendChild(span3);
    row.appendChild(column3);

    row.classList.add("row", "row-content");

    tabla.appendChild(row);
}

const reiniciaTabla = () => {
    let resultado = document.getElementById("resultado");
    let tabla = resultado.firstElementChild;
    let vacio = document.getElementById("vacio");
    let mensaje = document.getElementById("mensaje-resultado");
    vacio.classList.add("oculto");
    mensaje.classList.add("oculto");
    

    resultado.classList.remove("oculto");

    [...tabla.children].forEach(element => {
        if(element != tabla.firstElementChild) {
            tabla.removeChild(element);
        } 
    });
}

const entradaVaciaMsj = () => {
    let resultado = document.getElementById("resultado");
    resultado.classList.add("oculto");

    let vacio = document.getElementById("vacio");
    vacio.classList.remove("oculto");
}

const resultadoMsj = (texto) => {
    let aceptacion = document.getElementById("mensaje-resultado");
    aceptacion.classList.remove("oculto");
    aceptacion.firstElementChild.textContent = texto;
}

const ejecutarAnalizador = (tablaLr) => {
    let fuente = "";
    fuente = obtenerFuente();
    let an = new Analizador(fuente);

    console.log("Resultado del analisis Sintactico");

    if(fuente.length != 0) {
        console.log("Pila                       Entrada                Accion   ");
        reiniciaTabla();

        let sint = new Sintactico(tablaLr);

        sint.inicializarPila();

        while(!an.termina()) {
            an.obtenerSimbolo();

            do {
                sint.sigEntrada(an.tipo);

                imprimirRubros(sint.pila.toString(), an.simbolo, sint.accion);
                generarFilasTabla(sint.pila.toString(), an.simbolo, sint.accion);
    
                let opcion = sint.sigAccion(an.simbolo);
    
                if(opcion == 2) {
                    imprimirRubros(sint.pila.toString(), an.simbolo, sint.accion);
                    generarFilasTabla(sint.pila.toString(), an.simbolo, sint.accion);
    
                } else if(opcion == 3) {
                    resultadoMsj("Error: Cadena Invalida");
                    console.log("Error");
                    an.caracter = "$";
                    break;
    
                } else if(opcion == 4) {
                    resultadoMsj("Aceptacion");
                    console.log("Aceptacion");
                    break;
                }                
            } while(an.simbolo == "$");
        }

    } else {
        console.log("Entrada vacia");
        entradaVaciaMsj();
    }
}

const botonAn1 = document.getElementById("boton1");
botonAn1.addEventListener("click", () => {
    ejecutarAnalizador(1);
});

const botonAn2 = document.getElementById("boton2");
botonAn2.addEventListener("click", () => {
    ejecutarAnalizador(2);
});
