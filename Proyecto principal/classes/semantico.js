import { TablaSimbolos, ElementoTabla, Variable, Funcion, Parametro} from "./tablaSimbolos.js";
import { Otro, R21, R22, R23, R24, R25, R35, R36, R37, R38, R39, R43, R44, R45, R46, R47, R48, R49, R50, R51, R52 } from "./Tree/reglasClasses.js";

class Semantico {
    constructor(arbol) {
        this.arbol = arbol;
        this.tablaSimbolos = new TablaSimbolos();
        this.valido = true;
        this.error = "";
    }

    analisis() {
        this.arbol.raiz.forEach(rama => {
            this.siguienteNodo(rama, "*");
        });
    }

    siguienteNodo(rama, ambito) {
        if(this.valido != false) {
            //console.log(rama.simbolo);
            if(rama.simbolo == "DefFunc") {
                ambito = rama.ramas[1].simbolo;
            }
            this.casoEspecial(rama, ambito);

            if(rama.simbolo == "Sentencia") {
                this.analizarSentencia(rama, ambito);
            }
        
            rama.ramas.forEach(subrama => {
                this.siguienteNodo(subrama, ambito);
            });
        }
    }

    casoEspecial(rama, ambito) {
        if(rama.simbolo == "DefVar") {
            let tipo = rama.ramas[0].simbolo;
            let simbolo = rama.ramas[1].simbolo;
            let encontrado = this.tablaSimbolos.listaVariables.find(variable => 
                variable.simbolo == simbolo && (variable.ambito == ambito || variable.ambito == "*"));
            if(encontrado) {
                this.valido = false;
                this.error = "Error: Declaracion de variable" + simbolo + " repetida";
            }

            if(ambito != "*") {
                let funcion = this.tablaSimbolos.listaFunciones.find(funcion => funcion.simbolo == ambito);
                let param = false;
                funcion.parametros.forEach(element => {
                    if(element.simbolo == simbolo)
                        param = true;
                });
                if(param) {
                    this.valido = false;
                    this.error = "Error: Declaracion de variable" + simbolo + " repetida";
                }
                    
            }
            this.tablaSimbolos.agregarVariable(tipo, simbolo, ambito);

        } else if(rama.simbolo == "ListaVar") {
            if(rama.ramas.length != 0) {
                let tipo = this.tablaSimbolos.variablesLast().tipo;
                let simbolo = rama.ramas[1].simbolo;
                let encontrado = this.tablaSimbolos.listaVariables.find(variable => 
                    variable.simbolo == simbolo && (variable.ambito == ambito || variable.ambito == "*"));
                if(encontrado) {
                    this.valido = false;
                    this.error = "Error: Declaracion de variable" + simbolo + " repetida";
                }

                if(ambito != "*") {
                    let funcion = this.tablaSimbolos.listaFunciones.find(funcion => funcion.simbolo == ambito);
                    let param = false;
                    funcion.parametros.forEach(element => {
                        if(element.simbolo == simbolo)
                            param = true;
                        });
                    if(param) {
                        this.valido = false;
                        this.error = "Error: Declaracion de variable" + simbolo + " repetida";
                    }
                }
                this.tablaSimbolos.agregarVariable(tipo, simbolo, ambito);
            }

        } else if(rama.simbolo == "DefFunc") {
            let tipo = rama.ramas[0].simbolo;
            let simbolo = rama.ramas[1].simbolo;
            let funcion = this.tablaSimbolos.listaFunciones.find(funcion => funcion.simbolo == simbolo);
            if(funcion) {
                this.valido = false;
                this.error = "Error: Declaracion de funcion" + simbolo + " repetida";
            }
            this.tablaSimbolos.agregarFuncion(tipo, simbolo, []);

        } else if(rama.simbolo == "Parametros") {
            if(rama.ramas.length != 0) {
                let tipo = rama.ramas[0].simbolo;
                let simbolo = rama.ramas[1].simbolo;
                let parametro = new Parametro(tipo, simbolo);
                let funcion =  this.tablaSimbolos.funcionesLast();
                let encontrado = false;
                funcion.parametros.forEach(element => {
                    if(element.simbolo == simbolo)
                        encontrado = true;
                });
                if(encontrado) {
                    this.valido = false;
                    this.error = "Error: Declaracion de parametro" + simbolo + " repetida";
                }
                let vari = this.tablaSimbolos.listaVariables.find(variable => 
                    variable.simbolo == simbolo && variable.ambito == "*");
                if(vari) {
                    this.valido = false;
                    this.error = "Error: Declaracion de variable" + simbolo + " repetida";
                }
                this.tablaSimbolos.funcionesLast().parametros.push(parametro);
            }

        } else if(rama.simbolo == "ListaParam") {
            if(rama.ramas.length != 0) {
                let tipo = rama.ramas[1].simbolo;
                let simbolo = rama.ramas[2].simbolo;
                let parametro = new Parametro(tipo, simbolo);
                let funcion =  this.tablaSimbolos.funcionesLast();
                let encontrado = false;
                funcion.parametros.forEach(element => {
                    if(element.simbolo == simbolo)
                        encontrado = true;
                });
                if(encontrado) {
                    this.valido = false;
                    this.error = "Error: Declaracion de parametro" + simbolo + " repetida";
                }
                let vari = this.tablaSimbolos.listaVariables.find(variable => 
                    variable.simbolo == simbolo && variable.ambito == "*");
                if(vari) {
                    this.valido = false;
                    this.error = "Error: Declaracion de variable" + simbolo + " repetida";
                }
                this.tablaSimbolos.funcionesLast().parametros.push(parametro);
            }
        }
    }

