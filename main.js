let request = new XMLHttpRequest();
let data = {};

function requestListener() {
    data = this.responseText;
    console.log(data);
}

request.addEventListener("load", requestListener);
request.open("GET", "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json");
request.send();

// D3

const w = 500;
const h = 100;




const visual = d3.select("#visHolder")
    .append("svg")
    .attr("width", w)
    .attr("height", h)
    .append("rect")
    .attr("height", 100)
    .attr("width", 25)
    .attr("x", 0)
    .attr("y", 0)
