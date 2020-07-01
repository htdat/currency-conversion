import currencyNames from "../constants/currencies.json";
import rateSources from "../constants/sources.json";
import React, { useEffect } from "react";

/*
 * Fetching exchange rate data
 * and saving data and time to localStorage.
 *
 * @param {string} [source=''] Name of the source
 * @param {string} [key=''] Key coming with the specific source
 *
 * @return {boolean} Whether or not the call is successful
 */
export function canFetchData(source = "", key = "") {
  const sourceObj = Object.keys(rateSources).includes(source)
    ? rateSources[source]
    : rateSources.exchangeRateApi;

  const fetchLink = sourceObj.keyRequired
    ? sourceObj.api.replace("{key}", key)
    : sourceObj.api;

  return fetch(fetchLink)
    .then((res) => res.json())
    .then((data) => {
      if (data && data.rates) {
        // The fetch is successful only if "rates" key exist in JSON response
        // Otherwise, returned responses may happen because of invalid access_key/app_id
        localStorage.setItem("apiData", JSON.stringify(data));
        localStorage.setItem("lastFetchTime", Date.now());
        return true;
      } else {
        return false;
      }
    })
    .catch((error) => {
      console.error("Error fetching " + fetchLink + " :" + error);
      return false;
    });
}

/*
 * Convert amount from one currency to another one
 *
 * @param {string} baseCurrency Currency code (e.g. USD) of "from" currency
 * @param {string} changeCurrency Currency code (e.g. EUR) of "to" currency
 * @param {float} baseAmount Amount to connvert
 *
 * @return {string} Value of converted amount
 */
export function convert(baseCurrency, changeCurrency, baseAmount) {
  const rates = getRates().rates;
  // All rates are from USD to other currencies
  const usdToBase = parseFloat(rates[baseCurrency]); // E.g: USD/EUR = 0.9
  const usdToChange = parseFloat(rates[changeCurrency]); // E.g: USD/CNY = 7.1
  const baseToChange = usdToChange / usdToBase; // E.g: EUR/CNY = (USD/CNY) / (USD/EUR)

  const convertedAmount = baseToChange * parseFloat(baseAmount);

  if (isNaN(convertedAmount)) return "";

  return convertedAmount.toLocaleString("fullwide", {
    maximumFractionDigits: 2,
  });
}

export function getLastFetchTime() {
  const parsed = Number.parseInt(localStorage.getItem("lastFetchTime"));
  return Number.isNaN(parsed) ? 0 : parsed;
}

export function isDataReady() {
  return localStorage.getItem("apiData") !== null;
}

export function getRates() {
  return JSON.parse(localStorage.getItem("apiData"));
}

export function getAvailCurrencies() {
  return Object.keys(getRates().rates) // get all codes in currency
    .filter((code) => currencyNames.hasOwnProperty(code)); // get only codes with defeined currency names
}

// modified version of this guide
// https://dev.to/selbekk/persisting-your-react-state-in-9-lines-of-code-9go
export function usePersistedState(keyInput, defaultValue) {
  const key = "app_" + keyInput;
  const [state, setState] = React.useState(
    () => JSON.parse(localStorage.getItem(key)) || defaultValue
  );
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);
  return [state, setState];
}
