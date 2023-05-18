import { Otro, R21, R22, R23, R24, R25, R35, R36, R37, R38, R39, R43, R44, R45, R46, R47, R48, R49, R50, R51, R52 } from "./Tree/reglasClasses.js";

class GenCode {
    constructor(arbol) {
        this.arbol = arbol;
        this.codigoRes = [];
        this.auxTipo = "int";
        this.globales = [];
        this.contadorOP = 0;
        this.contadorARG = 0;
        this.contadorIf = 0;
        this.contadorWhile = 0;
        this.variables = [];
    }

    generarCodigo() {
        this.declaracionCodigo();
        return this.crearDocumento();
    }

    declaracionCodigo() {
        this.codigoRes.push(".MODEL SMALL\n.STACK 100H\n.DATA\n");

        this.codigoRes.push("\n\n");
        this.codigoRes.push("RESGEN DW ?\n");
        this.codigoRes.push("RESFUN DW ?\n");
        this.codigoRes.push("RESIMP DW ?\n");
        this.codigoRes.push("NUMIMP DW ?\n");
        this.codigoRes.push("RES DW 100 DUP(0)\n");
        this.codigoRes.push("ARG DW 100 DUP(0)\n");
        this.codigoRes.push("CONT DW 0\n");
        this.arbol.raiz.forEach(rama => {
            this.obtenerVariables(rama, "*");
        });

        this.codigoRes.push("\n\n");
        this.agregarMetodosBasicos();
        this.arbol.raiz.forEach(rama => {
            this.obtenerFunciones(rama, "*");
        });

        this.agregarCodigoBase();
    }

    obtenerVariables(rama, ambito) {
        if(rama.simbolo == "DefVar") {
            let tipo = rama.ramas[0].simbolo;
            let id = rama.ramas[1].simbolo;
            this.tipo = tipo;
            this.agregarVariable(tipo, id, ambito);
        }

        if(rama.simbolo == "ListaVar") {
            if(rama.ramas.length != 0) {
                let tipo = this.tipo;
                let id = rama.ramas[1].simbolo;
                this.agregarVariable(tipo, id, ambito);
            }
        }

        if(rama.simbolo == "DefFunc") {
            ambito = rama.ramas[1].simbolo;
        }

        rama.ramas.forEach(subrama => {
            this.obtenerVariables(subrama, ambito);
        });
    }

    agregarVariable(tipo, id, ambito) {
        if(ambito == "*") {
            this.codigoRes.push(id + "0");
            this.globales.push(id);
        } else {
            this.codigoRes.push(id + ambito);
        }

        if(tipo == "int") {
            this.codigoRes.push(" DW ?\n");
        } else if(tipo == "float") {
            this.codigoRes.push(" Dw ?\n");
        } else if(tipo == "void") {
            this.codigoRes.push(" DW 0\n");
        } else if(tipo == "char") {
            this.codigoRes.push(" DW ?\n");
        }

        let variable = {
            tipo: tipo,
            id: id,
            ambito: ambito
        }
        this.variables.push(variable);
    }

