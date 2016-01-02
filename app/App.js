require('./App.scss');
require('file?name=[name].[ext]!../public/index.html');
import React from 'react';
import ReactDOM from 'react-dom';
import rd3 from 'react-d3';
import queryString from 'query-string';

// TODO: Implement socket.io
// https://github.com/socketio/socket.io-client
// const socketServer = require('socket.io-client')('http://localhost');
// const socketClient = require('socket.io-client')('http://localhost');

const App = React.createClass({
    // TODO: Learn about the React lifecycle:
    // https://facebook.github.io/react/docs/component-specs.html#lifecycle-methods
    getInitialState () {
        // Load 'state' with initial data.
        let barData = [
            {
                "values": [
                    {"x": 1, "y": 91},
                    {"x": 2, "y": 90},
                    {"x": 3, "y": 85}]
            }
        ];
        return {
            barData: barData
        }
    },

    // This cycle event is where we'll listen to socket events and update the chart data
    componentDidMount(){
        // TODO: Implement web sockets
        // Proof of concept for data updates
        setInterval(()=> {
            // TIP: es6, 'this' is lexically scoped because we use ()=>
            this._updateChart();
        }, 800);
    },

    // TODO: Add useful charts
    // Samples: https://reactiva.github.io/react-d3-website/
    // Src: https://github.com/esbullington/react-d3
    _renderBarChart(){
        let BarChart = rd3.BarChart;
        return <BarChart data={ this.state.barData }
                         width={500}
                         height={200}
                         fill={'#3182bd'}
                         title='Bar Chart'
                         yAxisLabel='Label'
                         xAxisLabel='Value'/>
    },

    _updateChart(){
        let min = 0, max = 100;
        function getRandomArbitrary(min, max) {
            return Math.floor(Math.random() * (max - min) + min);
        }

        this.setState({
            barData: [
                {
                    "values": [
                        {"x": 1, "y": getRandomArbitrary(min, max)},
                        {"x": 2, "y": getRandomArbitrary(min, max)},
                        {"x": 3, "y": getRandomArbitrary(min, max)}]
                }
            ]
        });
    },

    render(){
        return (
            <div>
                <header className="search">
                    <input type="text" placeholder="websocket url"/>
                </header>
                <section>
                    {this._renderBarChart()}
                </section>
            </div>
        )
    }
});
ReactDOM.render(<App/>, document.getElementById('app'));


// Example of getting a query string
// http://localhost:8080/?url=test-websocket-url
// const parsed = queryString.parse(location.search);
// console.log(parsed);
// src: https://github.com/sindresorhus/query-string