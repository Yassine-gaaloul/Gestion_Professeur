from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Autorise toutes les origines pour les routes commençant par /api
  # Configurer CORS pour permettre les interactions avec le frontend

# Connexion à MongoDB
client = MongoClient("mongodb://127.0.0.1:27017/")
db = client["PF_db"]
students_collection = db["professeur2"]

# Route pour récupérer tous les étudiants
@app.route('/professeurs', methods=['GET'])
def get_students():
    students = list(students_collection.find({}, {"_id": 0}))
    return jsonify(students), 200

# Route pour ajouter un étudiant
@app.route('/professeurs_post', methods=['POST'])
def add_student():
    data = request.json
    if "name" not in data or "age" not in data or "grade" not in data or "email" not in data:
        return jsonify({"error": "Invalid input, 'name', 'age', 'grade', and 'email' are required."}), 400
    
    # Vérifier si un étudiant avec cet email existe déjà
    existing_student = students_collection.find_one({"email": data["email"]})
    if existing_student:
        return jsonify({"error": "professeur with this email already exists."}), 409
    
    students_collection.insert_one(data)
    return jsonify({"message": "professeur added successfully"}), 201

# Route pour supprimer un étudiant
@app.route('/professeur-delete/<name>', methods=['DELETE'])
def delete_student(name):
    result = students_collection.delete_one({"name": name})
    if result.deleted_count == 0:
        return jsonify({"error": "professeur not found"}), 404
    return jsonify({"message": "professeur deleted successfully"}), 200

# Route pour mettre à jour un étudiant
@app.route('/professeurs_update/<name>', methods=['PUT'])
def update_student(name):
    data = request.json
    if "email" in data:
        # Vérifier si un autre étudiant utilise déjà cet email
        existing_student = students_collection.find_one({"email": data["email"], "name": {"$ne": name}})
        if existing_student:
            return jsonify({"error": "Another professeur with this email already exists."}), 409

    result = students_collection.update_one({"name": name}, {"$set": data})
    if result.matched_count == 0:
        return jsonify({"error": "professeur not found"}), 404
    return jsonify({"message": "professeur updated successfully"}), 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)

