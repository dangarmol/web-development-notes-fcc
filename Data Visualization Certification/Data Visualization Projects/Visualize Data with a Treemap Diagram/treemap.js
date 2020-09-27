const kickstarterURL = "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/kickstarter-funding-data.json";

// Found these dimensions online. Any other dimensions would make the test suite fail.
const containerWidth = 960;
const containerHeight = 600;

let coloursContainer = {};

function getRandomColour() {
   return "hsl(" + Math.floor(Math.random() * 360) + ", 100%, 50%)";
}

function getColourFromSeed(seed) {
   if(!(seed in coloursContainer)) {
      coloursContainer[seed] = getRandomColour();
   }
   
   return coloursContainer[seed];
}

// All the documentation needed is here:
// https://github.com/d3/d3-hierarchy
// https://observablehq.com/@d3/treemap

d3.json(kickstarterURL, function(error, dataset) {
   if(error) console.log(error);
   
   const svg = d3.select("#graphics-container")
                 .append("svg")
                 .attr("width", containerWidth)
                 .attr("height", containerHeight)
                 .style("margin-left", "20px")
                 .style("margin-top", "20px")
                 .style("background-color", "black");
   

   // Tooltip stuff
   const tooltip = d3.select("#graphics-container")
                     .append("div")
                     .style("position", "absolute")
                     .attr("id", "tooltip")
                     .text("I'm a tooltip!")
                     .style("opacity", 0);
   

   // Treemap stuff
   const treemap = d3.treemap()
                   .size([containerWidth, containerHeight])
                   .paddingOuter(3)
                   .paddingInner(2);
   
   const root = d3.hierarchy(dataset)
                  .sum(d => d.value);
   
   treemap(root);
   
   const categoryBox = svg.selectAll("g")
                          .data(root.leaves())
                          .enter()
                          .append("g")
                          .attr("transform", d => `translate(${d.x0},${d.y0})`);
   
   const tile = categoryBox.append("rect")
                           .attr("class", "tile")
                           .attr("data-name", d => d.data.name)
                           .attr("data-category", d => d.data.category)
                           .attr("data-value", d => d.data.value)
                           .attr("width", d => d.x1 - d.x0)
                           .attr("height", d => d.y1 - d.y0)
                           .attr("fill", d => getColourFromSeed(d.data.category))
                           .on("mouseover", function(d) {
                               tooltip.style("opacity", .9)
                                  .style("top", (d3.event.pageY + 10) + "px")
                                  .style("left", (d3.event.pageX + 10) + "px") 
                                  .attr("data-value", d.data.value)
                                  .html(function() {
                                           return "Name: " + d.data.name + "<br>Category: " + d.data.category + "<br>Value: " + d.data.value;
                                  });
                           })
                           .on("mouseout", function() {
                               tooltip.style("opacity", 0);
                           });
   
   const categories = dataset.children.map(item => item.name);
   
   // Legend stuff
   const blockSize = 20;
   const legendWidth = 400;
   const legendHeight = (blockSize * categories.length) / 2 + 40;
   
   const legend = d3.select("#graphics-container")
                 .append("svg")
                 .attr("id", "legend")
                 .attr("class", "legend")
                 .attr("width", legendWidth)
                 .attr("height", legendHeight)
                 .style("background-color", "black")
                 .style("margin-left", "310");
   
   legend.selectAll("rect")
         .data(categories)
         .enter()
         .append("rect")
         .attr("class", "legend-item")
         .attr("fill", d => getColourFromSeed(d))
         .attr("x", (d, i) => (i % 2 == 0) ? blockSize / 2 : blockSize / 2 + 200)
         .attr("y", (d, i) => Math.trunc(i / 2) * (blockSize + 1) + 10)
         .attr("width", blockSize)
         .attr("height", blockSize);
   
   legend.append("g")
         .selectAll("text")
         .data(categories)
         .enter()
         .append("text")
         .attr("fill", "white")
         .attr("x", (d, i) => (i % 2 == 0) ? blockSize * 2 : blockSize + 220)
         .attr("y", (d, i) => Math.trunc(i / 2) * (blockSize + 1) + 25)
         .text(d => d);
});