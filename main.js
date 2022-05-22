
// D3
const w = 800;
const h = 300;
const width = 1.4;
const scale = 0.01;

console.log(10);

let response = d3.json('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json')
    .then((data) => {
        const dataset = data.data;
        console.log(dataset);
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
            .attr("height", (d) => {
                return d[1] * scale;
        })
        .attr("x", (d, i) => {
            return i*(width + 1)
        })
        .attr("y", (d, i) => {
            return h-d[1]*scale;
        })
        //.style("height", (d) => {
        //    console.log(d[1])
        //    return d[1];
       // })  
})


//h-d*scale