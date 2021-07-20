# https://www.youtube.com/watch?v=SK7LqjxBbh0

from tkinter import Tk, ttk, Canvas, Label, Frame, Entry, Button, W, E, Listbox, END
import psycopg2


root = Tk()
root.title('Python y PostgreSQL')

def save_new_device(mac, bfz, alias):
    #print(MAC, BFZ, ALIAS)
    conn = psycopg2.connect(
        dbname="postgres",
        user="postgres",
        password="12345678",
        host="localhost",
        port="5432",
    )
    cursor = conn.cursor()
    query = '''insert into esp32(mac, bfz, alias) values (%s, %s, %s);'''
    cursor.execute(query, (mac, bfz, alias))
    print('Data saved !')
    conn.commit()
    conn.close()
    # Para mostrar la lista actualizada sin necesidad de cerrar y abrir de nuevo
    display_devices()

def display_devices():
    conn = psycopg2.connect(
        dbname="postgres",
        user="postgres",
        password="12345678",
        host="localhost",
        port="5432",
    )
    cursor = conn.cursor()
    query = '''select * from esp32'''
    cursor.execute(query)
    row = cursor.fetchall()

    listbox = Listbox(frame, width=20, height=10) # Height=... va a ser la cantidad de dispositivos que muestra por defecto
    listbox.grid(row=10, columnspan=4, sticky=W+E)

    for x in row:
        listbox.insert(END, x)

    conn.commit()
    conn.close()

def search(id):
    conn = psycopg2.connect(
        dbname="postgres",
        user="postgres",
        password="12345678",
        host="localhost",
        port="5432",
    )
    cursor = conn.cursor()
    query = '''select * from esp32 where id=%s'''
    cursor.execute(query, (id))
    row = cursor.fetchone()

    print(row)
    display_search_result(row)

    conn.commit()
    conn.close()

def display_search_result(row):
    listbox = Listbox(frame, width=20, height=1)
    listbox.grid(row=9, columnspan=4, sticky=W+E)
    listbox.insert(END, row)

# Canvas
canvas = Canvas(root, height=500, width=500)
canvas.pack() # Para que se 'monte' la confgiguración que hemos descrito

frame = Frame()
frame.place(relx=0.1, rely=0.1, relwidth=0.8, relheight=0.8)

label = Label(frame, text='Añade un dispositivo')
label.grid(row=0, column=1)

# MAC address
label = Label(frame, text='MAC')
label.grid(row=1, column=0)

entry_mac = Entry(frame)
entry_mac.grid(row=1, column=1)

# BFZ
label = Label(frame, text='BFZ')
label.grid(row=2, column=0)

entry_bfz = Entry(frame)
entry_bfz.grid(row=2, column=1)

# WIFI_config ¿OTA?
label = Label(frame, text='ALIAS')
label.grid(row=3, column=0)

entry_alias = Entry(frame)
entry_alias.grid(row=3, column=1)


button = Button(frame, text="ADD", command=lambda:save_new_device(
    entry_mac.get(),
    entry_bfz.get(),
    entry_alias.get()
))
button.grid(row=4, column=1, sticky=W+E)

# Buscar
label = Label(frame, text="Buscar datos")
label.grid(row=5, column=1)

label = Label(frame, text="Buscar por MAC")
label.grid(row=6, column=0)

mac_search = Entry(frame)
mac_search.grid(row=6, column=1)

button = Button(frame, text="GO", command=lambda:search(mac_search.get()))
button.grid(row=6, column=2)


display_devices()

root.mainloop()
