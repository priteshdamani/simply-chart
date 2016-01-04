import React from 'react';

// require `react-d3-core` for Chart component, which help us build a blank svg and chart title.
const Chart = require('react-d3-core').Chart;
// require `react-d3-basic` for Line chart component.
const LineChart = require('react-d3-basic').LineChart;


const SimplyChart = React.createClass({
    propTypes: {
        height: '',
        width: '',
        margins: '',
        title: 'BMI',
        chartSeries: [
            {
                field: 'BMI',
                name: 'BMI',
                color: '#ff7f0e'
            }
        ]
    },
    componentDidMount(){
        this.setState({
            data: {}
        });
    },
    render(){
        return (
            <div>
            </div>
        )
    }
});
export default SimplyChart;


