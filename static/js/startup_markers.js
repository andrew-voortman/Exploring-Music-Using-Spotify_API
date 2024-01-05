//   // Fetch the data from your API
function optionChanged(selectedValue) {
  console.log("Selected artist:", selectedValue);
  // Fetch the data from your API
  d3.json("/api/v1.0/test").then((data) => {
    console.log(data);
    // Sample data as an array of objects

    // Filter data for the specific artist selected by the user
    var filteredData = data.filter(function (d) {
      return d["artistname"] == selectedValue;
    });

    // Map the filtered data to plotData for Plotly
    var plotData = [
      {
        type: "choropleth",
        locationmode: "ISO-3",
        locations: filteredData.map((d) => d["country"]),
        z: filteredData.map((d) => d["popularity"]),
        text: filteredData.map((d) => d["country"]),
        autocolorscale: true,
      },
    ];

    var layout = {
      title: "Popularity by Country for " + selectedValue,
      geo: {
        projection: {
          type: "robinson",
        },
      },
    };
    
    var plotData2 = [
      {
        type: "choropleth",
        locationmode: "ISO-3",
        locations: filteredData.map((d) => d["country"]),
        z: filteredData.map((d) => d["danceability"]),
        text: filteredData.map((d) => d["country"]),
        autocolorscale: true,
      },
    ];

    var layout2 = {
      title: "Danceability by Country for " + selectedValue,
      geo: {
        projection: {
          type: "robinson",
        },
      },
    };
    // Render the choropleth map with Plotly
    Plotly.newPlot("popularity", plotData, layout);
    Plotly.newPlot("danceability", plotData2, layout2);

  });
}

function optionChanged2(selectedValue) {
  console.log("Selected Feature:", selectedValue);

  // Fetch the data from your API
  d3.json("/api/v1.0/test").then((data) => {
    console.log(data);

    // Filter data for the specific artist selected by the user
    // var filteredData = data.filter(function (d) {
    //   return d["artistname"] == selectedValue;
    // });

    // Extract the columns for scatterplot
    var popularity = data.map((d) => d["popularity"]);
    var selectedColumn = data.map((d) => d[selectedValue]);
    console.log(popularity);
    console.log(selectedColumn);
    // Create a scatterplot trace
    var trace = {
      x: selectedColumn,
      y: popularity,
      mode: 'markers',
      type: 'scatter',
      marker: {
        size: 10,
        color: 'blue', // You can set the desired color
        opacity: 0.5,
      },
    };

    var newSelectedValue = selectedValue.charAt(0).toUpperCase() + selectedValue.slice(1);

    // Create the layout for the scatterplot
    var layout = {
      title: newSelectedValue + " vs Popularity",
      xaxis: {
        title: newSelectedValue,
        autorange: true, // Automatically scale the x-axis
      },
      yaxis: {
        title: "Popularity",
        autorange: true, // Automatically scale the y-axis
      },
    };

    // Create a scatterplot with Plotly
    Plotly.newPlot("scatterplot", [trace], layout);
  });
}