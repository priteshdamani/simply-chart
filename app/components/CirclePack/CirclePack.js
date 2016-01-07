require('./CirclePack.scss');
import React from 'react';
// require `react-d3-core` for Chart component, which help us build a blank svg and chart title.
const Chart = require('react-d3-core').Chart;


const CirclePack = React.createClass({
  //propTypes: {
  //  height: React.PropTypes.number.isRequired,
  //  width: React.PropTypes.number.isRequired
  //},

  _renderBubbleZoom() {
    var w = 1280,
        h = 800,
        r = 720,
        x = d3.scale.linear().range([0, r]),
        y = d3.scale.linear().range([0, r]),
        node,
        root;

    var pack = d3.layout.pack()
        .size([r, r])
        .value((d)=> {
          return d.size;
        });

    var vis = d3.select("body").insert("svg:svg", "h2")
        .attr("width", w)
        .attr("height", h)
        .append("svg:g")
        .attr("transform", "translate(" + (w - r) / 2 + "," + (h - r) / 2 + ")");

    function zoom(d, i) {
      var k = r / d.r / 2;
      x.domain([d.x - d.r, d.x + d.r]);
      y.domain([d.y - d.r, d.y + d.r]);

      var t = vis.transition()
          .duration(d3.event.altKey ? 7500 : 750);

      t.selectAll("circle")
          .attr("cx", (d)=> {
            return x(d.x);
          })
          .attr("cy", (d)=> {
            return y(d.y);
          })
          .attr("r", (d)=> {
            return k * d.r;
          });

      t.selectAll("text")
          .attr("x", (d)=> {
            return x(d.x);
          })
          .attr("y", (d)=> {
            return y(d.y);
          })
          .style("opacity", (d)=> {
            return k * d.r > 20 ? 1 : 0;
          });

      node = d;
      d3.event.stopPropagation();
    }


    d3.json("./flare.json", (data)=> {
      node = root = data;

      const nodes = pack.nodes(root);

      vis.selectAll("circle")
          .data(nodes)
          .enter().append("svg:circle")
          .attr("class", (d)=> {
            return d.children ? "parent" : "child";
          })
          .attr("cx", (d)=> {
            return d.x;
          })
          .attr("cy", (d)=> {
            return d.y;
          })
          .attr("r", (d)=> {
            return d.r;
          })
          .on("click", (d)=> {
            return zoom(node == d ? root : d);
          });

      vis.selectAll("text")
          .data(nodes)
          .enter().append("svg:text")
          .attr("class", (d)=> {
            return d.children ? "parent" : "child";
          })
          .attr("x", (d)=> {
            return d.x;
          })
          .attr("y", (d)=> {
            return d.y;
          })
          .attr("dy", ".35em")
          .attr("text-anchor", "middle")
          .style("opacity", (d)=> {
            return d.r > 20 ? 1 : 0;
          })
          .text((d)=> {
            return d.name;
          });

      d3.select(window).on("click", ()=> {
        zoom(root);
      });
    });
  },

  componentDidMount(){
    this._renderBubbleZoom();
    //this.setState({
    //  data: {}
    //});
  },
  render(){
    return (
        <div>
        </div>
    )
  }
});
export default CirclePack;


