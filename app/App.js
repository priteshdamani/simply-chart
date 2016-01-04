require('./App.scss');
require('file?name=[name].[ext]!../public/index.html');
const sampleData = require('json!./user_sample.json');
import React from 'react';
import ReactDOM from 'react-dom';
import SimplyChart from './SimplyChart/SimplyChart';

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
            x = function (d) {
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