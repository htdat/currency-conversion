import React, { useState, useEffect } from "react";

import "./App.css";

import From from "./components/From.js";
import To from "./components/To.js";
import EditCurrencies from "./components/EditCurrencies.js";
import LastFetchTime from "./components/LastFetchTime.js";
import InfoBox from "./components/InfoBox/InfoBox.js";
import Settings from "./components/Settings.js";

import {
  getLastFetchTime,
  canFetchData,
  isDataReady,
  usePersistedState,
} from "./lib/helpers.js";

export default function App() {
  const [baseCurrency, setBaseCurrency] = usePersistedState(
    "baseCurrency",
    "USD"
  );
  const [baseAmount, setBaseAmount] = usePersistedState("baseAmount", 1);
  const [
    changeCurrencies,
    setChangeCurrencies,
  ] = usePersistedState("changeCurrencies", ["EUR", "JPY"]);
  const [settings, setSettings] = usePersistedState("settings", {
    source: "exchangeRateApi",
    key: "",
  });

  const [infoBoxData, setInfoBoxData] = useState({ text: null, type: null });
  useEffect(() => {
    // Only fetch new data each 24 hours
    if (Date.now() - getLastFetchTime() > 24 * 60 * 60 * 1000) {
      handleFetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSwapButton(changeCode) {
    const base = baseCurrency;
    const changes = changeCurrencies;

    setBaseCurrency(changeCode);
    setBaseAmount(1);
    setChangeCurrencies(
      changes.map((code) => (code === changeCode ? base : code))
    );
  }

  function updateCurrencies(codes) {
    setBaseCurrency(codes[0]);
    setBaseAmount(1);
    setChangeCurrencies(codes.slice(1));
  }

  async function handleFetchData() {
    let infoBoxData = {
      text: "Loading exchange rates...",
      type: "info",
    };

    if (!isDataReady()) {
      infoBoxData.text = "Loading exchange rates for the first time use...";
    }

    setInfoBoxData(infoBoxData);

    const { source, key } = settings;
    const isSucceed = await canFetchData(source, key);

    infoBoxData = isSucceed
      ? { text: "Fetching data successfully!", type: "success" }
      : { text: "Can not load fetch data!", type: "error" };

    setInfoBoxData(infoBoxData);
  }

  const componentWithData = isDataReady() && (
    <>
      <EditCurrencies
        baseCurrency={baseCurrency}
        changeCurrencies={changeCurrencies}
        updateCurrencies={updateCurrencies}
      />

      <Settings data={settings} saveAppSettings={setSettings} />

      <From
        onBaseAmountChange={setBaseAmount}
        baseCurrency={baseCurrency}
        baseAmount={parseInt(baseAmount)}
      />

      <To
        baseCurrency={baseCurrency}
        baseAmount={parseInt(baseAmount)}
        changeCurrencies={changeCurrencies}
        handleSwapButton={handleSwapButton}
      />
    </>
  );

  return (
    <div className="App">
      <header className="App-header">
        <h1>Currency Conversion</h1>
      </header>

      <main className="App-main">
        {componentWithData}

        <InfoBox {...infoBoxData} />

        <LastFetchTime timestamp={getLastFetchTime()} />
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
