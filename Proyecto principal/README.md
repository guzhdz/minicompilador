# Compilador

Un traductor es un programa que recibe como entrada código escrito en un cierto lenguaje y produce como salida código en otro lenguaje.

https://sciatel.wikispaces.com/TRADUCTORES+DEL+LENGUAJE+DE+PROGRAMACION

Un compilador es un programa informático que traduce un programa que ha sido escrito en un lenguaje de programación a un lenguaje común, usualmente lenguaje de máquina, aunque también puede ser traducido a un código intermedio (bytecode) o a texto. Este proceso de traducción se conoce como compilación.

https://es.wikipedia.org/wiki/Compilador

# Analizador Lexico
Link: https://github.com/guzhdz/TRADUCTORES-DE-LENGUAJES-II/tree/main/Proyecto%20principal%20(Por%20partes)/Analizador%20Lexico

El Análisis Léxico es la primera fase de un compilador, este consiste en un programa que recibe como entrada el código fuente de otro programa (secuencia de caracteres) y produce una salida compuesta de tokens (componentes léxicos) o símbolos. 

# Tarea: Mini generador léxico 
Genera un pequeño analizador léxico, que identifique los siguientes tokens (identificadores y números reales) construidos de la siguiente manera.
identificadores = letra(letra|digito)*
Real = entero.entero+

El codigo se encuentra en los archivos script.js y analizador.js, para ejecutarlos puede simplemente compilar y correr el archivo script.js o usar la extension de live server de VS Code para hacer deploy del index.html y en consola ver el resultado de la ejecucion.

Resultado de la ejecucion:
![Mini analizador img 1](https://user-images.githubusercontent.com/89165084/213944343-8f33242a-b181-4698-93a7-c2b1be2fcc3a.jpg)
![Mini analizador img 2](https://user-images.githubusercontent.com/89165084/213944420-bc4f6c95-de59-4618-8b0c-914a9ce720c0.jpg)


# Tarea: Etapa del proyecto analizador léxico completo.
Genera un analizador léxico utilizando todos los símbolos léxicos en el archivo simbolos_lexicos.pdf.

Resultado de la ejecucion:

![Analizador completo img 1](https://user-images.githubusercontent.com/89165084/213944726-ec851892-1ca3-4041-afac-36f8ae2a7296.jpg)!
![Analizador completo img 2](https://user-images.githubusercontent.com/89165084/213944892-50c32dfd-bedf-4cc9-b39f-dbef5ddffcfc.jpg)!

Se mejoro el aspecto visual, de manera que ahora si se ejecuta en un servidor local o con la extension live server de visual code el archivo index.html, aparecera una interfaz visual que permitira ingresar cualquier texto y lo analizara:

![Lexico visual1](https://user-images.githubusercontent.com/89165084/216058211-45b5e04a-d30b-4e36-8872-c6eb2074101f.jpg)

![Lexico visual2](https://user-images.githubusercontent.com/89165084/216058237-a12973df-fb88-4dd8-a91e-8b2237fc4bcb.jpg)

# Analizador Sintactico
Un analizador sintáctico, también conocido como parser, es una herramienta que se utiliza en el procesamiento de lenguaje natural para analizar y comprender la estructura sintáctica de una frase o un texto. El objetivo de un parser es determinar la relación entre las palabras y las frases en un texto y su función gramatical en el contexto del texto completo.

# Tarea: Gramática del compilador