    agregarMetodosBasicos() {
        this.codigoRes.push("MENORVAR MACRO NUM1, NUM2" + "\n");
        this.codigoRes.push("LOCAL ESMAYOR1" + "\n");
        this.codigoRes.push("LOCAL ESMENOR1" + "\n");
        this.codigoRes.push("LOCAL SALIR1" + "\n");
        this.codigoRes.push("MOV AX, NUM1" + "\n");
        this.codigoRes.push("MOV BX, NUM2" + "\n");
        this.codigoRes.push("CMP AX, BX" + "\n");
        this.codigoRes.push("JA ESMAYOR1" + "\n");
        this.codigoRes.push("JB ESMENOR1" + "\n");
        this.codigoRes.push("JE ESMAYOR1" + "\n\n");
        this.codigoRes.push("ESMAYOR1:" + "\n");
        this.codigoRes.push("MOV RESGEN, 0" + "\n");
        this.codigoRes.push("JMP SALIR1" + "\n\n");
        this.codigoRes.push("ESMENOR1:" + "\n");
        this.codigoRes.push("MOV RESGEN, 1" + "\n");
        this.codigoRes.push("JMP SALIR1" + "\n");
        this.codigoRes.push("SALIR1:" + "\n");
        this.codigoRes.push("ENDM" + "\n");
        this.codigoRes.push("\n");

        this.codigoRes.push("MAYORVAR MACRO NUM1, NUM2" + "\n");
        this.codigoRes.push("LOCAL ESMAYOR2" + "\n");
        this.codigoRes.push("LOCAL ESMENOR2" + "\n");
        this.codigoRes.push("LOCAL SALIR2" + "\n");
        this.codigoRes.push("MOV AX, NUM1" + "\n");
        this.codigoRes.push("MOV BX, NUM2" + "\n");
        this.codigoRes.push("CMP AX, BX" + "\n");
        this.codigoRes.push("JA ESMAYOR2" + "\n");
        this.codigoRes.push("JB ESMENOR2" + "\n");
        this.codigoRes.push("JE ESMENOR2" + "\n\n");
        this.codigoRes.push("ESMAYOR2:" + "\n");
        this.codigoRes.push("MOV RESGEN, 1" + "\n");
        this.codigoRes.push("JMP SALIR2" + "\n\n");
        this.codigoRes.push("ESMENOR2:" + "\n");
        this.codigoRes.push("MOV RESGEN, 0" + "\n");
        this.codigoRes.push("JMP SALIR2" + "\n");
        this.codigoRes.push("SALIR2:" + "\n");
        this.codigoRes.push("ENDM" + "\n");
        this.codigoRes.push("\n");

        this.codigoRes.push("MAYORIGUALVAR MACRO NUM1, NUM2" + "\n");
        this.codigoRes.push("LOCAL ESMAYOR3" + "\n");
        this.codigoRes.push("LOCAL ESMENOR3" + "\n");
        this.codigoRes.push("LOCAL SALIR3:" + "\n");
        this.codigoRes.push("MOV AX, NUM1" + "\n");
        this.codigoRes.push("MOV BX, NUM2" + "\n");
        this.codigoRes.push("CMP AX, BX" + "\n");
        this.codigoRes.push("JA ESMAYOR3" + "\n");
        this.codigoRes.push("JB ESMENOR3" + "\n");
        this.codigoRes.push("JE ESMAYOR3" + "\n\n");
        this.codigoRes.push("ESMAYOR3:" + "\n");
        this.codigoRes.push("MOV RESGEN, 1" + "\n");
        this.codigoRes.push("JMP SALIR3" + "\n\n");
        this.codigoRes.push("ESMENOR3:" + "\n");
        this.codigoRes.push("MOV RESGEN, 0" + "\n");
        this.codigoRes.push("JMP SALIR3" + "\n");
        this.codigoRes.push("SALIR3:" + "\n");
        this.codigoRes.push("ENDM" + "\n");
        this.codigoRes.push("\n");

        this.codigoRes.push("MENORIGUALVAR MACRO NUM1, NUM2" + "\n");
        this.codigoRes.push("LOCAL ESMAYOR4" + "\n");
        this.codigoRes.push("LOCAL ESMENOR4" + "\n");
        this.codigoRes.push("LOCAL SALIR4" + "\n");
        this.codigoRes.push("MOV AX, NUM1" + "\n");
        this.codigoRes.push("MOV BX, NUM2" + "\n");
        this.codigoRes.push("CMP AX, BX" + "\n");
        this.codigoRes.push("JA ESMAYOR4" + "\n");
        this.codigoRes.push("JB ESMENOR4" + "\n");
        this.codigoRes.push("JE ESMENOR4" + "\n\n");
        this.codigoRes.push("ESMAYOR4:" + "\n");
        this.codigoRes.push("MOV RESGEN, 0" + "\n");
        this.codigoRes.push("JMP SALIR4" + "\n\n");
        this.codigoRes.push("ESMENOR4:" + "\n");
        this.codigoRes.push("MOV RESGEN, 1" + "\n");
        this.codigoRes.push("JMP SALIR4" + "\n");
        this.codigoRes.push("SALIR4:" + "\n");
        this.codigoRes.push("ENDM" + "\n");
        this.codigoRes.push("\n");

        this.codigoRes.push("IGUALVAR MACRO NUM1, NUM2" + "\n");
        this.codigoRes.push("LOCAL ESIGUAL1" + "\n");
        this.codigoRes.push("LOCAL SALIR5" + "\n");
        this.codigoRes.push("MOV AX, NUM1" + "\n");
        this.codigoRes.push("MOV BX, NUM2" + "\n");
        this.codigoRes.push("CMP AX, BX" + "\n");
        this.codigoRes.push("JE ESIGUAL1" + "\n");
        this.codigoRes.push("MOV RESGEN, 0" + "\n");
        this.codigoRes.push("JMP SALIR5" + "\n\n");
        this.codigoRes.push("ESIGUAL1:" + "\n");
        this.codigoRes.push("MOV RESGEN, 1" + "\n");
        this.codigoRes.push("JMP SALIR5" + "\n");
        this.codigoRes.push("SALIR5:" + "\n");
        this.codigoRes.push("ENDM" + "\n");
        this.codigoRes.push("\n");

        this.codigoRes.push("NOIGUALVAR MACRO NUM1, NUM2" + "\n");
        this.codigoRes.push("LOCAL ESIGUAL2" + "\n");
        this.codigoRes.push("LOCAL SALIR6" + "\n");
        this.codigoRes.push("MOV AX, NUM1" + "\n");
        this.codigoRes.push("MOV BX, NUM2" + "\n");
        this.codigoRes.push("CMP AX, BX" + "\n");
        this.codigoRes.push("JE ESIGUAL2" + "\n");
        this.codigoRes.push("MOV RESGEN, 1" + "\n");
        this.codigoRes.push("JMP SALIR6" + "\n\n");
        this.codigoRes.push("ESIGUAL2:" + "\n");
        this.codigoRes.push("MOV RESGEN, 0" + "\n");
        this.codigoRes.push("JMP SALIR6" + "\n");
        this.codigoRes.push("SALIR6:" + "\n");
        this.codigoRes.push("ENDM" + "\n");
        this.codigoRes.push("\n");

        this.codigoRes.push("IMPNUM MACRO NUM1" + "\n");
        this.codigoRes.push("MOV DL, NUM1" + "\n");
        this.codigoRes.push("MOV AH, 02H" + "\n");
        this.codigoRes.push("ADD DL, 30H" + "\n");
        this.codigoRes.push("INT 21H" + "\n");
        this.codigoRes.push("ENDM" + "\n");
        this.codigoRes.push("\n");

        this.codigoRes.push("IMPCHAR MACRO CHAR" + "\n");
        this.codigoRes.push("MOV DL, CHAR" + "\n");
        this.codigoRes.push("MOV AH, 02H" + "\n");
        this.codigoRes.push("INT 21H" + "\n");
        this.codigoRes.push("ENDM" + "\n");
        this.codigoRes.push("\n");

        this.codigoRes.push("IMPRIMIRCHAR MACRO CHAR1" + "\n");
        this.codigoRes.push("MOV AX, CHAR1" + "\n");
        this.codigoRes.push("MOV DL, AH" + "\n");
        this.codigoRes.push("MOV AH, 02H" + "\n");
        this.codigoRes.push("INT 21H" + "\n");
        this.codigoRes.push("MOV AX, CHAR1" + "\n");
        this.codigoRes.push("MOV DL, AL" + "\n");
        this.codigoRes.push("MOV AH, 02H" + "\n");
        this.codigoRes.push("INT 21H" + "\n");
        this.codigoRes.push("IMPCHAR 0AH" + "\n");
        this.codigoRes.push("IMPCHAR 0DH" + "\n");
        this.codigoRes.push("ENDM" + "\n");
        this.codigoRes.push("\n");

        this.codigoRes.push("IMPRIMIRINT MACRO NUM1" + "\n");
        this.codigoRes.push("MOV AX, NUM1" + "\n");
        this.codigoRes.push("MOV NUMIMP, AX" + "\n");
        this.codigoRes.push("MOV DX, 0" + "\n");
        this.codigoRes.push("MOV AX, NUMIMP" + "\n");
        this.codigoRes.push("MOV BX, 10000" + "\n");
        this.codigoRes.push("DIV BX" + "\n");
        this.codigoRes.push("MOV RESIMP, AX" + "\n");
        this.codigoRes.push("IMPNUM AL" + "\n");
        this.codigoRes.push("MOV AX, RESIMP" + "\n");
        this.codigoRes.push("MOV BX, 10000" + "\n");
        this.codigoRes.push("MUL BX" + "\n");
        this.codigoRes.push("MOV BX, AX" + "\n");
        this.codigoRes.push("MOV AX, NUMIMP" + "\n");
        this.codigoRes.push("SUB AX, BX" + "\n");
        this.codigoRes.push("MOV NUMIMP, AX" + "\n");

        this.codigoRes.push("MOV DX, 0" + "\n");
        this.codigoRes.push("MOV AX, NUMIMP" + "\n");
        this.codigoRes.push("MOV BX, 1000" + "\n");
        this.codigoRes.push("DIV BX" + "\n");
        this.codigoRes.push("MOV RESIMP, AX" + "\n");
        this.codigoRes.push("IMPNUM AL" + "\n");
        this.codigoRes.push("MOV AX, RESIMP" + "\n");
        this.codigoRes.push("MOV BX, 1000" + "\n");
        this.codigoRes.push("MUL BX" + "\n");
        this.codigoRes.push("MOV BX, AX" + "\n");
        this.codigoRes.push("MOV AX, NUMIMP" + "\n");
        this.codigoRes.push("SUB AX, BX" + "\n");
        this.codigoRes.push("MOV NUMIMP, AX" + "\n");

        this.codigoRes.push("MOV DX, 0" + "\n");
        this.codigoRes.push("MOV AX, NUMIMP" + "\n");
        this.codigoRes.push("MOV BX, 100" + "\n");
        this.codigoRes.push("DIV BX" + "\n");
        this.codigoRes.push("MOV RESIMP, AX" + "\n");
        this.codigoRes.push("IMPNUM AL" + "\n");
        this.codigoRes.push("MOV AX, RESIMP" + "\n");
        this.codigoRes.push("MOV BX, 100" + "\n");
        this.codigoRes.push("MUL BX" + "\n");
        this.codigoRes.push("MOV BX, AX" + "\n");
        this.codigoRes.push("MOV AX, NUMIMP" + "\n");
        this.codigoRes.push("SUB AX, BX" + "\n");
        this.codigoRes.push("MOV NUMIMP, AX" + "\n");

        this.codigoRes.push("MOV DX, 0" + "\n");
        this.codigoRes.push("MOV AX, NUMIMP" + "\n");
        this.codigoRes.push("MOV BX, 10" + "\n");
        this.codigoRes.push("DIV BX" + "\n");
        this.codigoRes.push("MOV RESIMP, AX" + "\n");
        this.codigoRes.push("IMPNUM AL" + "\n");
        this.codigoRes.push("MOV AX, RESIMP" + "\n");
        this.codigoRes.push("MOV BX, 10" + "\n");
        this.codigoRes.push("MUL BX" + "\n");
        this.codigoRes.push("MOV BX, AX" + "\n");
        this.codigoRes.push("MOV AX, NUMIMP" + "\n");
        this.codigoRes.push("SUB AX, BX" + "\n");
        this.codigoRes.push("MOV NUMIMP, AX" + "\n");

        this.codigoRes.push("MOV DX, 0" + "\n");
        this.codigoRes.push("MOV AX, NUMIMP" + "\n");
        this.codigoRes.push("MOV BX, 1" + "\n");
        this.codigoRes.push("DIV BX" + "\n");
        this.codigoRes.push("MOV RESIMP, AX" + "\n");
        this.codigoRes.push("IMPNUM AL" + "\n");

        this.codigoRes.push("IMPCHAR 0AH" + "\n");
        this.codigoRes.push("IMPCHAR 0DH" + "\n");
        this.codigoRes.push("ENDM" + "\n");
        this.codigoRes.push("\n");
    }

