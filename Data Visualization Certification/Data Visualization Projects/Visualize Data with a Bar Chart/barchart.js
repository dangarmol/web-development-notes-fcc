const url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";

d3.json(url, function(error, dataset) { 
  
   let dates = [];
   let values = [];
   
   dataset.data.forEach(element => dates.push(element[0]));
   dataset.data.forEach(element => values.push(element[1]));
   
   const padding = 50;
   const chartWidth = 900;
   const chartHeight = 500;
   const barWidth = (chartWidth - (2 * padding)) / values.length;
   const barDistance = barWidth;
   const maxValue = d3.max(values);

   const quarters = dates.map(function(item) {
      let quarter = [];
      quarter[0] = item.split("-")[0];
      const month = item.split("-")[1];
      switch(month) {
         case "01":
            quarter[1] = "Q1";
            break;
         case "04":
            quarter[1] = "Q2";
            break;
         case "07":
            quarter[1] = "Q3";
            break;
         case "10":
            quarter[1] = "Q4";
            break;
         default:
            console.log("Unrecognised month: " + month);
      }
      return quarter;
   });
   
   var tooltipContainer = d3.select(".barchart-container").append("div")
                    .attr("class", "tooltipContainer")
                    .style("background-color", "#87ceeb")
                    .style("height", "50px")
                    .style("width", "120px")
                    .style("opacity", 0)
                    .style("transform", "translate(60px, 400px)");
   
   var tooltipText = d3.select(".tooltipContainer").append("div")
                    .attr("class", "tooltipContainer")
                    .attr("id", "tooltip")
                    .style("height", "45px")
                    .style("width", "120px")
                    .style("padding-top", "8px")
                    .style("text-align", "center")
                    .style("opacity", 0)
                    .style("font-family", "Monospace")
                    .html("Firstline!<br>Secondline!");
      
   let svg = d3.select(".barchart-container")
                  .append("svg")
                  .attr("width", chartWidth)
                  .attr("height", chartHeight)
                  .attr("class", "graph");
  
   svg.selectAll("rect")
      .data(values)
      .enter()
      .append("rect")
      .attr("x", (d, i) => padding + (i * barDistance))
      .attr("y", (d, i) => (chartHeight - (2 * padding)) * (1 - (d / maxValue)) + padding)
      .attr("width", barWidth)
      .attr("height", (d, i) => (d / maxValue) * (chartHeight - (2 * padding)))
      .attr("fill", "black")
      .attr("class", "bar")
      .attr("data-date", (d, i) => dates[i])
      .attr("data-gdp", (d, i) => values[i])
      .on("mouseover", function(d, i) {
         tooltipContainer.transition()
           .duration(0)
           .style("opacity", 0.9)
           .style("transform", "translate(" + (70 + (i * barWidth)) + "px, 400px)");
         tooltipText.transition()
           .duration(100)
           .style("opacity", 0.9);
         tooltipText.html(quarters[i][1] + " " + quarters[i][0] + "<br>" + values[i] + " B$")
           .attr("data-date", dates[i])
       })
       .on("mouseout", function(d, i) {
         tooltipText.transition()
           .duration(500)
           .style("opacity", 0);
         tooltipContainer.transition()
           .duration(500)
           .style("opacity", 0);
       });
     
   const xScale = d3.scaleLinear()
                    .domain([d3.min(quarters, (d) => d[0]), 2015.75])
                    .range([padding, chartWidth - padding]); // There are better solutions for the ".75" but this will do the trick for this exercise.

   const yScale = d3.scaleLinear()
                    .domain([0, maxValue])
                    .range([chartHeight - padding, padding]);
   
   const xAxis = d3.axisBottom(xScale).tickFormat(d3.format("d"));
   const yAxis = d3.axisLeft(yScale);

    svg.append("g")
       .attr("transform", "translate(0," + (chartHeight - padding) + ")")
       .call(xAxis)
       .attr("id", "x-axis");

    svg.append("g")
       .attr("transform", "translate(" + (padding) + ", 0)")
       .call(yAxis)
       .attr("id", "y-axis");
   
    svg.append("text")
       .attr("transform", "rotate(-90)")
       .attr("x", -250)
       .attr("y", 70)
       .attr("class", "typewriter")
       .text("Gross Domestic Product");
});