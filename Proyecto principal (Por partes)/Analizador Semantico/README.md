# Arbol sintactico

El Árbol de sintaxis abstracta es una estructura de datos usada extensamente en compiladores, debido a su propiedad de representar la estructura del código de un programa. Un AST es usualmente el resultado del analizador sintáctico en la fase de un compilador. A menudo sirve como un intermediario de la representación del programa a través de etapas que requiere el compilador, y tiene un impacto fuerte en la salida final del compilador.

# Tarea: Ejemplo gramática LR utilizando tabla de compilador.

Se modifico el codigo de la clase sintactico para que se creara un arbol sintactico mientras se va realizando el analisis y asi guardar cada parte del codigo a analizar,
se crearon las clases necesarias para el arbol, una por cada regla, una siendo el nodo y las ultimas dos siendo el arbol y una que controlara todas.

![image](https://user-images.githubusercontent.com/89165084/224136832-d4bca03e-445e-4c20-8350-0a59caba4b80.png)

![image](https://user-images.githubusercontent.com/89165084/224136929-58835ee3-8954-495d-9a7d-38f99ca125f0.png)

Al final se agrego codigo en el script.js donde se imprime el arbol despues de realizar el analisis, probemos con el ejemplo int hola; :

![image](https://user-images.githubusercontent.com/89165084/224136601-0b05f6b2-b49b-49a4-8772-932d62dddadd.png)

![image](https://user-images.githubusercontent.com/89165084/224136677-781e542e-5a15-4b72-923b-19b00ea183c9.png)

Como se observa se muestra el arbol y el numero indica el nivel e cada nodo.
