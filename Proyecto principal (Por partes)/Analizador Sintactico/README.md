# Analizador sintactico
Un analizador sintáctico, es un programa informático que analiza una cadena de símbolos según las reglas de una gramática formal. El análisis sintáctico convierte el texto de entrada en otras estructuras (comúnmente árboles), que son más útiles para el posterior análisis y capturan la jerarquía implícita de la entrada. 

Un analizador léxico crea tokens de una secuencia de caracteres de entrada y son estos tokens los que son procesados por el analizador sintáctico para construir la estructura de datos, por ejemplo un árbol de análisis o árboles de sintaxis abstracta. 

El uso más común de los analizadores sintácticos es como parte de la fase de análisis de los compiladores. De modo que tienen que analizar el código fuente del lenguaje, los lenguajes de programación tienden a basarse en gramáticas libres de contexto, debido a que se pueden escribir analizadores rápidos y eficientes para estas.

# Tarea: Analizador Semantico
Se añadio una nueva clase llamada semantico, en dicha calse se realiza un analisis del arbol sintactico preiamente creado, en este analisis se verifica en cada sentencia que las operaciones realizadas se hagan con variables peviamente declaradas, asi como de que sean del mismo tipo, ademas de verificar cada que se usa o declara una variable o funcion, no sea repetida si es declarada o que ya este declarada en caso de que sea usada.

![image](https://user-images.githubusercontent.com/89165084/219900764-6460108c-7108-41ce-b941-c14067921367.png)

Ademas se cambio visualmente la interfaz del programa, ahora enfocandose en el analisis sintactico y cambiando el input por yn textarea, asi el usuario puede
ingresar un programa:

![image](https://user-images.githubusercontent.com/89165084/219900924-ad395dbe-7274-43ee-a2d4-164bcb39291a.png)

Ejecucion:

![image](https://user-images.githubusercontent.com/89165084/219900948-4348fa38-aaac-45fb-a270-91b6bfda7bd0.png)

![image](https://user-images.githubusercontent.com/89165084/219900969-cc45ffc5-bb61-499d-8645-c6ac39edf9d5.png)

Para roposito de que no terminara muy larga la explicacion solo se tomo captura del inicio y final de la tabla
