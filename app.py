
from flask import Flask, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)

# Allow requests from your existing website
CORS(app, origins=[
    "https://placementhub-source.onrender.com",
    "http://localhost:5500",
    "http://127.0.0.1:5500"
])


@app.route("/")
def home():
    return jsonify({
        "message": "PlacementHub backend is running!",
        "status": "success"
    })


@app.route("/api/jobs")
def get_jobs():
    jobs = [
        {
            "id": 1,
            "title": "Software Developer Intern",
            "company": "TCS",
            "location": "India",
            "type": "Internship"
        },
        {
            "id": 2,
            "title": "Data Analyst",
            "company": "Accenture",
            "location": "India",
            "type": "Full-time"
        }
    ]

    return jsonify(jobs)


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=False)
