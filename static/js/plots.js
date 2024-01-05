// plots.js

// Load data from the API endpoint
d3.json("/api/v1.0/test").then((data) => {
  console.log(data); // Verify that the data is loaded correctly

  // Set up scatter plot dimensions
  const margin = { top: 20, right: 20, bottom: 70, left: 70 };
  const width = 600 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  // Create SVG container
  const svg = d3
    .select('#scatter-plot')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  // Create scales
  const xScale = d3.scaleLinear().range([0, width]).domain([0, 1]); // Assuming energy values range from 0 to 1
  const yScale = d3.scaleLinear().range([height, 0]).domain([0, 1]);

  // Add circles to represent data points
  svg.selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx', d => xScale(d.energy))
    .attr('cy', d => yScale(d.danceability))
    .attr('r', 10);

  // Add x-axis
  svg.append('g')
    .attr('transform', 'translate(0,' + height + ')')
    .call(d3.axisBottom(xScale))
    .append('text')
    .attr('x', width / 2)
    .attr('y', margin.bottom - 10)
    .attr('dy', '0.71em')
    .style('text-anchor', 'middle')
    .text('Energy');

  // Add y-axis
  svg.append('g')
    .call(d3.axisLeft(yScale))
    .append('text')
    .attr('transform', 'rotate(-90)')
    .attr('x', -height / 2)
    .attr('y', -margin.left + 15)
    .attr('dy', '0.71em')
    .style('text-anchor', 'middle')
    .text('Danceability');
});