    analizarSentencia(rama, ambito) {
        if(rama instanceof R21) {
            let id = rama.ramas[0].simbolo;
            let encontrado = this.tablaSimbolos.listaVariables.find(variable => 
                variable.simbolo == id && (variable.ambito == ambito || variable.ambito == "*"));
            if(encontrado) {
                let expresion = this.analizarExpresion(rama.ramas[2], ambito);
                if(encontrado.tipo == expresion)
                    return expresion;
                else {
                    if(expresion != "undefined")
                        this.error = "Error: No se puede asignar un " + expresion 
                        + " a un " + encontrado.tipo; 
                    this.valido = false;
                    return "undefined";
                }
                    
            } else {
                let funcion = this.tablaSimbolos.listaFunciones.find(funcion => funcion.simbolo == ambito);
                if(funcion) {
                    for (let i = 0; i < funcion.parametros.length; i++) {
                        if(funcion.parametros[i].simbolo == id) {
                            let expresion = this.analizarExpresion(rama.ramas[2], ambito);
                            if(funcion.parametros[i].tipo == expresion)
                                return expresion;
                            else {
                                this.valido = false;
                                if(expresion != "undefined")
                                    this.error = "Error: No se puede asignar un " + expresion 
                                    + " a un " + funcion.parametros[i].tipo; 
                                return "undefined";
                            }
                        } 
                    }
                }
                this.valido = false;
                this.error = "Error: La variable " + id + " no esta definida";
                return "undefined";
            }

        } else if(rama instanceof R22 || rama instanceof R23) {
            return this.analizarExpresion(rama.ramas[2], ambito);
        }
            
        else if(rama instanceof R24) {
            if(rama.ramas[1].ramas.length == 0) {
                let funcion = this.tablaSimbolos.listaFunciones.find(funcion => funcion.simbolo == ambito);
                if(funcion.tipo == "void")
                    return "void";
                else {
                    this.valido = false;
                    this.error = "Error: La funcion " + funcion.simbolo + " debe regresar un valor";
                    return "undefined";
                }
            } else {
                let tipo = this.analizarExpresion(rama.ramas[1].ramas[0], ambito);
                let funcion = this.tablaSimbolos.listaFunciones.find(funcion => funcion.simbolo == ambito);
                if(funcion.tipo == tipo)
                    return tipo;
                else {
                    this.valido = false;
                    if(tipo != "undefined")
                        this.error = "Error: La funcion " + funcion.simbolo 
                        + " debe regresar un valor de tipo " + funcion.tipo;
                    return "undefined";
                }
            }
        } else if(rama instanceof R25) {
            return this.analizarLlamadaFunc(rama.ramas[0], ambito);
        }
    }

