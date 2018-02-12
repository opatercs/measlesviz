// slider
var width = 10;
var height = 10;
 
var holder = d3.select("body")
      .append("svg")
      .attr("width", width)    
      .attr("height", height); 

function update_data(input) {
  // init
    var population = 1000;
    var S = population - (population*(input/100));
    var a = .009;
    var b = (1/14);
    var I = 1;
    // var R = 1
    // var S_rate = -aSI;
    // var I_rate = (a*S*I) - (b*I);

    // S_0_rate = -(a*S*I);
    dataset[0]["y"] = input*0 + 1;

    var S_1 = S;
    var S_1_rate = -(a*S*I);
    var I_1 = 1 + (a*S*I) - (b*I);
    dataset[1]["y"] = I_1;

    var S_2 = S_1 + S_1_rate;
    var I_2_rate = (a*S_2*I_1) - (b * I_1);
    var I_2 = I_1 + I_2_rate;
    var S_2_rate = -(a*S_2*I_2);
    dataset[2]["y"] = I_2;


    var S_3 = S_2 + S_2_rate;
    var I_3_rate = (a*S_3*I_2) - (b * I_2);
    var I_3 = I_2 + I_3_rate;
    var S_3_rate = -(a*S_3*I_3);
    dataset[3]["y"] = I_3;

    var S_4 = S_3 + S_3_rate;
    var I_4_rate = (a*S_4*I_3) - (b * I_3);
    var I_4 = I_3 + I_4_rate;

        if (I_4 <= 0) {
      I_4 = 0;
    }
    var S_4_rate = -(a*S_4*I_4);
    dataset[4]["y"] = I_4;


    var S_5 = S_4 + S_4_rate;
    var I_5_rate = (a*S_5*I_4) - (b * I_4);
    var I_5 = I_4 + I_5_rate;

        if (I_5 <= 0) {
      I_5 = 0;
    }
    var S_5_rate = -(a*S_5*I_5);
    dataset[5]["y"] = I_5;

    var S_6 = S_5 + S_5_rate;
    var I_6_rate = (a*S_6*I_5) - (b * I_5);
    var I_6 = I_5 + I_6_rate;

        if (I_6 <= 0) {
      I_6 = 0;
    }
    var S_6_rate = -(a*S_6*I_6);
    dataset[6]["y"] = I_6;

    var S_7 = S_6 + S_6_rate;
    var I_7_rate = (a*S_7*I_6) - (b * I_6);
    var I_7 = I_6 + I_7_rate;

        if (I_7 <= 0) {
      I_7 = 0;
    }
    var S_7_rate = -(a*S_7*I_7);
    dataset[7]["y"] = I_7;
}

// when the input range changes, update the dataset
d3.select("#nRadius").on("input", function() 
{   console.log(this.value);
    update(+this.value);
    update_data(+this.value);
    // update(+this.value);
});

// Initial starting slider number
update(50);

// update the slider details
function update(nRadius) {

  // adjust the text on the range slider
  d3.select("#nRadius-value").text(nRadius);
  d3.select("#nRadius").property("value", nRadius);

  // update the circle radius
  // holder.selectAll("circle") 
  //   .attr("r", nRadius);
}

d3.select("nRadius").value


function update_graph() {

  // get the data again
  var dataset = d3.select("#nRadius").on("input", function() 
  { update(+this.value);
    update_data(+this.value);});

  // where we want to make changes
  var svg = d3.select("#graph").transition();

    svg.select(".line")   // change the line
              .duration(750)
              // .datum(dataset)
              .attr("d", line);
             //  .x(function(d, i) { return xScale(i); }) // set the x values for the line generator
             //  .y(function(d) { return yScale(d.y); }) // set the y values for the line generator 
             // .curve(d3.curveMonotoneX);
      svg.select("x axis") // change the x axis
                .duration(750)
                .call(xScale);

      svg.select("y axis") // change the y axis
                .duration(750)
                .call(yScale);

      svg.selectAll(".dot")
        .duration(750)
        // .data(dataset)
        // .enter().append("circle") // Uses the enter().append() method
        // .attr("class", "dot") // Assign a class for styling
        // .attr("cx", function(d, i) { return xScale(i) })
        .attr("cy", function(d) {return yScale(d.y) })
        // .attr("r", 5);
}


// chart

// 2. Use the margin convention practice 
var margin = {top: 50, right: 50, bottom: 50, left: 50}
  , width = window.innerWidth - margin.left*6 - margin.right*6 // Use the window's width 
  , height = window.innerHeight - margin.top*4 - margin.bottom*4; // Use the window's height

// The number of datapoints
var n = 8;

// 5. X scale will use the index of our data
var xScale = d3.scaleLinear()
    .domain([0, n-1]) // input
    .range([0, width]); // output

// 6. Y scale will use the randomly generate number 
var yScale = d3.scaleLinear()
    .domain([0, 250]) // input 
    .range([height, 0]); // output 

// 7. d3's line generator
var line = d3.line()
    .x(function(d, i) { return xScale(i); }) // set the x values for the line generator
    .y(function(d) { return yScale(d.y); }) // set the y values for the line generator 
    .curve(d3.curveMonotoneX) // apply smoothing to the line

// 8. An array of objects of length N. Each object has key -> value pair, the key being "y" and the value is a random number
var dataset = 
// d3.range(n).map(function(d) { return {"y": d3.randomUniform(1)() } })
[{
    y: 1
}, {
    y: 5
}, {
    y: 29
}, {
    y: 123
}, {
    y: 70
}, {
    y: 55
}, {
    y: 48
} ,{
    y: 42
}];

var div = d3.select("#graph").append("div") 
    .attr("class", "tooltip")       
    .style("opacity", 0);

// 1. Add the SVG to the page and employ #2
var svg = d3.select("#graph").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom+10)
    .append("g")
    // .attr("class", "transform")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// 3. Call the x axis in a group tag
svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xScale)); // Create an axis component with d3.axisBottom

svg.append("text")             
    .attr("transform",
            "translate(" + (width/2) + " ," + 
                           (height + margin.top ) + ")")
    .style("text-anchor", "middle")
    .text("Time (in days)");

// 4. Call the y axis in a group tag
svg.append("g")
    .attr("class", "y axis")
    .call(d3.axisLeft(yScale)); // Create an axis component with d3.axisLeft

svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", -3 - margin.left)
    .attr("x",-3 - (height / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("# Infected");  

// 9. Append the path, bind the data, and call the line generator 
svg.append("path")
    .datum(dataset) // 10. Binds data to the line 
    .attr("class", "line") // Assign a class for styling 
    .attr("d", line); // 11. Calls the line generator 

// 12. Appends a circle for each datapoint 
svg.selectAll(".dot")
    .data(dataset)
    .enter().append("circle") // Uses the enter().append() method
    .attr("class", "dot") // Assign a class for styling
    .attr("cx", function(d, i) { return xScale(i) })
    .attr("cy", function(d) { return yScale(d.y) })
    .attr("r", 5)
    .on("mouseover", function(d) {    
        div.transition()    
            .duration(200)    
                .style("opacity", .9);    
            div.html(d.y)  
                .style("left", (d3.event.pageX) + "px")   
                .style("top", (d3.event.pageY - 28) + "px");  
            })          
        .on("mouseout", function(d) {   
            div.transition()    
                .duration(500)    
                .style("opacity", 0);});

