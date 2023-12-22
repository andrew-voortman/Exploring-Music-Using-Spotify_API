let myMap = L.map("map", {
    center: [-32.8, 117.9],
    zoom: 7
  });
  
  // Adding the tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);
  
  d3.csv(csvUrl).then(function(data) {
    data.forEach(function(row) {
      // Convert string values to numbers
      row.Popularity = +row.Popularity;
      row.Danceability = +row.Danceability;
      // Add more properties as needed
    });
  
    // Now, you can create markers or other visual elements based on the properties
    // For example, you might scale the marker size according to the 'Popularity'
    data.forEach(function(row) {
      if(row.latitude && row.longitude) { // Replace 'latitude' and 'longitude' with your actual data columns
        L.circleMarker([row.latitude, row.longitude], {
          radius: row.Popularity / 10, // Example of scaling the radius
          fillColor: "#ff7800",
          color: "#000",
          weight: 1,
          opacity: 1,
          fillOpacity: 0.8
        }).addTo(myMap).bindPopup("Track: " + row['Track Name'] + "<br>Artist: " + row['Artist Name']);
      }
    });
  });