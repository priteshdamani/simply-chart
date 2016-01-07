require('./App.scss');
require('file?name=[name].[ext]!../public/index.html');
import React from 'react';
import ReactDOM from 'react-dom';
import CirclePack from './components/CirclePack/CirclePack';

const App = React.createClass({
  getInitialState () {
    return {}
  },

  render(){
    return (
        <div>
          <header className="search">
            <input type="text" placeholder="websocket url"/>
          </header>
          <CirclePack width={1280}
                      height={800}
                      r={720}/>
        </div>
    )
  }
});
ReactDOM.render(<App/>, document.getElementById('app'));