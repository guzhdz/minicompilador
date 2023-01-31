class Sintactico {
    
    constructor(tLR) {
        this.pila = [];
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
        this.pila = [];
        this.pila.push("$");
        this.pila.push(0);
    }

    sigEntrada(tipo) {
        this.fila = this.pila[this.pila.length -1];
        this.columna = tipo;
        this.accion = this.tablaLR1[this.fila][this.columna];
    }

    sigAccion(simbolo) {
        if(this.accion > 0){
            this.pila.push(simbolo);
            this.pila.push(this.accion);
            return 1;

        } else if (this.accion < 0) {
            if(this.accion == -1) {
                return 4;
            }

            let idRegla = Math.abs(this.accion) -2;

            for (let i = 0; i < this.lonReglas[idRegla]; i++) {
                this.pila.pop();
            }

            this.fila = this.pila[this.pila.length - 1];
            this.columna = this.idReglas[idRegla];
            this.accion = this.tablaLR1[this.fila][this.columna];

            this.pila.push(this.simReglas[idRegla]);
            this.pila.push(this.accion);
            return 2;
            
        } else {
            return 3;
        }
    }
}

export { Sintactico };