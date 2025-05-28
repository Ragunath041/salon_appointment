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
import certifi
from urllib.parse import quote_plus
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def create_app():
    app = Flask(__name__)
    
    # CORS configuration
    # Get allowed origins from environment variable or use defaults
    allowed_origins = os.getenv('ALLOWED_ORIGINS', 'http://localhost:3000,http://localhost:5173,http://localhost:8080').split(',')
    
    # Configure CORS with specific settings
    CORS(
        app,
        resources={
            r"/*": {
                "origins": allowed_origins,
                "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
                "allow_headers": ["Content-Type", "Authorization", "X-Requested-With"],
                "supports_credentials": True,
                "expose_headers": ["Content-Type", "Authorization"],
                "max_age": 86400  # 24 hours
            }
        }
    )
    
    # Add CORS headers to all responses
    @app.after_request
    def after_request(response):
        # Get the origin from the request
        origin = request.headers.get('Origin', '')
        
        # If the origin is in our allowed origins, use it, otherwise use the first allowed origin
        if origin in allowed_origins:
            response.headers.add('Access-Control-Allow-Origin', origin)
        elif allowed_origins:
            response.headers.add('Access-Control-Allow-Origin', allowed_origins[0])
            
        response.headers.add('Access-Control-Allow-Credentials', 'true')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        response.headers.add('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        
        # Handle preflight requests
        if request.method == 'OPTIONS':
            response.status_code = 200
        return response
    
    return app

# Create the Flask application
app = create_app()

# Get port from environment variable with a fallback to 10000
port = int(os.environ.get('PORT', 10000))

# Security configurations
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("JWT_ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 30))

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_mongodb_client():
    try:
        mongodb_uri = os.getenv("MONGODB_URI")
        if not mongodb_uri:
            raise ValueError("MONGODB_URI environment variable is not set")
        
        client_options = {
            'serverSelectionTimeoutMS': 5000,
            'connectTimeoutMS': 5000,
            'retryWrites': True,
            'tls': True,
            'tlsCAFile': certifi.where()
        }
        
        client = MongoClient(mongodb_uri, **client_options)
        client.admin.command('ping')  # Test connection
        return client
    except Exception as e:
        print(f"MongoDB Connection Error: {e}")
        return None

# MongoDB connection
try:
    client = get_mongodb_client()
    if client is None:
        raise Exception("Failed to establish MongoDB connection")
        
    db_name = os.getenv("DB_NAME", "salon_appointment")
    db = client[db_name]
    appointments_collection = db["appointments"]
    users_collection = db["users"]
    
    print("Successfully connected to MongoDB!")
    print("Connected to database:", db_name)
    print("Available collections:", db.list_collection_names())
    
    # Create indexes for better performance
    appointments_collection.create_index([("user_id", 1)])
    users_collection.create_index([("email", 1)], unique=True)
    print("Database indexes created successfully")
    
except Exception as e:
    print(f"Error initializing MongoDB: {e}")
    client = None
    db = None
    appointments_collection = None
    users_collection = None

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
        if not data:
            return jsonify({"error": "No JSON data provided"}), 400
            
        print("Received registration data:", data)  # Debug log
        print("Database connection status:", "Connected" if users_collection is not None else "Not connected")  # Debug log
        
        if not all(key in data for key in ["email", "password", "name", "role"]):
            return jsonify({"error": "Missing required fields. Required: email, password, name, role"}), 400
        
        if users_collection is None:
            print("Error: users_collection is not initialized")  # Debug log
            return jsonify({"error": "Database connection is not properly initialized"}), 500
        
        # Check if user already exists
        existing_user = users_collection.find_one({"email": data["email"]})
        if existing_user:
            return jsonify({"error": "Email already registered"}), 400
        
        # Create new user
        user_data = {
            "email": data["email"],
            "password": get_password_hash(data["password"]),
            "name": data["name"],
            "role": data["role"].lower(),  # Convert role to lowercase
            "created_at": datetime.utcnow()
        }
        
        # Try to insert the new user
        try:
            print("Attempting to insert user:", {k: v if k != 'password' else '[HIDDEN]' for k, v in user_data.items()})
            result = users_collection.insert_one(user_data)
            print(f"User created with ID: {result.inserted_id}")
            return jsonify({
                "message": "User registered successfully",
                "userId": str(result.inserted_id),
                "status": "success"
            }), 201
        except Exception as db_error:
            print(f"Database error during user creation: {str(db_error)}")
            error_message = str(db_error)
            if "duplicate key error" in error_message.lower():
                return jsonify({"error": "Email already exists", "status": "error"}), 409
            return jsonify({
                "error": "Failed to create user",
                "details": error_message,
                "status": "error"
            }), 500
            
    except Exception as e:
        print(f"Error in /register endpoint: {str(e)}")
        import traceback
        traceback.print_exc()  # This will print the full traceback to the console
        return jsonify({"error": f"Internal server error: {str(e)}"}), 500

@app.route("/login", methods=["POST"])
def login():
    try:
        if users_collection is None:
            print("Error: Database connection is not initialized")
            return jsonify({"error": "Database connection error"}), 500

        data = request.json
        if not data:
            return jsonify({"error": "No JSON data provided"}), 400
            
        if not all(key in data for key in ["email", "password"]):
            return jsonify({"error": "Missing required fields"}), 400
        
        print(f"Attempting login for email: {data['email']}")  # Debug log
        
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