const url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json";
 
d3.json(url, function(error, dataset) {
	const maxYear = d3.max(years);
   const minYear = d3.min(years);
   const maxTime = d3.max(times);
   const minTime = d3.min(times);
   
   const padding = 50;
   const chartWidth = 800;
   const chartHeight = 400;
   const containerWidth = chartWidth + 2 * padding;
   const containerHeight = chartHeight + 2 * padding;
   
   let svg = d3.select(".scatterplot-container")
               .append("svg")
               .attr("width", containerWidth)
               .attr("height", containerHeight)
               .attr("class", "graph");
});