    obtenerFunciones(rama, ambito) {
        if(rama.simbolo == "DefFunc") {
            ambito = rama.ramas[1].simbolo;
            let id = rama.ramas[1].simbolo;
            this.agregarFuncion(id);
            rama.ramas.forEach(subrama => {
                this.analizarFuncion(subrama, ambito);
            });
            this.codigoRes.push("\nENDM\n\n");
        }

        rama.ramas.forEach(subrama => {
            this.obtenerFunciones(subrama, ambito);
        });
    }

    analizarFuncion(rama, ambito) {
        if(rama.simbolo == "Parametros") {
            if(rama.ramas.length != 0) {
                let id = rama.ramas[1].simbolo;
                this.agregarParametro("", id, ambito);
            }
        }

        if(rama.simbolo == "ListaParam") {
            if(rama.ramas.length != 0) {
                let id = rama.ramas[2].simbolo;
                this.agregarParametro(", ", id, ambito);
            }
        }

        if(rama.simbolo == "Sentencia") {
            this.codigoRes.push("\n");
            this.obtenerSentencia(rama, ambito);
        }

        if(rama.simbolo != "Sentencia") {
            rama.ramas.forEach(subrama => {
                this.analizarFuncion(subrama, ambito);
            });
        }
    }

    agregarFuncion(id) {
        this.codigoRes.push(id + " MACRO ");
    }

