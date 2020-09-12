const url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json";

d3.json(url, function(error, dataset) { 
  
   /*{
      "Time": "36:50",
      "Place": 1,
      "Seconds": 2210,
      "Name": "Marco Pantani",
      "Year": 1995,
      "Nationality": "ITA",
      "Doping": "Alleged drug use during 1995 due to high hematocrit levels",
      "URL": "https://en.wikipedia.org/wiki/Marco_Pantani#Alleged_drug_use"
   }*/
   
   let years = [];
   let times = [];
   
   dataset.forEach(element => years.push(element["Year"]));
   dataset.forEach(element => times.push(element["Seconds"]));
   
   let data = [];
   
   dataset.forEach(function(element) {
      let newElement = {};
      newElement.year = element["Year"];
      newElement.seconds = element["Seconds"];
      newElement.time = element["Time"];
      newElement.name = element["Name"];
      data.push(newElement);
   });
   
   console.log(years);
   console.log(times);
   console.log(dataset);
   
   const maxYear = d3.max(years);
   const minYear = d3.min(years);
   const maxTime = d3.max(times);
   const minTime = d3.min(times);
   
   console.log(maxYear);
   console.log(minYear);
   console.log(maxTime);
   console.log(minTime);
   
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
  
   svg.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", (d, i) => (padding + ((d.year - minYear + 1) / (maxYear - minYear + 2)) * (chartWidth)))
      .attr("cy", (d, i) => (padding + ((d.seconds - minTime) / (maxTime - minTime)) * (chartHeight)))
      .attr("r", 5)
      .attr("fill", "black")
      .attr("class", "dot")
      .attr("data-xvalue", (d, i) => d.year)
      .attr("data-yvalue", (d, i) => new Date(d.seconds * 1000))
   
   const xScale = d3.scaleLinear()
                    .domain([minYear - 1, maxYear + 1])
                    //.domain([minYear, maxYear])
                    .range([0, chartWidth]);

   const yScale = d3.scaleLinear()
                    .domain([new Date(maxTime * 1000), new Date(minTime * 1000)])
                    .range([chartHeight, 0]);
   
   const xAxis = d3.axisBottom(xScale).tickFormat(d3.format("d"));
   const yAxis = d3.axisLeft(yScale).tickFormat(d3.timeFormat("%M:%S"));

    svg.append("g")
       .attr("transform", "translate(" + padding + "," + (containerHeight - padding) + ")")
       .call(xAxis)
       .attr("id", "x-axis");

    svg.append("g")
       .attr("transform", "translate(" + padding + "," + padding + ")")
       .call(yAxis)
       .attr("id", "y-axis");
   
   var tooltipContainer = d3.select(".scatterplot-container").append("div")
                    .attr("class", "tooltipContainer")
                    .style("background-color", "#FF8C00")
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
                    .style("font-family", "Monospace")
                    .html("Tooltip!<br>Secondline!");
   
   svg.selectAll("circle")
      .on("mouseover", function(d, i) {
         tooltipContainer.transition()
           .duration(0)
           .style("opacity", 0.9)
           .style("transform", "translate(" + (padding + 10 + ((d.year - minYear + 1) / (maxYear - minYear + 2)) * (chartWidth)) + "px, " + (padding - containerHeight - 28 + ((d.seconds - minTime) / (maxTime - minTime)) * (chartHeight)) + "px)");
         tooltipText.transition()
           .duration(100)
           .style("opacity", 0.9);
         tooltipText.html(d.name + "<br>" + d.year + ", " + d.time + " min")
           .attr("data-year", d.year)
       })
       .on("mouseout", function(d, i) {
         tooltipText.transition()
           .duration(500)
           .style("opacity", 0);
         tooltipContainer.transition()
           .duration(500)
           .style("opacity", 0);
       });
   
   var legendContainer = d3.select(".scatterplot-container").append("div")
                    .attr("class", "legendContainer")
                    .style("background-color", "#87ceeb")
                    .style("box-shadow", "5px 10px 18px #888888")
                    .style("border-radius", "15px")
                    .style("height", "50px")
                    .style("width", "150px")
                    .style("opacity", 1)
                    .style("transform", "translate(730px, -" + (containerHeight / 1.5) + "px)");
   
   var legendText = d3.select(".legendContainer").append("div")
                    .attr("class", "legendContent")
                    .attr("id", "legend")
                    .style("height", "45px")
                    .style("width", "150px")
                    .style("padding-top", "6px")
                    .style("text-align", "center")
                    .style("font-family", "Arial")
                    .style("opacity", 1)
                    .html("x-axis: Years<br>y-axis: Time taken");
});