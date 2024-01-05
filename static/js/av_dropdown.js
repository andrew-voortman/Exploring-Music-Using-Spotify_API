const path = "/api/v1.0/test2"

function init() {
    // create dropdownmenu using d3
    let dropDownMenu = d3.select('#selDataset');

    // Fetch data from api using d3 and console log the data.
    d3.json(path).then((data) => {
        // console.log(data);     
    
    // create an array from the data
        let dataarray = Object.entries(data).reduce((acc, [key, value]) => {
            Object.keys(value).forEach(subKey => {
                acc[subKey] = acc[subKey] || [];
                acc[subKey].push(value[subKey]);
            });
            return acc;
        });
        // console.log(dataarray);

        // pull out country names
        let countries = dataarray.country
        console.log(countries);

        countries.forEach((country) => {
            dropDownMenu.append('option').text(country).property('value', country);
        });

        let starterCountry = countries[0];

        summary(starterCountry)
    });
};



function summary(selectedCountry){
    const path2 = `/api/v1.0/test3/${selectedCountry}`

    // Fetch data from api using d3.
    d3.json(path2).then((data) => {
        console.log(data);
    
    // create an array from the data
    // let dataarray = Object.entries(data).reduce((acc, [key, value]) => {
    //     Object.keys(value).forEach(subKey => {
    //         acc[subKey] = acc[subKey] || [];
    //         acc[subKey].push(value[subKey]);
    //     });
    //     return acc;
    // });
    // console.log('data array', dataarray);

    // // filter the data based on values of the selected id
    // let selected = dataarray.filter(i => i.country == selectedCountry);
        
    // // get the first index of the array
    // let selectedData1 = selected[0];
    // let selectedData2 = selected[1];
    // // let selectedData3 = selected[2];
    // // let selectedData4 = selected[3];
    // // let selectedData5 = selected[4];
    // console.log('2', selected);
        
    // clear html element using d3
    d3.select("#summary1").html("");
    d3.select("#summary2").html("");
    d3.select("#summary3").html("");
    d3.select("#summary4").html("");
    d3.select("#summary5").html("");

    // Use Object.entries to return an array of the each key/value
    Object.entries(data[0]).forEach(([key, value]) => {
        // code to append and makes list, paragraph, text/linebreaks at id='summary'
        d3.select("#summary1").append('h5').text(`${key}:  ${value}`);
        });

    Object.entries(data[1]).forEach(([key, value]) => {
        // code to append and makes list, paragraph, text/linebreaks at id='summary'
        d3.select("#summary2").append('h5').text(`${key}:  ${value}`);
        });
        
    Object.entries(data[2]).forEach(([key, value]) => {
        // code to append and makes list, paragraph, text/linebreaks at id='summary'
        d3.select("#summary3").append('h5').text(`${key}:  ${value}`);
        });

    Object.entries(data[3]).forEach(([key, value]) => {
            // code to append and makes list, paragraph, text/linebreaks at id='summary'
        d3.select("#summary4").append('h5').text(`${key}:  ${value}`);
        });

    Object.entries(data[4]).forEach(([key, value]) => {
            // code to append and makes list, paragraph, text/linebreaks at id='summary'
        d3.select("#summary5").append('h5').text(`${key}:  ${value}`);
        });
    // d3.select("#summary3").html("");
    // Object.entries(selectedData3).forEach(([key, value]) => {
    //     // code to append and makes list, paragraph, text/linebreaks at id='summary'
    //     d3.select("#summary3").append('h5').text(`${key}: ${value}`);
    //     });
    });
    
};

function optionChanged3(selectedCountry){
    summary(selectedCountry)
};

init()