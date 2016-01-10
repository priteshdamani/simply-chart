require('./CirclePack.scss');
require('react-d3-core');
import React from 'react';

const jsonData = './flare-small.json';

const CirclePack = React.createClass({
  propTypes: {
    height: React.PropTypes.number.isRequired,
    width: React.PropTypes.number.isRequired,
    r: React.PropTypes.number.isRequired
  },

  getInitialState() {
    return {
      data: {
        "name": "",
        "children": [
          {
            "name": "Microsite",
            "children": [
              {
                "name": "Clicks",
                "size": 253
              },
              {
                "name": "Impressions",
                "size": 34
              }
            ]
          },
          {
            "name": "Superwidget",
            "children": [
              {
                "name": "Clicks",
                "size": 334
              },
              {
                "name": "Impressions",
                "size": 500
              }
            ]
          }
        ]
      }
    }
  },

  componentDidMount(){
    this._renderCircle();
    //this.setState({
    //  data: {}
    //});
  },

  _renderCircle() {
    const w = this.props.width,
        h = this.props.height,
        r = this.props.r;
    var x = d3.scale.linear().range([0, r]),
        y = d3.scale.linear().range([0, r]),
        node,
        root;
    const pack = d3.layout.pack()
        .size([r, r])
        .value((d)=> {
          return d.size;
        });

    const vis = d3.select('.circle-pack').insert('svg:svg')
        .attr('width', w)
        .attr('height', h)
        .append('svg:g')
        .attr('transform', 'translate(' + (w - r) / 2 + ',' + (h - r) / 2 + ')');

    const zoom = (d, i)=> {
      const k = r / d.r / 2;
      x.domain([d.x - d.r, d.x + d.r]);
      y.domain([d.y - d.r, d.y + d.r]);

      var t = vis.transition()
          .duration(d3.event.altKey ? 7500 : 750);

      t.selectAll('circle')
          .attr('cx', (d)=> {
            return x(d.x);
          })
          .attr('cy', (d)=> {
            return y(d.y);
          })
          .attr('r', (d)=> {
            return k * d.r;
          });

      t.selectAll('text')
          .attr('x', (d)=> {
            return x(d.x);
          })
          .attr('y', (d)=> {
            return y(d.y);
          })
          .style('opacity', (d)=> {
            return k * d.r > 20 ? 1 : 0;
          });

      node = d;
      d3.event.stopPropagation();
    };


    node = root = this.state.data;

    const nodes = pack.nodes(root);

    vis.selectAll('circle')
        .data(nodes)
        .enter().append('svg:circle')
        .attr('class', (d)=> {
          return d.children ? 'parent' : 'child';
        })
        .attr('cx', (d)=> {
          return d.x;
        })
        .attr('cy', (d)=> {
          return d.y;
        })
        .attr('r', (d)=> {
          return d.r;
        })
        .on('click', (d)=> {
          return zoom(node == d ? root : d);
        });

    vis.selectAll('text')
        .data(nodes)
        .enter().append('svg:text')
        .attr('class', (d)=> {
          return d.children ? 'parent' : 'child';
        })
        .attr('x', (d)=> {
          return d.x;
        })
        .attr('y', (d)=> {
          return d.y;
        })
        .attr('dy', '.35em')
        .attr('text-anchor', 'middle')
        .style('opacity', (d)=> {
          return d.r > 20 ? 1 : 0;
        })
        .text((d)=> {
          return d.name;
        });

    d3.select(window).on('click', ()=> {
      zoom(root);
    });
  },

  render(){
    return (<div className="circle-pack"></div>);
  }
});
export default CirclePack;