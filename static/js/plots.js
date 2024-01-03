// Initializes the page with a default plot
function init() {

  
    d3.json("/api/v1.0/test").then((data) => {
      console.log(data);
    });

  }
  
  init();