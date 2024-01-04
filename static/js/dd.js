// //  Set up URL for data import as a constant
// from flask import Flask, jsonify, render_template
// import sqlalchemy
// from sqlalchemy.ext.automap import automap_base
// from sqlalchemy.orm import Session, defer
// from sqlalchemy import create_engine, func
// import numpy as np
// from matplotlib import pyplot as plt
// # DATABASE SETUP
// # create engine
// engine = create_engine("sqlite:///music.db")
// # reflect an existing database into a new model
// Base = automap_base()
// # reflect the tables
// Base.prepare(engine)
// # save references to each table
// songs = Base.classes.topmusic
// # FLASK SETUP
// # Create an app, being sure to pass __name__
// app = Flask(__name__)
// # Define what to do when a user hits the index route
// @app.route("/")
// def index():
//     print("Server received request for 'Home' page...")
//     return (
//         "Welcome to our Spotify dashboard!<br/><br/>"
//         "Available Routes:<br/><br/>"
//         "<a href='/test'>/test</a><br/>"
//         "<a href='/api/v1.0/test'>/api/v1.0/test</a>"
//     )
//     # return render_template("index.html")
// @app.route("/test")
// def test():
//     return render_template("dropdownstarter.html")
// @app.route("/api/v1.0/test")
// def test_data():
//     # Create a session
//     session = Session(engine)
//     # Query the database (replace this with your actual query)
//     results = session.query(songs.trackname, songs.artistname, songs.country, songs.albumname, songs.danceability, songs.duration, songs.energy, songs.instrumentalness, songs.liveness, songs.loudness, songs.tempo, songs.positiveness)
//     result_list = [dict(row) for row in results]
//     # Close the session
//     session.close()
//     return jsonify(result_list)
// if __name__ == "__main__":
//     app.run(debug=True)

// Initializes the page with a default plot
function init() {

  
    d3.json("/api/v1.0/test").then((data) => {
      console.log(data);
    });

  }
  // Function called by DOM changes
function getData() {
    let dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option 
    let dataset = dropdownMenu.property("value");
    // Initialize an empty array for the country's data
    let data = [];
  
    if (dataset == 'Duration') {
        data = duration;
    }
    else if (dataset == 'Danceability') {
        data = danceabiltiy;
    }
    else if (dataset == 'Positiveness') {
        data = positiveness;
    }
    else if (dataset == 'Energy') {
      data = energy;
    }
    
  // Call function to update the chart
    updatePlotly(data);
  }
  
  // Update the restyled plot's values
  function updatePlotly(newdata) {
    Plotly.restyle("pie", "values", [newdata]);
  init();



  // Initializes the page with a default plot
function init() {
    data = [{
      x: [1, 2, 3, 4, 5],
      y: [1, 2, 4, 8, 16] }];
  
    Plotly.newPlot("plot", data);
  }
  
  // Call updatePlotly() when a change takes place to the DOM
  d3.selectAll("#selDataset").on("change", updatePlotly);
  
  // This function is called when a dropdown menu item is selected
  function updatePlotly() {
    // Use D3 to select the dropdown menu
    let dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a variable
    let dataset = dropdownMenu.property("value");
  
    // Initialize x and y arrays
    let x = [];
    let y = [];
  
    if (dataset === 'Duration') {
      x = [1, 2, 3, 4, 5];
      y = [1, 2, 4, 8, 16];
    }
  
    else if (dataset === 'Danceability') {
      x = [10, 20, 30, 40, 50];
      y = [1, 10, 100, 1000, 10000];
    }
    else if (dataset === 'Positiveness') {
        x = [10, 20, 30, 40, 50];
        y = [1, 10, 100, 1000, 10000];
      }
    else if (dataset === 'Energy') {
        x = [10, 20, 30, 40, 50];
        y = [1, 10, 100, 1000, 10000];
      }

      
    // Note the extra brackets around 'x' and 'y'
    Plotly.restyle("plot", "x", [x]);
    Plotly.restyle("plot", "y", [y]);
  }
  
  init();
  






