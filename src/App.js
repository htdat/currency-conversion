import React from 'react';
import './App.css';
import From from './components/From.js';
import To from './components/To.js';
import EditCurrencies from './components/EditCurrencies.js';
import LastFetchTime from './components/LastFetchTime.js';
import InfoBox from './components/InfoBox/InfoBox.js';
import {getLastFetchTime, canFetchData, isDataReady} from './lib/rates.js';

class App extends React.Component {
  constructor(props){
    super(props);

    const defaultState = {
      baseCurrency: 'USD',
      baseAmount: 1,
      changeCurrencies: ['EUR', 'KRW', 'CNY', 'INR'],
      infoBoxData: {
        text: null,
        type: null,
      },
    };

    this.state = defaultState;

    // Parse settings saved in localStorage
    const keysWithDefaultState = ['infoBoxData']
    const appState = JSON.parse(localStorage.getItem('appState'));
    if ( null !== appState ) {
      Object.keys(defaultState).forEach( item => {
        this.state[item] = appState.hasOwnProperty(item) && ! keysWithDefaultState.includes(item)
          ? appState[item]
          : defaultState[item]
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

  async handleFetchData() {
      let infoBoxData = {
        text: 'Loading exchange rates...',
        type: 'info'
      }

      if ( ! isDataReady() ) {
        infoBoxData.text = 'Loading exchange rates for the first time use...'
      }

      this.setState({
        infoBoxData: infoBoxData
      })

      const isSucceed = await canFetchData();

      infoBoxData = isSucceed
        ? { text: 'Fetching data successfully!', type: 'success'}
        : { text: 'Can not load fetch data!', type: 'error'}

      this.setState({
        infoBoxData: infoBoxData
      })
  }

  componentDidMount() {
    this.handleFetchData()
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
          <LastFetchTime time={getLastFetchTime()}/>
          <InfoBox
            { ...this.state.infoBoxData }
          />
          <hr/>
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
        </main>

        <footer className="App-footer">
        Made with ❤️
        </footer>

      </div>
    );
  }
}

export default App;
