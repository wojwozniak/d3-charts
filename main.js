
// Links to data
const EDUCATION_LINK = 'https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/for_user_education.json';
const COUNTY_LINK = 'https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/counties.json';

// D3
// Contact with API

Promise.all([d3.json(COUNTY_LINK), d3.json(EDUCATION_LINK)])
    .then((data) => renderChart(data[0], data[1]))
    .catch((err) => console.log(err));


const svg = d3.select("svg");
const path = d3.geoPath();
  

function renderChart(counties, education) {
    
    // Logging data
    console.log(counties);
    console.log(education);


    svg
        .append("g")
        .attr("class", "counties")
        .selectAll("path")
        .data(topojson.feature(counties, counties.objects.counties).features)
        .enter()
        .append("path")
        .attr("class", "county")
        .attr("fill", "black")
        .attr("d", path);

    
}