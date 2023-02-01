# Analizador sintactico
Un analizador sintáctico, es un programa informático que analiza una cadena de símbolos según las reglas de una gramática formal. El análisis sintáctico convierte el texto de entrada en otras estructuras (comúnmente árboles), que son más útiles para el posterior análisis y capturan la jerarquía implícita de la entrada. 

Un analizador léxico crea tokens de una secuencia de caracteres de entrada y son estos tokens los que son procesados por el analizador sintáctico para construir la estructura de datos, por ejemplo un árbol de análisis o árboles de sintaxis abstracta. 

El uso más común de los analizadores sintácticos es como parte de la fase de análisis de los compiladores. De modo que tienen que analizar el código fuente del lenguaje, los lenguajes de programación tienden a basarse en gramáticas libres de contexto, debido a que se pueden escribir analizadores rápidos y eficientes para estas.

# Tarea: Mini analizador sintáctico (Excel)
Subir un archivo en excel simulando las gramáticas del ejercicio 1 y 2 del archivo (Practica Analizador Sintactico LR.pdf)

Entrada para el Ejercicio 1
hola+mundo

Entrada para el Ejercicio 2
a+b+c+d+e+f

Link de archivo: https://github.com/guzhdz/TRADUCTORES-DE-LENGUAJES-II/blob/main/Tareas/Tarea%202.%20Mini%20analizador%20sintactico/Mini%20analizador%20sint%C3%A1ctico%20(Excel).pdf

# Tarea: Mini analizador sintáctico (código)
Generar un algoritmo para analizar los Ejercicios 1 y 2 del archivo (PracticaAnalizadorSintactico.pdf)

Se modifico el codigo del analizador lexico para que funcionara junto con un codigo nuevo y hicira la funcion del analizador sintactico. Se agrego una nueva clase (Sintactico) la cual realiza as tareas importantes del mismo, ademas de que se cambio la interfaz para que concordara con el objetivo de este mini analizador sintactico.

Link del proyecto: https://github.com/guzhdz/TRADUCTORES-DE-LENGUAJES-II/tree/main/Tareas/Tarea%202.%20Mini%20analizador%20sintactico/Mini%20analizador%20sintactico%20programa

El proyecto puede ejecutarse en un servidor local o mediante la extension de live server de visual code, ejecutando el index.html.

Foto del codigo:

![image](https://user-images.githubusercontent.com/89165084/216158896-8cb0f7ee-7cd4-4c8a-90ed-876efc65695e.png)

Tablas LR en las que se baso el codigo:

![image](https://user-images.githubusercontent.com/89165084/216159161-9e1cdc1b-b374-48d8-aeab-01dfb023f9de.png)

![image](https://user-images.githubusercontent.com/89165084/216159390-5e52721e-aa6b-4729-9a4d-fd20a71e23b5.png)

Prueba y ejecucion del codigo del Ejercicio 1:

![image](https://user-images.githubusercontent.com/89165084/216159777-45f6c593-721b-4c14-93fb-43335ffb41c9.png)

Prueba y ejecucion del codigo del Ejercicio 2:

![image](https://user-images.githubusercontent.com/89165084/216160956-22bb9bee-eb72-49fd-bfa2-d0586d7a0fb6.png)
![image](https://user-images.githubusercontent.com/89165084/216161014-4494532f-6c4b-41e3-bd81-e439b35aa6ef.png)
![image](https://user-images.githubusercontent.com/89165084/216161151-3f58e151-f901-40c1-aa00-9b7019499237.png)