    agregarParametro(coma, parametro, ambito) {
        this.codigoRes.push(coma + parametro + ambito);
    }

    obtenerSentencia(rama, ambito) {
        if(rama instanceof R21) {
            let id = rama.ramas[0].simbolo;
            if(this.globales.includes(id)) {
                id += "0";
            } else {
                id += ambito;
            }
            this.contadorOP = 0;
            let contenido = this.obtenerExpresion(rama.ramas[2], ambito);
            if(contenido == "RESFUN" || contenido != "AX") {
                this.codigoRes.push("MOV BX, " + contenido + "\n");
                contenido = "BX";
            }
            this.codigoRes.push("MOV " + id + ", " + contenido + "\n");
        } 
        else if(rama instanceof R25) {
            this.contadorARG = 0;
            this.agregarLlamadaFunc(rama.ramas[0], ambito);
        } 
        else if(rama instanceof R22) {
            let resultado = this.obtenerExpresion(rama.ramas[2], ambito);
            let ifNum = this.contadorIf;
            this.contadorIf++;
            this.codigoRes.push("LOCAL FINIF" + ifNum + "\n");
            this.codigoRes.push("MOV AX, " + resultado + "\n");
            this.codigoRes.push("MOV BX, 0" + "\n");
            this.codigoRes.push("CMP AX, BX" + "\n");
            this.codigoRes.push("JE FINIF" + ifNum+ "\n");
            this.agregarSentenciaBloque(rama.ramas[4], ambito);

            this.codigoRes.push("FINIF" + ifNum+ ":\n");
            this.agregarOtro(rama.ramas[5], ambito);
        } else if(rama instanceof R23) {
            let whileNum = this.contadorWhile;
            this.contadorWhile++;
            this.codigoRes.push("LOCAL FINWHILE" + whileNum + "\n");
            this.codigoRes.push("LOCAL INICIOWHILE" + whileNum + "\n");
            this.codigoRes.push("INICIOWHILE" + whileNum+ ":\n");
            let resultado = this.obtenerExpresion(rama.ramas[2], ambito);
            
            this.codigoRes.push("MOV AX, " + resultado + "\n");
            this.codigoRes.push("MOV BX, 0" + "\n");
            this.codigoRes.push("CMP AX, BX" + "\n");
            this.codigoRes.push("JE FINWHILE" + whileNum+ "\n");
            this.obtenerSentencias(rama.ramas[4].ramas[1], ambito);
            this.codigoRes.push("JMP INICIOWHILE" + whileNum+ "\n");
            this.codigoRes.push("FINWHILE" + whileNum+ ":\n");
            
        } else if(rama instanceof R24) {
            this.codigoRes.push("MOV RESFUN, 0\n");
            if(rama.ramas[1].ramas.length != 0) {
                let contenido = this.obtenerExpresion(rama.ramas[1].ramas[0], ambito);
                this.codigoRes.push("MOV AX, " + contenido + "\n");
                this.codigoRes.push("MOV RESFUN, AX");
            }
        } else if(rama instanceof R25) {
            this.contadorARG = 0;
            return this.agregarLlamadaFunc(rama.ramas[0], ambito);
        }
    }

