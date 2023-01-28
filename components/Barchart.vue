<template>
    <div id="barchart" class="h-full w-full min-h-[500px] h-3/5 w-4/5 min-w-[600px] border-2 flex flex-col justify-center  items-center">
        <h1 id="title">United States GDP</h1>
        <h3 id="subtitle">1947-2015, Billions USD</h3>
        <div id="visHolder"></div>
    </div>
</template>

<script>
import * as d3 from 'd3'

export default {
    name: 'Barchart',
    mounted() {
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
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap'); 

#barchart body, #barchart html {
    background-color: whitesmoke;
    margin: 0;
    padding: 0;
    border: 0;
    font-family: 'Open Sans';
    
}

#barchart #root {
    min-height: 100%;
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
}

#barchart #title {
    padding-top: 50px;
    margin: 0;
}

#barchart #visHolder {
    background-color: white;
    min-height: 340px;
    margin-bottom: 10px;
    margin: 30px;
    width: fit-content;
    margin: auto;
}

#barchart .bar {
    fill: blue;
}

#barchart .bar:hover {
    fill: gray;
}

#barchart #x-axis {
   transform: translate(0, 320px);
   z-index: 10;
}

#barchart #y-axis {
    transform: translate(40px, 0);
    z-index:10;
}

#barchart .tooltip {	
    position: absolute;			
    text-align: center;			
    width: 120px;					
    height: auto;					
    padding: 2px;				
    font-size: 12px;	
    background: lavender;	
    border: 0px;		
    border-radius: 8px;			
    pointer-events: none;			
}

#barchart a {
    color: darkgoldenrod;
    text-decoration: none;
}

#barchart #legend {
    font-size: 16px;
}

#barchart svg {
    margin-top: 10px;
    transform: scale(0.9);
}

#barchart #subtitle {
    margin-top: 20px;
}

#barchart p {
    margin: 4px;
}
</style>