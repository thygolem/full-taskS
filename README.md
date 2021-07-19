
Basado en el tutorial de FaztWeb
https://www.youtube.com/watch?v=D1W8H4Rkb9A
Python Flask, React Hooks & MongoDB CRUD

Para seguir los pasos, en Github, ir a commits y copiar el código del commit,

$ git reset --hard [código_del_commit]

-
-
-
-
-


- - - - - - BACKEND - - - - - -

Para probar la API de FLASK, usamos POSTMAN:
cuando accedemos a la dirección http://localhost:5000/users desde navegador, vamos a observar que tenemos el archivo JSON liso para ser consumido por cualqueir cliente

Para manejar al principio las 5 peticiones de HTTP, vamos ausar postman:
ejemplo1:
[POST]
http://localhost:5000/users
Header: key=Content-Type: Value=application/json
Body: raw JSON
    ej:
    {
        "name":"nombre1",
        "email": "uno@uno.com",
        "password":"11111111"
    }

Comandos de MongoDB:
$ mongo ------- En otros SO puede ser "$ mongod"
> show dbs
> use pythonreactdb
> show collections
> db.users.find()
> db.users.find().pretty()

Se recomienda igualmente usar mongo compass.



- - - - - - FRONTEND - - - - - -

Para crear el entorno de ReactJS

Ir al directorio principal del proyecto e introducir el comando

$ npx create-react-app frontend
