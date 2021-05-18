import React from 'react';
import './App.css';
import SplunkJsExample from './SplunkJsExample';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          1. Edit <code>src/splunkConfig.js</code> to input your Splunk host/port information and restart this project using <code>npm start</code>.
        </p>
        <SplunkJsExample />

      </header>
    </div>
  );
}

export default App;
