require('./app.scss');
require('file?name=[name].[ext]!../public/index.html');
const sampleData = require('json!./user_sample.json');
import React from 'react';
import ReactDOM from 'react-dom';

// require `react-d3-core` for Chart component, which help us build a blank svg and chart title.
const Chart = require('react-d3-core').Chart;
// require `react-d3-basic` for Line chart component.
const LineChart = require('react-d3-basic').LineChart;


// TODO: Implement socket.io
// https://github.com/socketio/socket.io-client
// const socketServer = require('socket.io-client')('http://localhost');
// const socketClient = require('socket.io-client')('http://localhost');

const App = React.createClass({
  getInitialState () {
    return {
      data: sampleData
    }
  },
  componentDidMount(){
    this._renderBubbleZoom();
  },

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

    function zoom(d, i){
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


  _renderChart(){
    const width = 700,
        height = 300,
        margins = {left: 100, right: 100, top: 50, bottom: 50},
        title = 'User sample',
    // chart series,
    // field: is what field your data want to be selected
    // name: the name of the field that display in legend
    // color: what color is the line
        chartSeries = [
          {
            field: 'BMI',
            name: 'BMI',
            color: '#ff7f0e'
          }
        ],
    // your x accessor
        x = (d)=> {
          return d.index;
        };
    return <Chart title={title}
                  width={width}
                  height={height}
                  margins={margins}>
      <LineChart margins={margins}
                 title={title}
                 data={this.state.data}
                 width={width}
                 height={height}
                 chartSeries={chartSeries}
                 x={x}/>
    </Chart>
  },


  render(){
    return (
        <div>
          <header className="search">
            <input type="text" placeholder="websocket url"/>
          </header>
          <section>
            {this._renderChart()}
          </section>
        </div>
    )
  }
});
ReactDOM.render(<App/>, document.getElementById('app'));

/* Example of getting a query string
 * import queryString from 'query-string';
 * const parsed = queryString.parse(location.search);
 * goto: http://localhost:8080/?url=test-websocket-url
 * test: console.log(parsed);
 * src: https://github.com/sindresorhus/query-string
 * */