const path = "/api/v1.0/test"

function init(){
    // create dropdownmenu using d3
    // quitlet dropDownMenu = d3.select('#selDataset');

    // Fetch data from api using d3 and console log the data.
    d3.json(path).then((data) => {
        console.log(`Data: ${data}`);
    });
};

init();
//         // create an array of id names
//         let countries = data.topmusic;
        
//         // Add names to dropdownmenu
//         countries.forEach((country) => {
//             // console.log(name);
//             dropDownMenu.append('option').text(country).property('value', country);
//         });

//         // choose the first sample as default id to run on page open/refresh
//         let country = countries[0];

//         // run functions to generate plots with default id
//         summary(country);

//     });

// }

// function summary(selectedID){
//     // Fetch data from api using d3.
//     d3.json(url).then((data) => {

//         // retrieve an array of metadata objects
//         let metadata = data.metadata;

//         // filter the data based on values of the selected id
//         let selected = metadata.filter(i => i.id == selectedID);
        
//         // get the first index of the array
//         let selectedData = selected[0];
        
//         // clear html element using d3
//         d3.select("#sample-metadata").html("");

//         // Use Object.entries to return an array of the each key/value
//         Object.entries(selectedData).forEach(([key, value]) => {
//             // code to append and makes list, paragraph, text/linebreaks at id='sample-meta'
//             d3.select("#sample-metadata").append('h5').text(`${key}: ${value}`);
//         });
//     });
// };

// function optionChange(newArtist){

// }