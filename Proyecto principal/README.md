# Compilador

Un traductor es un programa que recibe como entrada código escrito en un cierto lenguaje y produce como salida código en otro lenguaje.

https://sciatel.wikispaces.com/TRADUCTORES+DEL+LENGUAJE+DE+PROGRAMACION

Un compilador es un programa informático que traduce un programa que ha sido escrito en un lenguaje de programación a un lenguaje común, usualmente lenguaje de máquina, aunque también puede ser traducido a un código intermedio (bytecode) o a texto. Este proceso de traducción se conoce como compilación.

https://es.wikipedia.org/wiki/Compilador

# Analizador Lexico
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
[Analizador completo img 2](https://user-images.githubusercontent.com/89165084/213944892-50c32dfd-bedf-4cc9-b39f-dbef5ddffcfc.jpg)