    analizarTermino(rama, ambito) {
        if(rama instanceof R35) {
            return this.analizarLlamadaFunc(rama.ramas[0], ambito);
        }

        else if(rama instanceof R36) {
            let id = rama.ramas[0].simbolo;
            let encontrado = this.tablaSimbolos.listaVariables.find(variable => 
                variable.simbolo == id && (variable.ambito == ambito || variable.ambito == "*"));
            if(encontrado)
                return encontrado.tipo;
            else {
                let funcion = this.tablaSimbolos.listaFunciones.find(funcion => funcion.simbolo == ambito);
                if(funcion) {
                    for (let i = 0; i < funcion.parametros.length; i++) {
                        if(funcion.parametros[i].simbolo == id)
                            return funcion.parametros[i].tipo;
                    }
                }
                this.valido = false;
                this.error = "Error: La variable " + id + " no esta definida";
                return "undefined";
            }
        }

        else if(rama instanceof R37)
            return "int";

        else if(rama instanceof R38)
            return "float";

        else if(rama instanceof R39)
            return "char";
    }

    analizarExpresion(rama, ambito) {
        if(rama instanceof R43) 
            return this.analizarExpresion(rama.ramas[1], ambito);

        else if(rama instanceof R44) 
            return this.analizarExpresion(rama.ramas[1], ambito);
        
        else if(rama instanceof R45)
            return this.analizarExpresion(rama.ramas[1], ambito);
            
        else if(rama instanceof R46 || rama instanceof R47 || rama instanceof R48
            || rama instanceof R49 || rama instanceof R50 || rama instanceof R51) {
            let tipo1 = this.analizarExpresion(rama.ramas[0], ambito);
            let tipo2 = this.analizarExpresion(rama.ramas[2], ambito);

            if(tipo1 == tipo2)
                return tipo1;
            else {
                this.valido = false;
                this.error = "Error: No se pueden realizar operaciones entre los tipos: " + tipo1 + ", " + tipo2;
                return "undefined";
            }
        } else if(rama instanceof R52)
            return this.analizarTermino(rama.ramas[0], ambito);
    }

    analizarLlamadaFunc(rama, ambito) {
        let id = rama.ramas[0].simbolo;
        let funcion = this.tablaSimbolos.listaFunciones.find(funcion => funcion.simbolo == id);
        if(funcion) {
            let listaArgumentos = this.analizarArgumentos(rama.ramas[2], ambito);
            if(listaArgumentos.length == funcion.parametros.length) {
                for (let i = 0; i < listaArgumentos.length; i++) {
                    if(funcion.parametros[i].tipo != listaArgumentos[i]) {
                        this.valido = false;
                        this.error = "Error: No coinciden los tipos de los argumentos en la llamada de funcion de " 
                        + funcion;
                        return "undefined";
                    }   
                }
                return funcion.tipo;
            } else {
                this.valido = false;
                this.error = "Error: No coinciden los argumentos en la llamada de funcion de " 
                + funcion;
                return "undefined";
            }

        } else {
            this.valido = false;
            this.error = "Error: La funcion " + id + " no esta declarada";
            return "undefined";
        } 
    }

    analizarArgumentos(argumentos, ambito) {
        let listaArgumentos = [];
        if(argumentos.ramas.length != 0) {
            let i = 0;
            if(argumentos.ramas[0] instanceof Otro)
                i++;

            let expresion = this.analizarExpresion(argumentos.ramas[i], ambito);
            listaArgumentos.unshift(expresion);
            listaArgumentos = [...listaArgumentos, ...this.analizarArgumentos(argumentos.ramas[i + 1], ambito)]
        }
        return listaArgumentos;
    }
}

export {Semantico};