En linux:
$ lsb_release -a
No LSB modules are available.
Distributor ID:	Ubuntu
Description:	Ubuntu 20.04.2 LTS
Release:	20.04
Codename:	focal

Para seguir los pasos, en Github, ir a commits y copiar el código del commit,

$ git reset --hard [código_del_commit]

-
-
-
-
-

Para probar la API de FLASK, usamos POSTMAN:

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
