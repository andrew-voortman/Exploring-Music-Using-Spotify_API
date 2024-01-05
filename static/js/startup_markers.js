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
        z: filteredData.map((d) => d["danceability"]),
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
    
    // Render the choropleth map with Plotly
    Plotly.newPlot("myDiv", plotData, layout);
  });
}

// function optionChanged(selectedValue) {
//   console.log("Selected artist:", selectedValue);

//   d3.json("/api/v1.0/test").then(function(rows) {

//     console.log(rows);
//     // Helper function to unpack data
//     function unpack(rows, key) {
//       return rows.map(function(row) { return row[key]; });
//     }

//     // Filter data for the specific artist selected by the user
//     var filteredData = rows.filter(function(d) {
//       return d['Artist Name'] === selectedValue;
//     });

//     // Prepare data for the choropleth map
//     var data = [{
//       type: 'choropleth',
//       locationmode: 'country names',
//       locations: unpack(filteredData, 'Country'), // Use unpack on filtered data
//       z: unpack(filteredData, 'Danceability'),
//       text: unpack(filteredData, 'Country'),
//       autocolorscale: true
//     }];

//     // Define the layout for the Plotly plot
//     var layout = {
//       title: 'Popularity by Country for ' + selectedValue,
//       geo: {
//         projection: {
//           type: 'robinson'
//         }
//       }
//     };

//     // Plot the data using Plotly
//     Plotly.newPlot("myDiv", data, layout, {showLink: false});

//   }).catch(function(err) {
//     // Error handling
//     console.error(err);
//   });
// }
