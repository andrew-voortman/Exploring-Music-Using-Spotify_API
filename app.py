# import flask and other dependencies
from flask import Flask, jsonify, render_template

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session, defer
from sqlalchemy import create_engine, func

import numpy as np
from matplotlib import pyplot as plt

# DATABASE SETUP

# create engine 
engine = create_engine("sqlite:///music.db")
# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine)

# save references to each table
songs = Base.classes.topmusic

# FLASK SETUP

# Create an app, being sure to pass __name__
app = Flask(__name__)

# Define what to do when a user hits the index route
@app.route("/")
def index():
    print("Server received request for 'Home' page...")

    return render_template("index.html") 


@app.route("/api/v1.0/test")
def test_data():

    # Create a session
    session = Session(engine)

    # Query the database (replace this with your actual query)
    results = session.query(songs.trackname, songs.artistname, songs.country, songs.albumname, songs.popularity, songs.danceability, songs.duration, songs.energy,
                             songs.instrumentalness, songs.liveness, songs.loudness, songs.tempo, songs.positiveness).filter(songs.country == 'Global').all()

    result_list = [dict(row) for row in results]

    # Close the session
    session.close()

    return jsonify(result_list)


@app.route("/api/v1.0/test2")
def test_data_2():

    # Create a session
    session = Session(engine)

    # Query the database for necessary data
    results = session.query(songs.country).distinct().\
        order_by(songs.country.asc()).all()
    
    result_list = [dict(row) for row in results]

    # Close the session
    session.close()

    return jsonify(result_list)


@app.route("/api/v1.0/test3/<country>")
def test_data_3(country):

    # Create a session
    session = Session(engine)

    # Query the database (replace this with your actual query)
    results = session.query(songs.trackname, songs.artistname, songs.country, songs.popularity).filter(songs.country == country).order_by(songs.popularity.desc()).limit(5)
                            
    result_list = [dict(row) for row in results]

    # Close the session
    session.close()

    return jsonify(result_list)

if __name__ == "__main__":
    app.run(debug=True)