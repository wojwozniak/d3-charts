//D3
//Contact with API
let response = d3.json('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json')
    .then((data) => {
        console.log(data);

        // Chart constants
        const w = 760;
        const h = 330;

         //Axes
         const xScale = d3.scaleLinear()
            .domain([new Date("1994-01-01"), new Date("2015-01-01")])
            .range([40, w-20]);
     
        const xAxis = d3.axisBottom()
            .scale(xScale)
            .tickFormat(d3.timeFormat("%Y"))
            .tickSize(5);
        
        const yScale = d3.scaleLinear()
            .domain([2210, 2390])
            .range([h - 20, 10]);
        
        
        const yAxis = d3.axisLeft()
            .scale(yScale);
      


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
            .attr("cy", (d) => {
                console.log(yScale(d.Seconds));
                return yScale(d.Seconds);
            })
            .attr("r", 5);
        
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