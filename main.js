// API response
let response = d3.json("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json")
    .then((data) => {
        const dataset = data.monthlyVariance;
        //console.log(dataset);

        // Chart constants
        const w = 1450;
        const h = 530;
        const barHeight = 33;
        const barWidth = 5;

        // Color scale from darkest to brightest
        const colorScale = ["#313695", "#717AB9", "#ABD9E9", "#E0F3F8", "#FFFFBF", "#FEE090", "#FDAE61","#DD8E25" , "#D53028"];

        // Calculating color to display
        let variances = [];
        for (let i = 0; i < dataset.length; i++) {
            variances.push(dataset[i].variance);
        }
        let colors = variances.map((v) => {
            if (v < -3.5) {
                return colorScale[0];
            } else if (v < -2.5) {
                return colorScale[1];
            } else if (v < -1.5) {
                return colorScale[2];
            } else if (v < -0.5) {
                return colorScale[3];
            } else if (v < 0.5) {
                return colorScale[4];
            } else if (v < 1.5) {
                return colorScale[5];
            } else if (v < 2.5) {
                return colorScale[6];
            } else if (v < 3.5) {
                return colorScale[7];
            } else return colorScale[8];
        });

        // X axis
        const xScale = d3.scaleTime()
            .domain([new Date("1753-01-01"), new Date("2015-09-01")])
            .range([70, 70+(2015-1752)*barWidth]);
        
        const xAxis = d3.axisBottom()
            .scale(xScale)
            .tickFormat(d3.timeFormat("%Y"))
            .tickSize(10);
        
        // Y Axis

        const yScale = d3.scaleBand()
            .domain([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
            .range([barHeight, 430]);
        
        const yAxis = d3.axisLeft()
            .scale(yScale)
            .tickValues(yScale.domain())
            .tickFormat((month) => {
                let date = new Date(0);
                date.setUTCMonth(month);
                let format = d3.timeFormat('%B');
                return format(date);
            })
            .tickSize(10);
        
         //Adding tooltip
         let tooltip = d3
            .select("body")
            .append("div")
            .attr("class", "tooltip")
            .attr("id", "tooltip")
            .style("opacity", 0);
        
        
        //Month names for tooltip
        const monthNames = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        
        // Displaying chart
        const visual = d3.select("#visHolder")
            .append("svg")
            .attr("width", w)
            .attr("height", h)
            .selectAll("rect")
            .data(dataset)
            .enter()
            .append("rect")
            .attr("class", "cell")
            .attr("width", 5)
            .attr("height", 34)
            .attr("x", (d, i) => {
                return 65 + (d.year - 1752) * barWidth;
            })
            .attr("y", (d) => {
                return d.month * barHeight;
            })
            .attr("data-month", (d) => {
                return d.month - 1;
            })
            .attr("data-year", (d) => {
                return d.year;
            })
            .attr("data-temp", (d) => {
                return d.variance;
            })
            .style("fill", (d, i) => colors[i])

            //Displaying tooltip
            .on("mouseover", (d, dataPoint) => {
                tooltip
                    .transition()
                    .duration(200)
                    .style("opacity", 0.9);
                tooltip
                    .html(`${monthNames[dataPoint.month-1]} ${dataPoint.year}<br><b>${(dataPoint.variance + 8.66).toFixed(2)}°C</b><br>${dataPoint.variance.toFixed(2)}°C`)
                    .style("left", d.pageX + 10 + "px")
                    .style("top", d.pageY + 10 + "px");
                tooltip.attr("data-year", dataPoint.year);
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
            .attr("id", "x-axis"); 
        
        const axisL = d3.select("svg")
            .append("g")
            .call(yAxis)
            .attr("id", "y-axis");
        
        // Adding legend
        const renderLegend = () => {

            // Legend scale variable
            legendScale = 20;
      
            // Axis
            const lScale = d3.scaleLinear()
                .domain([4.3, 13.3])
                .range([80, 80 + 9 * legendScale])
            
            const lAxis = d3.axisBottom()
                .scale(lScale)
                .tickValues([5.3, 6.3, 7.3, 8.3, 9.3, 10.3, 11.3, 12.3]);

            // Visual
            const legend = d3
                .select("svg")
                .append("g")
                .attr("id", "legend")
                .selectAll("rect")
                .data(colorScale)
                .enter()
                .append("rect")
                .attr("height", legendScale)
                .attr("width", legendScale)
                .style('fill', (d) => d)
                .attr("y", h - 50)
                .attr("x", (d, i) => {
                    return 80 + i * legendScale;
                });
            
            const title = d3.select("svg")
                .append("text")
                .text("Temperature scale [°C]")
                .attr("x", 80)
                .attr("y", h-60)
                ;
            
            // Call scale
            const axisLegend = d3.select("svg")
                .append("g")
                .call(lAxis)
                .attr("id", "l-axis");
            
        }
        renderLegend();
    }
);