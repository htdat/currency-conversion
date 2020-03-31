import React from 'react';
import './App.css';
import From from './components/From.js';
import To from './components/To.js';
import EditCurrencies from './components/EditCurrencies.js';
import LatestUpdate from './components/LatestUpdate.js';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      baseCurrency: 'USD',
      baseAmount: 1,
      changeCurrencies: ['EUR', 'KRW', 'CNY', 'INR'],
    };
  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
          <h1>Currency Conversion</h1>
        </header>

        <main className="App-main">
          <From code={this.state.baseCurrency} baseAmount={this.state.baseAmount}/>
          <hr/>
          <To data={this.state}/>
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
}

export default App;
