Tkinter debe instalarse de manera gloabl en caso de que no venga por defecto instalado con python3
$ sudo apt-get install python3-tk


Instalar postgreSQL:
https://www.youtube.com/watch?v=40uGNsi7ysc
Para usar PostgreSQL pro terminal en ubuntu:
$ sudo apt update
$ sudo apt install postgresql postgresql-contrib

$ sudo -i -u postgres
$ psql

introducimos el comando SQL:
'#' CREATE TABLE esp32(id Serial, mac text, bfz text, alias text);
Y comprobamos que se haya creado la tabla:
'#' \d dispositivos
Para cambiar una contraseña a un ussuario concretos
'#' alter user postgres with password '12345678';
