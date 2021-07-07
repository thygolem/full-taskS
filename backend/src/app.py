from flask import Flask, request, jsonify
from flask_pymongo import PyMongo, ObjectId
from flask_cors import CORS

app = Flask(__name__)
app.config['MONGO_URI']='mongodb://localhost/pythonreactdb'
mongo = PyMongo(app)

db = mongo.db.users

# Routes
@app.route('/users', methods=['POST'])
def createUser():
  print(request.json)
  id = db.insert({
    'name': request.json['name'],
    'email': request.json['email'],
    'password': request.json['password']
  })
  return jsonify(str(ObjectId(id)))





@app.route('/users', methods=['GET'])
def getUsers():
    return 'OK'






@app.route('/users/<id>', methods=['GET'])
def getUser(id):
    return 'OK'






@app.route('/users/<id>', methods=['DELETE'])
def deleteUser(id):
    return 'OK'






@app.route('/users/<id>', methods=['PUT'])
def updateUser(id):
    return 'OK'





if __name__ == '__main__':
    app.run(debug=True)

