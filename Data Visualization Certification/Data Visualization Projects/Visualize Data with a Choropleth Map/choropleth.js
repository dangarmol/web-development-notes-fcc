const countiesDataURL = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json";
const userEducationDataURL = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json";

const containerWidth = 950;
const containerHeight = 650;
      
// Thanks to jongo45 on Stackoverflow:
// https://stackoverflow.com/questions/7128675/from-green-to-red-color-depend-on-percentage
function getColor(value){
    var hue = ((1-value)*290).toString(10);
    return ["hsl(",hue,",70%,45%)"].join("");
}

// Returns a value between 0 and 1 representing the percentile where the val would be between min and max. No exception handling included.
function getPercentage(val, min, max) {
   return (val - min) / (max - min);
}

function range (start, end) {
   return [...Array(1 + end-start).keys()].map(v => start + v);
}

d3.queue()
  .defer(d3.json, countiesDataURL)
  .defer(d3.json, userEducationDataURL)
  .await(drawMap);

function drawMap(err, geo, edu) {
   if (err) console.log(err);
      
   const maxPercentage = d3.max(edu.map(county => county.bachelorsOrHigher));
   const minPercentage = d3.min(edu.map(county => county.bachelorsOrHigher));
   
   let svg = d3.select("#graphics-container")
               .append("svg")
               .attr("width", containerWidth)
               .attr("height", containerHeight);
   
   // Thanks to LiChoi for this part:
   // https://forum.freecodecamp.org/t/choropleth-map-how-to-tackle-without-copy-pasting/302581
   const path = d3.geoPath();
   
   svg.selectAll("path")
      .data(topojson.feature(geo, geo.objects.counties).features)
      .enter()
      .append("path")
      .attr("d", path)
      .attr("class", "county")
      .attr("data-fips", (d => d.id))
      .attr("fill", function(d) {
         return getColor(getPercentage((edu.filter(county => county.fips == d.id ))[0].bachelorsOrHigher, minPercentage, maxPercentage));
      })
      .attr("data-education", function(d) {
         return edu.filter(county => county.fips == d.id )[0].bachelorsOrHigher;
      })
   
   const legendWidth = containerWidth / 3;
   const legendBarsNum = Math.trunc(maxPercentage) - Math.trunc(minPercentage);
   const legendBarsWidth = legendWidth / legendBarsNum;
   
   var formatPercent = d3.format(".0%");
   
   const legendScale = d3.scaleLinear()
                    .domain([Math.trunc(maxPercentage) / 100, Math.trunc(minPercentage) / 100])
                    .range([legendWidth, 0]);  // Length of the axis.
   
   const legendAxis = d3.axisBottom(legendScale)
                        .tickFormat(formatPercent);

   let legend = d3.select("#graphics-container")
               .append("svg")
               .attr("height", 100)
               .attr("width", legendWidth)
               .style("padding-top", 100)
               .attr("transform", "translate(" + 550 + "," + -725 + ")")  // Position of the axis.
               .call(legendAxis)
               .attr("id", "legend");
      
   legend.selectAll("rect")
      .data(range(Math.trunc(minPercentage), Math.trunc(maxPercentage)))
      .enter()
      .append("rect")
      .attr("x", (d, i) => i * legendBarsWidth)
      .attr("y", (d, i) => 0)
      .attr("width", legendBarsWidth)
      .attr("height", containerWidth / 24)
      .attr("fill", (d) => (getColor(getPercentage(d, minPercentage, maxPercentage))))
      .attr("transform", "translate(" + 0 + "," + -33 + ")")
}