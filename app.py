# import flask and other dependencies
from flask import Flask, jsonify, render_template

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session, defer
from sqlalchemy import create_engine, func

import numpy as np
from matplotlib import pyplot as plt
import pandas as pd

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

    # Query the database
    results = session.query(
        songs.trackname,
        songs.artistname,
        songs.country,
        songs.albumname,
        songs.danceability,
        songs.duration,
        songs.energy,
        songs.instrumentalness,
        songs.liveness,
        songs.loudness,
        songs.tempo,
        songs.positiveness,
        songs.popularity
    )

    # Convert the query result into a list of dictionaries
    result_list = []
    for row in results:
        result_dict = {
            "trackname": row[0],
            "artistname": row[1],
            "country": row[2],
            "albumname": row[3],
            "danceability": row[4],
            "duration": row[5],
            "energy": row[6],
            "instrumentalness": row[7],
            "liveness": row[8],
            "loudness": row[9],
            "tempo": row[10],
            "positiveness": row[11],
            "popularity": row[12],

        }
        result_list.append(result_dict)

    # Close the session
    session.close()

    # Convert the list of dictionaries to a DataFrame
    df = pd.DataFrame(result_list)

    # Group by 'country' and 'artistname' and calculate the mean
    grouped_df = df.groupby(['country', 'artistname'], as_index=False).mean(numeric_only=True)

    # Convert the grouped DataFrame to a list of dictionaries
    grouped_result_list = grouped_df.to_dict(orient='records')

    # Return the aggregated data as a JSON response
    return jsonify(grouped_result_list)

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

    # Query the database for necessary data
    results = session.query(songs.country, songs.trackname, songs.artistname, songs.albumname, songs.popularity).filter(songs.country == country).\
        order_by(songs.popularity.desc()).limit(5)
    
    result_list = [dict(row) for row in results]

    # Close the session
    session.close()
    
    return jsonify(result_list)

if __name__ == "__main__":
    app.run(debug=True)