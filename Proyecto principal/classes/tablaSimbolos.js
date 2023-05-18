 export class TablaSimbolos {
    constructor() {
        this.listaFunciones = [];
        this.listaVariables = [];
    }

    agregarVariable(tipo, simbolo, ambito) {
        let nuevaVariable = new Variable(tipo, simbolo, ambito);
        this.listaVariables.push(nuevaVariable);
    }

    agregarFuncion(tipo, simbolo, parametros) {
        let nuevaFuncion = new Funcion(tipo, simbolo, parametros);
        this.listaFunciones.push(nuevaFuncion);
    }

    variablesLast() {
        return this.listaVariables[this.listaVariables.length - 1];
    }

    funcionesLast() {
        return this.listaFunciones[this.listaFunciones.length - 1];
    }
}

export class ElementoTabla {
    constructor(tipo, simbolo) {
        this.tipo = tipo;
        this.simbolo = simbolo;
    }
}

export class Funcion extends ElementoTabla {
    constructor(tipo, simbolo, parametros) {
        super(tipo, simbolo);
        this.parametros = parametros;
    }
}

export class Variable extends ElementoTabla {
    constructor(tipo, simbolo, ambito) {
        super(tipo, simbolo);
        this.ambito = ambito;
    }
}

export class Parametro {
    constructor(tipo, simbolo) {
        this.tipo = tipo;
        this.simbolo = simbolo;
    }
}