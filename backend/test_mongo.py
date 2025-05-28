from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

def test_connection():
    try:
        # Get MongoDB URI from environment variable
        mongodb_uri = os.getenv("MONGODB_URI")
        print("Testing MongoDB connection...")
        
        # Create a client instance
        client = MongoClient(mongodb_uri, serverSelectionTimeoutMS=5000)
        
        # The ismaster command is cheap and does not require auth.
        client.admin.command('ping')
        
        print("MongoDB connection successful!")
        
        # Test database access
        db = client['salon_appointment']
        collections = db.list_collection_names()
        print("Available collections:", collections)
        
    except Exception as e:
        print("Error connecting to MongoDB:", e)

if __name__ == "__main__":
    test_connection()
