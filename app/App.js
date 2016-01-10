require('./App.scss');
require('file?name=[name].[ext]!../public/index.html');
import React from 'react';
import ReactDOM from 'react-dom';
import CirclePack from './components/CirclePack/CirclePack';

const App = React.createClass({
  getInitialState(){
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
  render(){
    return (
        <div>
          <header className="search">
            <input type="text" placeholder="websocket url"/>
          </header>
          <CirclePack width={1280}
                      height={800}
                      r={720}
                      data={this.state.data}/>
        </div>
    )
  }
});
ReactDOM.render(<App/>, document.getElementById('app'));