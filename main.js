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
            .range([40, w-20]);
     
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
            .attr("class", "dot");
        
        
        // Calling axes
        const axisB = d3.select("svg")
            .append("g")
            .call(xAxis)
            .attr('id', 'x-axis');
        
        const axisL = d3.select("svg")
            .append("g")
            .call(yAxis)
            .attr('id', 'y-axis');
        

   
    });