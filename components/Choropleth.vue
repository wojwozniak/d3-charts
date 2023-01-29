<template>
    <h1 id="title">United States Educational Attanment</h1>
    <p id="description">Percentage of adults age 25 and older with bachelor's degree or higher (2010-2014)</p>
    <div id="visHolder" class="choropleth">
        <svg height="650" width="1000"></svg>
    </div>
</template>

<script>
import * as d3 from 'd3'
import styles from '~/assets/css/Choropleth.scss'

export default {
    name: 'Choropleth',
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
            const EDUCATION_LINK = 'https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/for_user_education.json';
            const COUNTY_LINK = 'https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/counties.json';

            // Chart constants
            const svg = d3.select("svg");
            const path = d3.geoPath();

            // Contact with API
            Promise.all([d3.json(COUNTY_LINK), d3.json(EDUCATION_LINK)])
                .then((data) => renderChart(data[0], data[1]))
                .catch((err) => console.log(err));
                
            // D3
            function renderChart(us, education) {

                // Colour scale and colour picker
                const COLOR_SCALE = ["#1E90FF", "#187DE9", "#126AD2", "#0C56BC", "#0643A5", "#00308F"];
                function setColour(score) {
                    if (score > 63) {
                        return COLOR_SCALE[5];
                    } else if (score > 51) {
                        return COLOR_SCALE[4]
                    }
                    else if (score > 39) {
                        return COLOR_SCALE[3]
                    }
                    else if (score > 27) {
                        return COLOR_SCALE[2]
                    } else if (score > 15) {
                        return COLOR_SCALE[1]
                    } else return COLOR_SCALE[0];
                }

                //Adding tooltip
                let tooltip = d3
                .select("body")
                .append("div")
                .attr("class", "tooltip")
                .attr("id", "tooltip")
                .style("opacity", 0);

                // Render chart
                svg
                    .append("g")
                    .attr("class", "counties")
                    .selectAll("path")
                    .data(topojson.feature(us, us.objects.counties).features)
                    .enter()
                    .append("path")
                    .attr("class", "county")
                    .attr("fill", (d) => {
                        const colour = education.filter((county) => {
                            return county.fips === d.id;
                        })
                        if (colour[0]) {
                            return setColour(colour[0].bachelorsOrHigher);
                        } else return "white";
                    })
                    .attr("d", path)
                    .attr("data-fips", (d) => d.id)
                    .attr("data-education", (d) => {
                        const result = education.filter((county) => {
                            return county.fips === d.id;
                        })
                        if (result[0]) {
                            return result[0].bachelorsOrHigher;
                        } else return "No data :("
                    })
                
                    //Displaying tooltip
                    .on("mouseover", (d, dataPoint) => {
                        tooltip
                            .transition()
                            .duration(200)
                            .style("opacity", 0.9);
                        tooltip
                            .html(() => {
                                const help = education.filter((county) => {
                                    return county.fips === dataPoint.id;
                                })
                                if (help[0]) {
                                    return `${help[0].area_name}, <b>${help[0].state}</b><br><b>${help[0].bachelorsOrHigher}%</b> of population with Bachellors Degree or Higher`
                                } else return `No data :(`
                            })
                            .attr("data-education", () => {
                                const help = education.filter((county) => {
                                    return county.fips === dataPoint.id;
                                })
                                if (help[0]) {
                                    return help[0].bachelorsOrHigher;
                                }
                            })
                            .style("left", d.pageX + 10 + "px")
                            .style("top", d.pageY + 10 + "px");
                    })
                    .on("mouseout", () => {
                        tooltip
                            .transition()
                            .duration(400)
                            .style("opacity", 0);
                    });
                
                const state_borders = svg.append("path")
                    .attr("class", "state-borders")
                    .attr("d", path(
                    topojson.mesh(us, us.objects.states, (a, b) => a !== b)
                    ));

                
                const renderLegend = () => {

                    const legendScale = 40;

                    // Axis
                    const lScale = d3.scaleLinear()
                        .domain([3, 75])
                        .range([620, 620 + 6*legendScale])
                    
                    const lAxis = d3.axisBottom()
                        .scale(lScale)
                        .tickSize(legendScale)
                        .tickValues([3, 15, 27, 39, 51, 63,75]);
                    
                    const legend = d3
                        .select("svg")
                        .append("g")
                        .attr("id", "legend")
                        .selectAll("rect")
                        .data(COLOR_SCALE)
                        .enter()
                        .append("rect")
                        .attr("height", 30)
                        .attr("width", legendScale)
                        .style('fill', (d) => d)
                        .attr("y", 22)
                        .attr("x", (d, i) => {
                            return 620 + i * legendScale;
                        });

                    const title = d3.select("svg")
                        .append("text")
                        .text("Color scale")
                        .attr("x", 620)
                        .attr("y", 15)
                        .attr("id", "legend-title");
                        
                    // Call scale
                    const axisLegend = d3.select("svg")
                        .append("g")
                        .call(lAxis)
                        .attr("id", "l-axis")
                        .style("font-size", "15px");
                        
                }
                renderLegend();
            
            }
        }

    }
}
</script>