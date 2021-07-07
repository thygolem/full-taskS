from flask import Flask, request
from flask_pymongo import PyMongo
from flask_cors import CORS

app = Flask(__name__)
app.config['MONGO_URI']='mongodb://localhost/pythonreactdb'
mongo = PyMongo(app)

db = mongo.db.users

@app.route('/users', methods=['POST'])
def createUser():
    print(request.json)
    return 'OK'






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

