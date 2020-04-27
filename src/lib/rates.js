import currencyNames from '../const/currencies.json';
import rateSources from '../const/sources.json';

function canFetchData(source = '', key = '') {

  const sourceObj = Object.keys(rateSources).includes(source) ? rateSources[source] : rateSources.exchangeRateApi
  const fetchLink = sourceObj.keyRequired
    ? sourceObj.api.replace('{key}', key)
    : sourceObj.api

  return fetch(fetchLink)
    .then(res => res.json())
    .then(data => {
       localStorage.setItem('apiData', JSON.stringify(data));
       localStorage.setItem('lastFetchTime', Date.now());
       return true
    })
    .catch(error => {
      console.error('Error fetching ' +  fetchLink + ' :' + error)
      return false
    });
}

function convert(baseCurrency, changeCurrency, baseAmount) {
  const rates = getRates().rates;
  // All rates are from USD to other currencies
  const usdToBase = parseFloat( rates[baseCurrency] ); // E.g: USD/EUR = 0.9
  const usdToChange = parseFloat(rates[changeCurrency] ); // E.g: USD/CNY = 7.1
  const baseToChange = usdToChange / usdToBase // E.g: EUR/CNY = (USD/CNY) / (USD/EUR)

  const convertedAmount = baseToChange * parseFloat(baseAmount);

  if (isNaN(convertedAmount)) return null;

  return convertedAmount.toLocaleString('fullwide', {
    maximumFractionDigits: 2
  })
}

function getLastFetchTime() {
  return Number.parseInt(localStorage.getItem('lastFetchTime'));
}

function isDataReady() {
  const apiData = JSON.parse(localStorage.getItem('apiData'));
  return apiData ? true : false
}

function getRates(){
  // return openExchangeRates;
  return JSON.parse(localStorage.getItem('apiData'));

}

function getAvailCurrencies(){
  return Object
    .keys(getRates().rates) // get all codes in currency
    .filter( code => currencyNames.hasOwnProperty(code)); // get only codes with defeined currency names
}

export {
  canFetchData,
  getRates,
  getAvailCurrencies,
  convert,
  getLastFetchTime,
  isDataReady,
}
