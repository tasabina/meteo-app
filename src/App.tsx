import React from 'react';
import './App.css';
import Dashboard from './containers/Dashboard/Dashboard';

/**
 * Function returns HTMLElement with Dashboard
 * 
 * @param {void}
 * 
 * @returns {HTMLElement}
 */
function App() {
  return (
    <div className="App">
      <h1>Meteo Dashboard</h1>
      <Dashboard/> 
    </div>
  );
}

export default App;
