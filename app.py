
import os
import pymysql
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


def get_db_connection():
    return pymysql.connect(
        host=os.environ["DB_HOST"],
        port=int(os.environ.get("DB_PORT", "26098")),
        user=os.environ["DB_USER"],
        password=os.environ["DB_PASSWORD"],
        database=os.environ.get("DB_NAME", "placementhub"),
        cursorclass=pymysql.cursors.DictCursor,
        connect_timeout=10,
        ssl={}
    )


@app.route("/")
def home():
    return jsonify({
        "status": "success",
        "message": "PlacementHub backend is running!"
    })


@app.route("/api/jobs")
def get_jobs():
    connection = None

    try:
        connection = get_db_connection()

        with connection.cursor() as cursor:
            cursor.execute(
                """
                SELECT id, title, company, location, type
                FROM jobs
                ORDER BY id DESC
                """
            )
            jobs = cursor.fetchall()

        return jsonify(jobs)

    except Exception:
        app.logger.exception("Failed to retrieve jobs from MySQL")
        return jsonify({
            "status": "error",
            "message": "Unable to retrieve jobs from the database."
        }), 500

    finally:
        if connection:
            connection.close()


if __name__ == "__main__":
    app.run()
