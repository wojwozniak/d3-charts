let response = d3.json("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json")
    .then((data) => {
        console.log(data);

        // Chart constants
        const w = 760;
        const h = 330;

        // X axis
        const xScale = d3.scaleTime()
            .domain([new Date("01-01-1753"), new Date("01-01-2015")])
            .range([40, w - 20]);
        
        const xAxis = d3.axisBottom()
            .scale(xScale)
            .tickFormat(d3.timeFormat("%Y"))
            .tickSize(10);
        
        
        // Displaying chart
        const visual = d3.select("#visHolder")
            .append("svg")
            .attr("width", w)
            .attr("height", h)
            .selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
        
        
        // Calling axes
        const axisB = d3.select("svg")
            .append("g")
            .call(xAxis)
            .attr("id", "x-axis");
        
        
    }
);