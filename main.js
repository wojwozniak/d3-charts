// Color scale from darkest to brightest
const colorScale = ["#313695", "#717AB9", "#ABD9E9", "#E0F3F8", "#FFFFBF", "#FEE090", "#FBAD61", "#FDAE61", "#D53028"]

// API response
let response = d3.json("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json")
    .then((data) => {
        const dataset = data.monthlyVariance;
        console.log(dataset);

        // Chart constants
        const w = 1450;
        const h = 530;
        const barHeight = 33;
        const barWidth = 5;

        // Calculating color to display
        let variances = [];
        for (let i = 0; i < dataset.length; i++) {
            variances.push(dataset[i].variance);
        }
        let colors = variances.map((v) => {
            if (v < -1.800) {
                return colorScale[0];
            } else if (v < -1.275) {
                return colorScale[1];
            } else if (v < -0.750) {
                return colorScale[2];
            } else if (v < -0.225) {
                return colorScale[3];
            } else if (v < 0.225) {
                return colorScale[4];
            } else if (v < 0.750) {
                return colorScale[5];
            } else if (v < 1.275) {
                return colorScale[6];
            } else if (v < 1.800) {
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
        
        
        // Calling axes
         const axisB = d3.select("svg")
            .append("g")
            .call(xAxis)
            .attr("id", "x-axis"); 
        
        const axisL = d3.select("svg")
            .append("g")
            .call(yAxis)
            .attr("id", "y-axis");
        
    }
);