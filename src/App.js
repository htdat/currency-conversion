import React from 'react';
import './App.css';
import From from './components/From.js';
import To from './components/To.js';
import EditCurrencies from './components/EditCurrencies.js';
import LatestUpdate from './components/LatestUpdate.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Currency Conversion</h1>
      </header>

      <main className="App-main">
        <From code="CAD"/>
        <hr/>
        <To codes={['EUR', 'KRW', 'CNY', 'INR']}/>
        <hr/>
        <EditCurrencies />
        <hr/>
        <LatestUpdate />

      </main>

      <footer className="App-footer">
      Made with ❤️
      </footer>

    </div>
  );
}

export default App;
