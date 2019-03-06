import React, { Component } from 'react';
import './App.css';

import Canvas from './components/canvas/Canvas';

class App extends Component {
  render() {
    return (
      <div>
          <h1 className="center">Drawing Canvas</h1>
          <Canvas></Canvas>
      </div>
    );
  }
}

export default App;
