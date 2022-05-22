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

const w = 800;
const h = 300;
const width = 25;

const dataset = [10, 12, 14, 22, 8, 4];


const visual = d3.select("#visHolder")
    .append("svg")
    .attr("width", w)
    .attr("height", h)
    .selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("width", width)
    .attr("height", (d) => d*10)
    .attr("x", (d, i) => {
        return i*(width + 5)
    })
    .attr("y", 0)
    .style("height", (d) => d)

