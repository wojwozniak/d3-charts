let response = d3.json("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json")
    .then((data) => {
        const dataset = data.monthlyVariance;
        console.log(dataset);

        // Chart constants
        const w = 1340;
        const h = 530;

        // X axis
        const xScale = d3.scaleTime()
            .domain([new Date("1753-01-01"), new Date("2015-01-01")])
            .range([40, w - 20]);
        
        const xAxis = d3.axisBottom()
            .scale(xScale)
            .tickFormat(d3.timeFormat("%Y"))
            .tickSize(1);
        
        
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
            .attr("height", 33)
            .attr("x", (d, i) => {
                return 40 + (d.year-1752)*5;
            })
            .attr("y", (d) => {
                return d.month * 33;
        })
        
        
        // Calling axes
         const axisB = d3.select("svg")
            .append("g")
            .call(xAxis)
            .attr("id", "x-axis"); 
        
        
    }
);