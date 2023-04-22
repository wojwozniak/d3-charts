<template>
    <h1 id="title">Doping in Professional Bicycle Racing</h1>
    <h3>Top 35 times, Alpe d'Huez</h3>
    <div id="visHolder" class="scatterplot"></div>
</template>

<script>
import * as d3 from 'd3'
import styles from '~/assets/css/Scatterplot.scss'

export default {
    name: 'Scatterplot',
    data() {
        return {
            styles
        }
    },
    mounted() {
        this.renderD3();
    },
    methods: {
        renderD3() {
            let response = d3.json('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json')
        .then((data) => {

            // Chart constants
            const w = 760;
            const h = 330;

            // X axis
            const xScale = d3.scaleTime()
                .domain([new Date("1993-01-01"), new Date("2016-01-01")])
                .range([40, w - 20]);
        
            const xAxis = d3.axisBottom()
                .scale(xScale)
                .tickFormat(d3.timeFormat("%Y"))
                .tickSize(5);
            
            // Data for Y Axis scale
            let lower = new Date(1970, 0, 1);
            let higher = new Date(1970, 0, 1);
            lower.setSeconds(2200);
            higher.setSeconds(2400);
            
            // Y axis
            const yScale = d3.scaleLinear()
                .domain([higher, lower])
                .range([h - 30, 10]);
            
            
            const yAxis = d3.axisLeft()
                .tickFormat(d3.timeFormat("%M:%S"))
                .scale(yScale);
            
            //Adding tooltip
            let tooltip = d3
                .select("body")
                .append("div")
                .attr("class", "tooltip")
                .attr("id", "tooltip")
                .style("opacity", 0);
            
            // Display
            const visual = d3.select("#visHolder")
                .append("svg")
                .attr("width", w)
                .attr("height", h)
                .selectAll("circle")
                .data(data)
                .enter()
                .append("circle")
                .attr("cx", (d) => {
                    return xScale(new Date(d.Year, 1, 1));
                })
                .attr("data-xvalue", (d, i) => {
                    return data[i].Year;
                })
                .attr("cy", (d, i) => {
                    let y = new Date(1970, 0, 1);
                    y.setSeconds(data[i].Seconds);
                    return yScale(y);
                })
                .attr("data-yvalue", (d, i) => {
                    let y = new Date(1970, 0, 1);
                    y.setSeconds(data[i].Seconds);
                    return y;
                })
                .attr("r", 6)
                .style("fill", (d) =>
                    d.Doping === "" ? "blue" : "red")
                .style("stroke", "black")
                .attr("class", "dot")
            
                //Displaying tooltip
                .on("mouseover", (d, dataPoint) => {
                    tooltip
                        .transition()
                        .duration(200)
                        .style("opacity", 0.9);
                    tooltip
                        .html(`<b>${dataPoint.Name}</b><br> ${dataPoint.Nationality}, ${dataPoint.Year} with <b>${dataPoint.Time}</b> <br> ${dataPoint.Doping}`)
                        .style("left", d.pageX + 10 + "px")
                        .style("top", d.pageY + 10 + "px");
                    tooltip.attr("data-year", dataPoint.Year);
                })
                .on("mouseout", (d) => {
                    tooltip
                        .transition()
                        .duration(400)
                        .style("opacity", 0);
                });
            
            // Calling axes
            const axisB = d3.select("svg")
                .append("g")
                .call(xAxis)
                .attr('id', 'x-axis');
            
            const axisL = d3.select("svg")
                .append("g")
                .call(yAxis)
                .attr('id', 'y-axis');
            
            // Adding label
            const about = d3
                .select("svg")
                .append("text")
                .attr("x", -263)
                .attr("y", 56)
                .attr("id", "axis-text")
                .attr("transform", 'rotate(-90)');
            
            // Adding legend
            const renderLegend = () => {
                const legend = d3
                    .select("svg")
                    .append("text")
                    .attr("x", w - 64)
                    .attr("y", 90)
                    .attr("id", "legend")
                    .text("Legend")
            
                const square1 = d3
                    .select("svg")
                    .append("rect")
                    .attr("x", w - 194)
                    .attr("y", 100)
                    .attr("height", 12)
                    .attr("width", 12)
                    .attr("fill", "red")
                    .attr("class", "legend-item");
                
                const square2 = d3
                    .select("svg")
                    .append("rect")
                    .attr("x", w - 213)
                    .attr("y", 120)
                    .attr("height", 12)
                    .attr("width", 12)
                    .attr("fill", "blue")
                    .attr("class", "legend-item");
                
                const text1 = d3
                    .select("svg")
                    .append("text")
                    .attr("x", w - 178)
                    .attr("y", 110)
                    .text("Riders with doping allegations")
                    .attr("class", "legend-item");
                
                const text2 = d3
                    .select("svg")
                    .append("text")
                    .attr("x", w - 197)
                    .attr("y", 130)
                    .text("Riders without doping allegations")
                    .attr("class", "legend-item");
            }
            renderLegend();
        });
        }
    }
}
</script>