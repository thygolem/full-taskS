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