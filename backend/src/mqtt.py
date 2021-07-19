
import os
import json
import time
import datetime
import paho.mqtt.client
import pymongo
from  pymongo import MongoClient


# MONGODB config
client = MongoClient('mongodb://localhost:27017/')

db = client.indoor_db
collection = db.indoor_collection

db = client['ESP32DB']
collection = db['BLEDATA']

# MQTT config info
CLOUDMQTT_HOST = 'suigeneris.ml'
CLOUDMQTT_PORT = 1883
CLOUDMQTT_USER = 'indoor_client'
CLOUDMQTT_PASS = 'Realtime_1'


def main():
    #Mqtt connection
    mqttc = paho.mqtt.client.Client(client_id = 'mqttSimo')
    mqttc.on_connect = on_connect
    mqttc.on_message = on_message
    mqttc.username_pw_set(CLOUDMQTT_USER, CLOUDMQTT_PASS)
    mqttc.connect(CLOUDMQTT_HOST, CLOUDMQTT_PORT, keepalive=60)
    #Broker loop
    mqttc.loop_forever()

#MQTT
def on_connect(client, userdata, flags, rc):
    #print("rc: " + str(rc))
    print('USUARIO: (%s)' % client._client_id)
    #Subscribe to topic
    client.subscribe('indoor', 0) #client.subscribe('topic', qos)
    

#Receive gateway and devices data
def on_message(client, userdata, message):
    esp = message.payload
    esp_mac, near_mac , rssi = str(esp[45:62]), str(esp[71:88]), int(esp[97:100])
    esp_mac, near_mac= str(esp_mac[2:]), str(near_mac[2:])
    espAlias    = "B/F/Z" # ASIGNAR ALIAS EN DB
    print("\n", "esp_mac ",esp_mac[2:],"\n", "near_mac ",near_mac[2:], "\n", "RRSI ",rssi)
    collection.insert_one({"esp_mac": esp_mac.lower(), "near_mac": near_mac.lower(), "rssi": rssi})
    print("guardado en DB")
    
    




    

if __name__ == '__main__':
    main()