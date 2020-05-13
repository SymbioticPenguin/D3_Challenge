// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#scatter")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

//Read the data
d3.csv("../assets/data/data.csv", function(data) {
for(var i = 0; i < data.length; i++){
  console.log(data[i].healthcare)
}
  // Add X axis
  var x = d3.scaleLinear()
    .domain([8, 24])
    .range([ 0, width ]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));
    svg.append("text")             
    .attr("transform",
          "translate(" + (width/2) + " ," + 
                         (height + margin.top + 19) + ")")
    .style("text-anchor", "middle")
    .text("Poverty Rate (%)");

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([4, 20])
    .range([ height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));

    svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x",0 - (height / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Lacking Healthcare %");      

  // Add dots
  svg.append("g")
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
      .attr("cx", function (d) { return x(d.poverty); } )
      .attr("cy", function (d) { return y(d.healthcare); } )
      .attr("r", 8);


  svg.append("g")
    .selectAll("text_input")
    .data(data)
    .enter()
    .append("text")
      .text(d => d.abbr)
      .attr("transform", "translate(-7,4.5)")
      .attr("x", function (d) { return x(d.poverty); } )
      .attr("y", function (d) { return y(d.healthcare); } )
      .attr("fill","white")
      .attr("style","font-size:10px");
})
