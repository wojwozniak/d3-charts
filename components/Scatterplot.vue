<template>
    <div id="scatterplot" class="h-full w-full min-h-[500px] h-3/5 w-4/5 min-w-[600px] border-2 flex flex-col justify-center  items-center">
        <h1 id="title">Doping in Professional Bicycle Racing</h1>
        <h3>Top 35 times, Alpe d'Huez</h3>
        <div id="visHolder"></div>
    </div>
</template>

<script>
import * as d3 from 'd3'

export default {
    name: 'Scatterplot',
    mounted() {
    //D3
    //Contact with API
    let response = d3.json('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json')
        .then((data) => {
            console.log(data);

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
                .attr("transform", 'rotate(-90)')
                .text(`Time in minutes and seconds`);
            
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
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap'); 

#scatterplot body, #scatterplot html {
    background-color: whitesmoke;
    margin: 0;
    padding: 0;
    border: 0;
    font-family: 'Open Sans';
    
}

#scatterplot #title {
    padding-top: 25px;
    padding: 8px;
    margin-bottom: 0;
}

#scatterplot h3 {
    margin: 0;
    margin-bottom: 15px;
}

#scatterplot #root {
    min-height: 100%;
    background-color: whitesmoke;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

#scatterplot #visHolder {
    background-color: white;
    min-height: 330px;
    margin-bottom: 10px;
    margin: 30px;
    width: fit-content;
    margin: auto;
}


#scatterplot #x-axis {
    transform: translate(0, 300px);
    z-index: 10;
 }
 
 #scatterplot #y-axis {
     transform: translate(40px, 0);
     z-index: 10;
 }

 #scatterplot .tooltip {	
    position: absolute;			
    text-align: center;			
    width: 160px;					
    height: auto;					
    padding: 2px;				
    font-size: 12px;	
    background: lavender;	
    border: 0px;		
    border-radius: 8px;			
    pointer-events: none;			
}

#scatterplot .legend-item {
    font-size: 12px;
}

#scatterplot a {
    text-decoration: none;
    color: goldenrod;
}

#scatterplot #legend {
    font-size: 16px;
}

#scatterplot #axis-text {
    font-size: 16px;
}

#scatterplot svg {
    margin-top: 10px;
    transform: scale(0.9);
}

#scatterplot p {
    margin: 4px;
}

#scatterplot #subtitle {
    margin-top: 20px;
}
</style>