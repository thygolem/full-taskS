from flask import Flask, request, jsonify
from flask_pymongo import PyMongo, ObjectId
from flask_cors import CORS

# Creación de app Flask
app = Flask(__name__)

#conexxión con mongo y creación de basede datos
app.config['MONGO_URI']='mongodb://localhost/pythonreactdb'
mongo = PyMongo(app)

# Solución para los middlewares entre Flask y React
# para crear la conexxión entre los dos servidores
CORS(app)

#creación de collección
db = mongo.db.users

@app.route('/')
def index():
    return '<h1>HOLA</h1><a href="http://localhost:5000/users">USERS API</a>'


# 5 Rutas HTTP
@app.route('/users', methods=['POST'])
def createUser():
  print(request.json)
  id = db.insert({
    'name': request.json['name'],
    'email': request.json['email'],
    'password': request.json['password'],
    'lat': request.json['lat'],
    'long': request.json['long'],
    'mac': request.json['mac']
  })
  return jsonify(str(ObjectId(id)))


@app.route('/users', methods=['GET'])
def getUsers():
    users = []
    for doc in db.find():
        users.append({
            '_id': str(ObjectId(doc['_id'])),
            'name': doc['name'],
            'email': doc['email'],
            'password': doc['password'],
            'lat': doc['lat'],
            'long': doc['long'],
            'mac': doc['mac']
            })
    return jsonify(users)

@app.route('/user/<id>', methods=['GET'])
def getUser(id):
    user = db.find_one({'_id': ObjectId(id)})

    print(user)
    return jsonify({
      '_id': str(ObjectId(user['_id'])),
      'name': user['name'],
      'email': user['email'],
      'password': user['password'],
      'lat': user['lat'],
      'long': user['long'],
      'mac': user['mac']
    })





@app.route('/users/<id>', methods=['DELETE'])
def deleteUser(id):
    db.delete_one({'_id': ObjectId(id)})
    return jsonify({'msg': 'USUARIO ELIMINADO'})






@app.route('/users/<id>', methods=['PUT'])
def updateUser(id):
    db.update_one({'_id': ObjectId(id)}, {'$set': {
        'name': request.json['name'],
        'email': request.json['email'],
        'password': request.json['password'],
        'lat': request.json['lat'],
        'long': request.json['long'],
        'mac': request.json['mac']
    }})
    return jsonify({'msg': 'USUARIO ACTUALIZADO'})




# Simple server
if __name__ == '__main__':
    app.run(debug=True)

