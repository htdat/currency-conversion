import React from 'react';
import './App.css';
import From from './components/From.js';
import To from './components/To.js';
import EditCurrencies from './components/EditCurrencies.js';
import LatestUpdate from './components/LatestUpdate.js';

class App extends React.Component {
  constructor(props){
    super(props);

    const defaultState = {
      baseCurrency: 'USD',
      baseAmount: 1,
      changeCurrencies: ['EUR', 'KRW', 'CNY', 'INR'],
    };

    this.state = defaultState;

    // Parse settings saved in localStorage    
    const appState = JSON.parse(localStorage.getItem('appState'));
    if ( null !== appState ) {
      Object.keys(defaultState).map( item => {
        this.state[item] = appState.hasOwnProperty(item) ? appState[item] : defaultState[item]
      });
    }

    this.handleBaseAmountChange = this.handleBaseAmountChange.bind(this);
    this.handleSwapButton = this.handleSwapButton.bind(this);
    this.updateCurrencies = this.updateCurrencies.bind(this);
  }

  handleBaseAmountChange(value) {
    this.setState({
      baseAmount: value,
    });
  }

  handleSwapButton(changeCode) {
    const base = this.state.baseCurrency;
    const changes = this.state.changeCurrencies;
    this.setState({
      baseCurrency: changeCode,
      baseAmount: 1,
      changeCurrencies: changes.map(code => code === changeCode ? base : code),
    });
  }

  updateCurrencies(codes) {
    this.setState({
      baseCurrency: codes[0],
      baseAmount: 1,
      changeCurrencies: codes.slice(1),
    })
  }

  // Update localStorage when any state is changed
  componentDidUpdate() {
    localStorage.setItem('appState', JSON.stringify(this.state))
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
          <To
            data={this.state}
            handleSwapButton={this.handleSwapButton}
          />
          <hr/>
          <EditCurrencies
            data={this.state}
            updateCurrencies={this.updateCurrencies}
          />
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
