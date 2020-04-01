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

    this.handleBaseAmountChange = this.handleBaseAmountChange.bind(this);
  }

  handleBaseAmountChange(value) {
    this.setState({
      baseAmount: value,
    });
  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
          <h1>Currency Conversion</h1>
        </header>

        <main className="App-main">
          <From
            onBaseAmountChange={this.handleBaseAmountChange}
            {...this.state}
          />
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
