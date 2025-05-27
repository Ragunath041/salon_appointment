from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from bson.objectid import ObjectId
from datetime import datetime
from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta
from functools import wraps
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

# Security configurations
SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key-here")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# MongoDB connection
client = MongoClient("mongodb://localhost:27017/")
db = client["salon_appointment"]
appointments_collection = db["appointments"]
users_collection = db["users"]

# Authentication helper functions
def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({"error": "Token is missing"}), 401
        try:
            token = token.split(" ")[1]
            data = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
            current_user = users_collection.find_one({"email": data["sub"]})
            if not current_user:
                raise Exception("User not found")
        except:
            return jsonify({"error": "Token is invalid"}), 401
        return f(current_user, *args, **kwargs)
    return decorated

def admin_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({"error": "Token is missing"}), 401
        try:
            token = token.split(" ")[1]
            data = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
            current_user = users_collection.find_one({"email": data["sub"]})
            if not current_user or current_user.get("role") not in ["admin", "stylist"]:
                return jsonify({"error": "Admin/Stylist privileges required"}), 403
        except:
            return jsonify({"error": "Token is invalid"}), 401
        return f(current_user, *args, **kwargs)
    return decorated

# Get all stylists
@app.route("/stylists", methods=["GET"])
def get_stylists():
    try:
        stylists = list(users_collection.find({"role": "stylist"}, {"password": 0}))
        for stylist in stylists:
            stylist["_id"] = str(stylist["_id"])
        return jsonify(stylists), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Authentication routes
@app.route("/register", methods=["POST"])
def register():
    try:
        data = request.json
        if not all(key in data for key in ["email", "password", "name", "role"]):
            return jsonify({"error": "Missing required fields"}), 400
        
        # Check if user already exists
        if users_collection.find_one({"email": data["email"]}):
            return jsonify({"error": "Email already registered"}), 400
        
        # Create new user
        user_data = {
            "email": data["email"],
            "password": get_password_hash(data["password"]),
            "name": data["name"],
            "role": data["role"],  # Can be 'user' or 'stylist'
            "created_at": datetime.utcnow()
        }
        users_collection.insert_one(user_data)
        
        return jsonify({"message": "User registered successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/login", methods=["POST"])
def login():
    try:
        data = request.json
        if not all(key in data for key in ["email", "password"]):
            return jsonify({"error": "Missing required fields"}), 400
        
        user = users_collection.find_one({"email": data["email"]})
        if not user or not verify_password(data["password"], user["password"]):
            return jsonify({"error": "Invalid credentials"}), 401
        
        access_token = create_access_token({"sub": user["email"]})
        return jsonify({
            "access_token": access_token,
            "token_type": "bearer",
            "user": {
                "email": user["email"],
                "name": user["name"],
                "role": user["role"]
            }
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Appointment routes
@app.route("/salon_appointment", methods=["POST"])
@token_required
def create_appointment(current_user):
    try:
        data = request.json
        if not all(key in data for key in ["name", "email", "phone", "service", "stylist", "date", "time", "selected_salon"]):
            return jsonify({"error": "Missing required fields"}), 400

        # Get stylist details
        stylist = users_collection.find_one({"name": data["stylist"], "role": "stylist"})
        if not stylist:
            return jsonify({"error": "Selected stylist not found"}), 404

        appointment_data = {
            "user_id": str(current_user["_id"]),
            "stylist_id": str(stylist["_id"]),
            "created_at": datetime.utcnow(),
            "status": "pending",
            **data
        }

        result = appointments_collection.insert_one(appointment_data)
        return jsonify({
            "message": "Appointment scheduled successfully!",
            "appointment_id": str(result.inserted_id)
        }), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/salon_appointment", methods=["GET"])
@token_required
def get_appointments(current_user):
    try:
        if current_user.get("role") == "stylist":
            # If stylist, return only their appointments
            appointments = list(appointments_collection.find({"stylist": current_user["name"]}))
        elif current_user.get("role") == "admin":
            # If admin, return all appointments
            appointments = list(appointments_collection.find({}))
        else:
            # If regular user, return only their appointments
            appointments = list(appointments_collection.find({"user_id": str(current_user["_id"])}))
        
        for appointment in appointments:
            appointment["_id"] = str(appointment["_id"])
        
        return jsonify(appointments), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/salon_appointment/<appointment_id>/status", methods=["PUT"])
@admin_required
def update_appointment_status(current_user, appointment_id):
    try:
        data = request.json
        if "status" not in data:
            return jsonify({"error": "Status is required"}), 400

        # If stylist, can only update their own appointments
        if current_user.get("role") == "stylist":
            appointment = appointments_collection.find_one({
                "_id": ObjectId(appointment_id),
                "stylist": current_user["name"]
            })
            if not appointment:
                return jsonify({"error": "Appointment not found or unauthorized"}), 404

        result = appointments_collection.update_one(
            {"_id": ObjectId(appointment_id)},
            {"$set": {"status": data["status"]}}
        )
        
        if result.modified_count == 0:
            return jsonify({"error": "Appointment not found"}), 404
        
        return jsonify({"message": "Appointment status updated successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/salon_appointment/<appointment_id>", methods=["DELETE"])
@token_required
def delete_appointment(current_user, appointment_id):
    try:
        # Find the appointment
        appointment = appointments_collection.find_one({"_id": ObjectId(appointment_id)})
        if not appointment:
            return jsonify({"error": "Appointment not found"}), 404
        
        # Check authorization
        if (current_user.get("role") not in ["admin", "stylist"] and 
            appointment.get("user_id") != str(current_user["_id"])):
            return jsonify({"error": "Unauthorized"}), 403
        
        # If stylist, can only delete their own appointments
        if current_user.get("role") == "stylist" and appointment.get("stylist") != current_user["name"]:
            return jsonify({"error": "Unauthorized"}), 403
        
        result = appointments_collection.delete_one({"_id": ObjectId(appointment_id)})
        return jsonify({"message": "Appointment deleted successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)