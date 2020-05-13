import React from "react";
import "./App.css";
import From from "./components/From.js";
import To from "./components/To.js";
import EditCurrencies from "./components/EditCurrencies.js";
import LastFetchTime from "./components/LastFetchTime.js";
import InfoBox from "./components/InfoBox/InfoBox.js";
import Settings from "./components/Settings.js";

import { getLastFetchTime, canFetchData, isDataReady } from "./lib/helpers.js";

class App extends React.Component {
  constructor(props) {
    super(props);

    const defaultState = {
      baseCurrency: "USD",
      baseAmount: 1,
      changeCurrencies: ["EUR", "JPY"],
      infoBoxData: {
        text: null,
        type: null,
      },
      settings: {
        source: "exchangeRateApi",
        key: "",
      },
    };

    this.state = defaultState;

    // Parse settings saved in localStorage
    const keysWithDefaultState = ["infoBoxData"];
    const appState = JSON.parse(localStorage.getItem("appState"));
    if (null !== appState) {
      Object.keys(defaultState).forEach((item) => {
        this.state[item] =
          appState.hasOwnProperty(item) && !keysWithDefaultState.includes(item)
            ? appState[item]
            : defaultState[item];
      });
    }

    this.handleBaseAmountChange = this.handleBaseAmountChange.bind(this);
    this.handleSwapButton = this.handleSwapButton.bind(this);
    this.updateCurrencies = this.updateCurrencies.bind(this);
    this.saveAppSettings = this.saveAppSettings.bind(this);
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
      changeCurrencies: changes.map((code) =>
        code === changeCode ? base : code
      ),
    });
  }

  updateCurrencies(codes) {
    this.setState({
      baseCurrency: codes[0],
      baseAmount: 1,
      changeCurrencies: codes.slice(1),
    });
  }

  saveAppSettings(data) {
    this.setState({
      settings: data,
    });
  }

  async handleFetchData() {
    let infoBoxData = {
      text: "Loading exchange rates...",
      type: "info",
    };

    if (!isDataReady()) {
      infoBoxData.text = "Loading exchange rates for the first time use...";
    }

    this.setState({
      infoBoxData: infoBoxData,
    });

    const { source, key } = this.state.settings;
    const isSucceed = await canFetchData(source, key);

    infoBoxData = isSucceed
      ? { text: "Fetching data successfully!", type: "success" }
      : { text: "Can not load fetch data!", type: "error" };

    this.setState({
      infoBoxData: infoBoxData,
    });
  }

  componentDidMount() {
    // Only fetch new data each 24 hours
    if (Date.now() - getLastFetchTime() > 24 * 60 * 60 * 1000) {
      this.handleFetchData();
    }
  }

  // Update localStorage when any state is changed
  componentDidUpdate() {
    localStorage.setItem("appState", JSON.stringify(this.state));
  }

  render() {
    let componentWithData = isDataReady() && (
      <>
        <EditCurrencies
          data={this.state}
          updateCurrencies={this.updateCurrencies}
        />

        <Settings
          data={this.state.settings}
          saveAppSettings={this.saveAppSettings}
        />

        <From
          onBaseAmountChange={this.handleBaseAmountChange}
          {...this.state}
        />

        <To data={this.state} handleSwapButton={this.handleSwapButton} />
      </>
    );

    return (
      <div className="App">
        <header className="App-header">
          <h1>Currency Conversion</h1>
        </header>

        <main className="App-main">
          {componentWithData}

          <InfoBox {...this.state.infoBoxData} />

          <LastFetchTime time={getLastFetchTime()} />
        </main>

        <hr />

        <footer className="App-footer">
          Made with{" "}
          <span role="img" aria-label="love">
            ❤️
          </span>{" "}
          in{" "}
          <a
            href="https://github.com/htdat/currency-conversion"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          .
        </footer>
      </div>
    );
  }
}

export default App;
