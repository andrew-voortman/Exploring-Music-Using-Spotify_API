# import flask and other dependencies
from flask import Flask, jsonify, render_template

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

import numpy as np

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
    return (
        "Welcome to our Spotify dashboard!<br/><br/>"
        "Available Routes:<br/><br/>"
        "<a href='/api/v1.0/country'>/api/v1.0/country</a><br/>"
        "<a href='/api/v1.0/correlations'>/api/v1.0/correlations</a><br/>"
        "<a href='/api/v1.0/map'>/api/v1.0/map</a><br/>"
        "<a href='/api/v1.0/test'>/api/v1.0/test</a>"
    )

    # return render_template("index.html") 

@app.route("/api/v1.0/country")
def country():
    return render_template("dropdownstarter.html") 

@app.route("/api/v1.0/correlations")
def correlations():
    return render_template("buttontestlong.html")

@app.route("/api/v1.0/map")
def map():
    return render_template("leafletmapzoom.html")

@app.route("/api/v1.0/test")
def test():

    # Create a session
    session = Session(engine)

    # Query the database (replace this with your actual query)
    results = session.query(songs.trackname, songs.artistname, songs.country, songs.popularity, songs.danceability, songs.energy, songs.tempo, songs.positiveness).limit(50)

    result_list = [dict(row) for row in results]

    # Close the session
    session.close()

    return jsonify(result_list)
if __name__ == "__main__":
    app.run(debug=True)