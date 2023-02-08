import { Pila } from './pila.js';
class Sintactico {
    
    constructor(tLR) {
        this.pila = new Pila();
        this.fila = 0;
        this.columna = 0;
        this.accion = 0;

        switch(tLR) {
            case 1:
                this.tablaLR1 = [[2, 0, 0, 1], 
                                [0, 0, -1, 0], 
                                [0, 3, 0, 0], 
                                [4, 0, 0, 0], 
                                [0, 0, -2, 0]];
                this.idReglas = [3];
                this.lonReglas = [6];
                this.simReglas = ["E"];
                break;

            case 2:
                this.tablaLR1 = [[2, 0, 0, 1], 
                                [0, 0, -1, 0], 
                                [0, 3, -3, 0], 
                                [2, 0, 0, 4], 
                                [0, 0, -2, 0]];
                this.idReglas = [3, 3];
                this.lonReglas = [6, 2];
                this.simReglas = ["E", "E"];
                break;

            default:
                this.tablaLR1 = [[2, 0, 0, 1], 
                                [0, 0, -1, 0], 
                                [0, 3, 0, 0], 
                                [4, 0, 0, 0], 
                                [0, 0, -2, 0]];
                this.idReglas = [2];
                this.lonReglas = [6];
                this.simReglas = ["E"];                                
                break;
        }
    }

    inicializarPila() {
        this.pila.vaciar;
        this.pila.push("$", 1);
        this.pila.push(0, 3);
    }

    sigEntrada(tipo) {
        this.fila = this.pila.front();
        this.columna = tipo;
        this.accion = this.tablaLR1[this.fila][this.columna];
    }

    sigAccion(simbolo) {
        if(this.accion > 0){
            this.pila.push(simbolo, 1);
            this.pila.push(this.accion, 3);
            return 1;

        } else if (this.accion < 0) {
            if(this.accion == -1) {
                return 4;
            }

            let idRegla = Math.abs(this.accion) -2;

            for (let i = 0; i < this.lonReglas[idRegla]; i++) {
                this.pila.pop();
            }

            this.fila = this.pila.front();
            this.columna = this.idReglas[idRegla];
            this.accion = this.tablaLR1[this.fila][this.columna];

            this.pila.push(this.simReglas[idRegla], 2);
            this.pila.push(this.accion, 3);
            return 2;
            
        } else {
            return 3;
        }
    }
}

export { Sintactico };