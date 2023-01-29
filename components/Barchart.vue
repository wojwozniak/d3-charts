<template>
    <h1 id="title">United States GDP</h1>
    <h3 id="subtitle">1947-2015, Billions USD</h3>
    <div id="visHolder" class="barchart"></div>
</template>

<script>
import * as d3 from 'd3'
import styles from '~/assets/css/Barchart.scss'

export default {
    name: 'Barchart',
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
            let response = d3.json('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json')
        .then((data) => {
            // Extracting data for chart
            const dataset = data.data;

            //Extracting GDP into seperate array
            let GDP = dataset.map((item) => {
                return item[1];
            });

            // Chart constants
            const w = 760;
            const h = 340;
            const padding = 1;
            const width = (700 - 274) / 275;
            const scale = (h - 40) / GDP[GDP.length - 1];

            //Axes
            const xScale = d3.scaleTime()
                .domain([new Date("1947-01-01"), new Date("2015-07-01")])
                .range([40, w-20]);
            
            const xAxis = d3.axisBottom()
                .scale(xScale)
                .tickFormat(d3.timeFormat("%Y"))
                .tickSize(5);
            
            const yScale = d3.scaleLinear()
                .domain([0, GDP[GDP.length - 1]])
                .range([h - 20, 20]);
            
            
            const yAxis = d3.axisLeft()
                .scale(yScale)
                .tickValues([300, 2000, 4000, 6000, 8000, 10000, 12000, 14000, 16000, 18000]);
        
            //Adding tooltip
                let tooltip = d3
                    .select("body")
                    .append("div")
                    .attr("class", "tooltip")
                    .attr("id", "tooltip")
                    .style("opacity", 0);
            
            // Function to display year for tooltip
            const years = (date) => {
                let quarter = "";
                let helper = date.substring(5, 7);
                switch (helper) {
                    case "01":
                        quarter = "Q1";
                        break;
                    case "04":
                        quarter = "Q2";
                        break;
                    case "07":
                        quarter = "Q3";
                        break;
                    case "10":
                        quarter = "Q4";
                        break;
                }
                return quarter + ' ' + date.substring(0, 4);
            }
            
            // Drawing chart
            const visual = d3.select("#visHolder")
                .append("svg")
                .attr("width", w)
                .attr("height", h)
                .selectAll("rect")
                .data(dataset)
                .enter()
                .append("rect")
                .attr("class", "bar")
                .attr('data-date', (d, i) => {
                    return dataset[i][0];
                })
                .attr('data-gdp', (d, i) => {
                    return dataset[i][1];
                })
                .attr("width", width)
                .attr("height", (d) => {
                    return d[1] * scale;
                })
                .attr("x", (d, i) => {
                    return 40 + i * (width + padding)
                })
                .attr("y", (d, i) => {
                    return (h - 20) - d[1] * scale;
                })

                //Displaying tooltip
                .on("mouseover", (d, dataPoint) => {
                tooltip
                    .transition()
                    .duration(200)
                    .style("opacity", 0.9);
                tooltip
                    .html(`${years(dataPoint[0])}<br>${dataPoint[1].toFixed(1)} Billion USD`)
                    .style("left", d.pageX + 20 + "px")
                    .style("top", d.pageY + 20 + "px");
                    tooltip.attr("data-date", dataPoint[0]);
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
            
            // Adding text
            d3.select("svg")
                .append("text")
                .attr("id", "legend")
                .attr('transform', 'rotate(-90)')
                .attr('x', -290)
                .attr('y', 60)
                .text('US GDP, 1947-2015, Billions USD');
            });
        }

    }
}
</script>