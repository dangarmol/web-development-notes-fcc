const url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json";

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

// Value between 0 and 1. Thanks to jongo45 on Stackoverflow:
// https://stackoverflow.com/questions/7128675/from-green-to-red-color-depend-on-percentage
function getColor(value){
    var hue = ((1-value)*120).toString(10);
    return ["hsl(",hue,",100%,50%)"].join("");
}

// Returns a value between 0 and 1 representing the percentile where the val would be between min and max. No exception handling included.
function getPercentage(val, min, max) {
   return (val - min) / (max - min);
}

d3.json(url, function(error, dataset) {
   
   const minYear = d3.min(dataset.monthlyVariance.map(({ year }) => year));
   const maxYear = d3.max(dataset.monthlyVariance.map(({ year }) => year));
   
	const minMonth = 0;
   const maxMonth = 11;
   
   const minVar = d3.min(dataset.monthlyVariance.map(({ variance }) => variance));
   const maxVar = d3.max(dataset.monthlyVariance.map(({ variance }) => variance));
   
   const padding = 50;
   const additionalLeftPadding = 25;
   const additionalTopPadding = 25;
   const chartWidth = 800;
   const chartHeight = 400;
   const containerWidth = chartWidth + 2 * padding;
   const containerHeight = chartHeight + 2 * padding;
   const rectWidth = chartWidth / (maxYear - minYear);
   const rectHeight = chartHeight / months.length;
   
   let svg = d3.select(".heatmap-container")
               .append("svg")
               .attr("width", containerWidth)
               .attr("height", containerHeight + additionalTopPadding)
               .attr("class", "graph");
   
   svg.selectAll("rect")
      .data(dataset.monthlyVariance)
      .enter()
      .append("rect")
      .attr("x", (d, i) => (padding + additionalLeftPadding + rectWidth * Math.trunc(i / 12)))
      .attr("y", (d, i) => (padding + additionalTopPadding + rectHeight * (i % 12)))
      .attr("width", rectWidth)
      .attr("height", rectHeight)
      .attr("fill", (d) => (getColor(getPercentage(d.variance, minVar, maxVar))))
      .attr("class", "cell")
      .attr("data-month", (d) => d.month - 1)
      .attr("data-year", (d) => d.year)
      .attr("data-temp", (d) => dataset.baseTemperature + d.variance);
   
   const xScale = d3.scaleLinear()
                    .domain([minYear, maxYear])
                    .range([0, chartWidth]);  // Length of the axis.

   const yScale = d3.scaleLinear()
                    .domain([minMonth - 0.5, maxMonth + 0.5])
                    .range([chartHeight, 0]);  // Length of the axis.
   
   const xAxis = d3.axisBottom(xScale).tickFormat(d3.format("d"));
   const yAxis = d3.axisLeft(yScale).tickFormat((d, i) => months[11 - i]);

    svg.append("g")
       .attr("transform", "translate(" + (additionalLeftPadding + padding) + "," + (containerHeight - (padding - additionalTopPadding)) + ")")  // Position of the axis.
       .call(xAxis)
       .attr("id", "x-axis");

    svg.append("g")
       .attr("transform", "translate(" + (additionalLeftPadding + padding) + "," + (padding + additionalTopPadding) + ")")  // Position of the axis.
       .call(yAxis)
       .attr("id", "y-axis");
   
   var tooltipContainer = d3.select(".heatmap-container").append("div")
                    .attr("class", "tooltipContainer")
                    .style("background-color", "white")
                    .style("box-shadow", "5px 10px 18px #888888")
                    .style("border-radius", "15px")
                    .style("height", "50px")
                    .style("width", "160px")
                    .style("opacity", 0)
                    .style("transform", "translate(0px, " + (-containerHeight) + "px)");
   
   var tooltipText = d3.select(".tooltipContainer").append("div")
                    .attr("class", "tooltipContent")
                    .attr("id", "tooltip")
                    .style("height", "45px")
                    .style("width", "160px")
                    .style("padding-top", "8px")
                    .style("text-align", "center")
                    .style("opacity", 0)
                    .html("TooltipFirst!<br>Secondline!");
   
   const legendScale = d3.scaleLinear()
                    .domain([Math.trunc(minVar), Math.ceil(maxVar)])
                    .range([chartWidth / 2, 0]);  // Length of the axis.
   
   const legendAxis = d3.axisBottom(legendScale);

   var legend = svg.append("g")
                   .attr("transform", "translate(" + 275 + "," + 45 + ")")  // Position of the axis.
                   .call(legendAxis)
                   .attr("id", "legend");
   
   legend.selectAll("rect")
      .data([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
      .enter()
      .append("rect")
      .attr("x", (d, i) => i * (chartWidth / 24))
      .attr("y", (d, i) => -chartWidth / 24)
      .attr("width", chartWidth / 24)
      .attr("height", chartWidth / 24)
      .attr("fill", (d) => (getColor(getPercentage(d, 0, 11))))
   
   svg.selectAll("rect")
      .on("mouseover", function(d, i) {
         tooltipContainer.transition()
           .duration(0)
           .style("opacity", 0.7)
           .style("transform", "translate(" + ((d.year - minYear) * rectWidth) + "px," + -(3 * padding + ((12 - d.month) * rectHeight)) + "px" + ")");
         tooltipText.transition()
           .duration(100)
           .style("opacity", 1);
         tooltipText.html(months[d.month] + " " + d.year + "<br>" + (dataset.baseTemperature + d.variance).toFixed(2) + "ºC avg.")
           .attr("data-year", d.year);
       })
       .on("mouseout", function(d, i) {
         tooltipText.transition()
           .duration(500)
           .style("opacity", 0);
         tooltipContainer.transition()
           .duration(1000)
           .style("opacity", 0);
       });
});