    agregarSentenciaBloque(rama, ambito) {
        if(rama.ramas[0].simbolo == "Sentencia") {
            
            this.obtenerSentencia(rama.ramas[0], ambito);

        } else if(rama.ramas[0].simbolo == "Bloque"){
            this.obtenerSentencias(rama.ramas[0].ramas[1], ambito);
        }
    }

    obtenerSentencias(rama, ambito) {
        if(rama.ramas.length != 0) {
            this.obtenerSentencia(rama.ramas[0], ambito);
            this.obtenerSentencias(rama.ramas[1], ambito);
        }
    }

    agregarOtro(rama, ambito) {
        if(rama.ramas.length != 0) {
            this.agregarSentenciaBloque(rama.ramas[1], ambito);
        }
    }

    obtenerExpresion(rama, ambito) {
        if(rama instanceof R43) 
            return this.obtenerExpresion(rama.ramas[1], ambito);

        else if(rama instanceof R44) {
            let contenido = this.obtenerExpresion(rama.ramas[1], ambito);
            if(rama.ramas[0].simbolo == "+") {
                this.codigoRes.push("ADD AX, " + contenido + "\n");
            } else if(rama.ramas[0].simbolo == "-") {
                this.codigoRes.push("SUB AX, " + contenido + "\n");
            }
            this.codigoRes.push("MOV RES[" + this.contadorOP + "], AX\n");
            contenido = "RES[" + this.contadorOP + "]";
            this.contadorOP += 2;
            return contenido;
        } 
        
        else if(rama instanceof R45) {
            let contenido = this.obtenerExpresion(rama.ramas[1], ambito);
            this.codigoRes.push("MOV AX, " + contenido + "\n");
            this.codigoRes.push("NEG AX" +"\n");
            this.codigoRes.push("MOV RES[" + this.contadorOP + "], AX\n");
            contenido = "RES[" + this.contadorOP + "]";
            this.contadorOP += 2;
            return contenido;
        }
        
            
        else if(rama instanceof R46 || rama instanceof R47 || rama instanceof R48
            || rama instanceof R49 || rama instanceof R50 || rama instanceof R51) {
            let contenido1 = this.obtenerExpresion(rama.ramas[0], ambito);
            if(contenido1 == "AX") {
                this.codigoRes.push("MOV RES[" + this.contadorOP + "], AX\n");
                contenido1 = "RES[" + this.contadorOP + "]";
                this.contadorOP += 2;
            }
            let contenido2 = this.obtenerExpresion(rama.ramas[2], ambito);
            if(contenido2 == "AX") {
                this.codigoRes.push("MOV RES[" + this.contadorOP + "], AX\n");
                contenido2 = "RES[" + this.contadorOP + "]";
                this.contadorOP += 2;
            }

            let op = rama.ramas[1].simbolo;
            if(op == "+") {
                this.codigoRes.push("MOV AX, " + contenido1 + "\n");
                this.codigoRes.push("MOV BX, " + contenido2 + "\n");
                this.codigoRes.push("ADD AX, BX" + "\n");
                return "AX";

            } else if(op == "-") {
                this.codigoRes.push("MOV AX, " + contenido1 + "\n");
                this.codigoRes.push("MOV BX, " + contenido2 + "\n");
                this.codigoRes.push("SUB AX, BX" + "\n");
                return "AX";

            } else if(op == "*") {
                this.codigoRes.push("MOV AX, " + contenido1 + "\n");
                this.codigoRes.push("MOV BX, " + contenido2 + "\n");
                this.codigoRes.push("MUL BX" + "\n");
                return "AX";

            } else if(op == "/") {
                this.codigoRes.push("MOV DX, 0" + "\n");
                this.codigoRes.push("MOV AX, " + contenido1 + "\n");
                this.codigoRes.push("MOV BX, " + contenido2 + "\n");
                this.codigoRes.push("DIV BX" + "\n");
                return "AX";

            } else if(op == "<") {
                this.codigoRes.push("MENORVAR " + contenido1 + ", " + contenido2 + "\n");
                this.codigoRes.push("MOV AX, RESGEN" + "\n");
                return "AX";

            } else if(op == ">") {
                this.codigoRes.push("MAYORVAR " + contenido1 + ", " + contenido2 + "\n");
                this.codigoRes.push("MOV AX, RESGEN" + "\n");
                return "AX";

            } else if(op == "<=") {
                this.codigoRes.push("MENORIGUALVAR " + contenido1 + ", " + contenido2 + "\n");
                this.codigoRes.push("MOV AX, RESGEN" + "\n");
                return "AX";

            } else if(op == ">=") {
                this.codigoRes.push("MAYORIGUALVAR " + contenido1 + ", " + contenido2 + "\n");
                this.codigoRes.push("MOV AX, RESGEN" + "\n");
                return "AX";

            }else if(op == "==") {
                this.codigoRes.push("IGUALVAR " + contenido1 + ", " + contenido2 + "\n");
                this.codigoRes.push("MOV AX, RESGEN" + "\n");
                return "AX";

            } else if(op == "!=") {
                this.codigoRes.push("NOIGUALVAR " + contenido1 + ", " + contenido2 + "\n");
                this.codigoRes.push("MOV AX, RESGEN" + "\n");
                return "AX";

            } else if(op == "||") {
                this.codigoRes.push("MOV AX, " + contenido1 + "\n");
                this.codigoRes.push("MOV BX, " + contenido2 + "\n");
                this.codigoRes.push("OR AX, BX" + "\n");
                return "AX";

            } else if(op == "&&") {
                this.codigoRes.push("MOV AX, " + contenido1 + "\n");
                this.codigoRes.push("MOV BX, " + contenido2 + "\n");
                this.codigoRes.push("AND AX, BX" + "\n");
                return "AX";

            }

        } else if(rama instanceof R52)
            return this.obtenerTermino(rama.ramas[0], ambito);
    }

