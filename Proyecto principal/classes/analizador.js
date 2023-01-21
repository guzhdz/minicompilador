class Analizador {
    
    constructor(fuente) {
        this.fuente = fuente || "$";
        this.indice = 0;
        this.continua = true;
        this.caracter = "";
        this.simbolo = "";
        this.tipo = -1;
        this.tipoS = "";
        this.estado = 0;
    }

    reiniciar(fuente) {
        this.indice = 0;
        this.fuente = fuente;
        this.estado = 0;
    }
    
    //Automata
    obtenerSimbolo() {
        this.simbolo = "";
        this.continua = true;
        this.tipo = -1;
        this.tipoS = "";
        this.estado = 0;

        while(this.continua) {
            this.caracter = this.sigCaracter();
            switch (this.estado) {
                case 0:
                    if(this.esLetra()) {
                        this.estado = 1;
                        this.simbolo += this.caracter;
                        break;
                    }

                    if(this.esDigito) {
                        this.estado = 2;
                        this.simbolo += this.caracter;
                        break;
                    }

                    if(this.termina()) {
                        this.aceptacion(this.estado);
                        this.simbolo += this.caracter;
                        break;
                    }

                    /*if(espacio()) {
                        this.aceptacion(estado);
                        break;
                    }

                    if(termina()) {
                        this.estado = 20;
                        this.aceptacion(estado);
                        break;
                    }*/
                    break;

                case 1: 
                    if(this.esLetra() || this.esDigito()) {
                        this.simbolo += this.caracter;
                        break;
                    } else {
                        this.aceptacion(this.estado);
                        break;
                    }

                case 2: 
                    if(this.esDigito()) {
                        this.simbolo += this.caracter;
                        break;
                    } else if (this.caracter == "."){
                        this.estado = 3;
                        this.simbolo += this.caracter;
                        break;
                    } else {
                        this.aceptacion(this.estado);
                        break;
                    }

                case 3:
                    let num; 
                    if(this.esDigito()) {
                        this.simbolo += this.caracter;
                        break;
                    }
                    else if(this.termina()) {
                        num = this.indice - 1;
                    }
                    else {
                        num = this.indice -2;

                    }

                    if(this.fuente[num] == ".") {
                        this.estado = -1;
                    }
                    this.aceptacion(this.estado);
                    break;

                default:
                    /*this.estado = -1;
                    this.aceptacion(estado);*/
                    break;
            }
        }

        switch (this.estado) {
            case -1:
                this.tipo = -1;
                this.tipoS = "Error"
                break;

            case 0:
                this.tipo = 100;
                this.tipoS = "Vacio";
                break;

            case 1:
                this.tipo = 0;
                this.tipoS = "Id";
                break;

            case 2:
                this.tipo = 1;
                this.tipoS = "Entero";
                break;

            case 3:
                this.tipo = 2;
                this.tipoS = "Real";
                break;
        
            default:
                break;
        }
    }

    sigCaracter () {
        if(this.indice == this.fuente.length) {
            return "$";
        }      
        return this.fuente[this.indice++];
    }


    esLetra() {
        if (this.caracter.match(/[a-z]/i)) {
            return true;
        }
        return false;
    }

    esDigito() {
        if (this.caracter.match(/[0-9]/)) {
            return true;
        }
        
        return false;
    }

    espacio() {
        return this.caracter == " ";
    }

    termina() {
        return this.caracter == "$";
    }

    aceptacion(estado) {
        this.continua = false;
    }

}

export { Analizador };