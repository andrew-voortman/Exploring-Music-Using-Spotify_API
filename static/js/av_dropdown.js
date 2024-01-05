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
        console.log(dataarray);

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
    let dataarray = Object.entries(data).reduce((acc, [key, value]) => {
        Object.keys(value).forEach(subKey => {
            acc[subKey] = acc[subKey] || [];
            acc[subKey].push(value[subKey]);
        });
        return acc;
    });
    console.log(dataarray);

    // filter the data based on values of the selected id
    let selected = dataarray.filter(i => i.country == selectedCountry);
        
    // get the first index of the array
    let selectedData = selected[0];
        
    // clear html element using d3
    d3.select("#summary").html("");

    // Use Object.entries to return an array of the each key/value
    Object.entries(selectedData).forEach(([key, value]) => {
        // code to append and makes list, paragraph, text/linebreaks at id='summary'
        d3.select("#summary").append('h5').text(`${key}: ${value}`);
        });
    });
};

function optionChanged(selectedCountry){
    summary(selectedCountry)
};

init()