    obtenerTermino(rama, ambito) {
        if(rama instanceof R35) {
            this.contadorARG = 0;
            return this.agregarLlamadaFunc(rama.ramas[0], ambito);
        }

        else if(rama instanceof R36) {
            if(this.globales.includes(rama.ramas[0].simbolo)) {
                return(rama.ramas[0].simbolo + "0");
            } else {
                return(rama.ramas[0].simbolo + ambito);
            }
        }

        else if(rama instanceof R37)
            return rama.ramas[0].simbolo;

        else if(rama instanceof R38)
            return Math.round(rama.ramas[0].simbolo);

        else if(rama instanceof R39) {
            return "'" + rama.ramas[0].simbolo.replace(new RegExp('"', 'g'), "") + "'";
        }
    }

    agregarLlamadaFunc(rama, ambito) {
        this.codigoRes.push("MOV RESFUN, 0\n");
        let id = rama.ramas[0].simbolo;
        let listaArgumentos = this.agregarArgumentos(rama.ramas[2], ambito);
        this.codigoRes.push(id);
        for (let i = 0; i < listaArgumentos.length; i++) {
            if(i != 0) {
                this.codigoRes.push(", " + listaArgumentos[i]);
            } else {
                this.codigoRes.push(" " + listaArgumentos[i]);
            }
        }
        this.codigoRes.push("\n");
        return "RESFUN";
    }

