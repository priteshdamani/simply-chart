require('./app.scss');
require('file?name=[name].[ext]!../public/index.html');
import React from 'react';
import ReactDOM from 'react-dom';
import CirclePack from './components/CirclePack/CirclePack';

const Chart = require('react-d3-core').Chart;

const App = React.createClass({
  getInitialState () {
    return {

    }
  },

  render(){
    return (
        <div>
          <header className="search">
            <input type="text" placeholder="websocket url"/>
          </header>
          <CirclePack/>
        </div>
    )
  }
});
ReactDOM.render(<App/>, document.getElementById('app'));