    agregarArgumentos(argumentos, ambito) {
        let listaArgumentos = [];
        if(argumentos.ramas.length != 0) {
            let i = 0;
            if(argumentos.ramas[0] instanceof Otro)
                i++;
                
            this.contadorOP = 0;    
            let expresion = this.obtenerExpresion(argumentos.ramas[i], ambito);
            if(expresion == "AX") {
                this.codigoRes.push("MOV ARG[" + this.contadorARG + "], AX\n");
                expresion = "ARG[" + this.contadorARG + "]";
                this.contadorARG += 2;
            }
            listaArgumentos.unshift(expresion);
            listaArgumentos = [...listaArgumentos, ...this.agregarArgumentos(argumentos.ramas[i + 1], ambito)]
        }
        return listaArgumentos;
    }

    agregarCodigoBase() {
        this.codigoRes.push(".CODE\n");
        this.codigoRes.push("CODEP PROC FAR\n");
        this.codigoRes.push("MOV AX,@DATA\nMOV DS,AX\n");
        this.codigoRes.push("main\n");

        this.imprimirVariables();

        this.codigoRes.push("CODEP ENDP\n");
    }

    imprimirVariables() {
        this.variables.forEach(variable => {
            let nombre = variable.id;
            if(variable.ambito == "*") {
                nombre += "0";
            } else {
                nombre += variable.ambito;
            }
            nombre.split("").forEach(caracter => {
                this.codigoRes.push("IMPCHAR '" + caracter + "'" + "\n");
            });
            this.codigoRes.push("IMPCHAR ':'" + "\n");
            this.codigoRes.push("IMPCHAR ' '" + "\n");
            if(variable.tipo == "int" || variable.tipo == "float" || variable.tipo == "void") {
                this.codigoRes.push("IMPRIMIRINT " + nombre + "\n");
            }
            else if(variable.tipo == "char") {
                this.codigoRes.push("IMPRIMIRCHAR " + nombre + "\n");
            }
            
        });
    }

    analisis() {
        this.arbol.raiz.forEach(rama => {
            this.siguienteNodo(rama, "*");
        });
    }

    siguienteNodo(rama, ambito) {
        
        rama.ramas.forEach(subrama => {
            this.siguienteNodo(subrama, ambito);
        });
    }


    crearDocumento() {

        const blob = new Blob(this.codigoRes, { type: 'text/plain' });

        return blob;
    }
};

export {GenCode};