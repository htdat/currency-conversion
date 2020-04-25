import currencyNames from '../const/currencies.json';
import rateSources from '../const/sources.json';

function canFetchRates(source = '', key = '') {

  const sourceObj = Object.keys(rateSources).includes(source) ? rateSources[source] : rateSources.exchangeRateApi
  const fetchLink = sourceObj.keyRequired
    ? sourceObj.api.replace('{key}', key)
    : sourceObj.api

  return fetch(fetchLink)
    .then(res => res.json())
    .then(data => {
       localStorage.setItem('apiData', JSON.stringify(data));
       return data
    })
    .catch(error => {
      console.error('Error fetching ' +  fetchLink + ' :' + error)
      return error
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
  return localStorage.getItem('lastFetchTime');
}

function getRates(){
  return openExchangeRates;
}

function getAvailCurrencies(){
  return Object
    .keys(getRates().rates) // get all codes in currency
    .filter( code => currencyNames.hasOwnProperty(code)); // get only codes with defeined currency names
}

// https://api.exchangeratesapi.io/latest
var exchangeRatesApi = {
  "rates": {
    "CAD": 1.4139564544,
    "HKD": 7.752118065,
    "ISK": 140.2933406213,
    "PHP": 51.1296346907,
    "DKK": 6.7965746561,
    "HUF": 323.9956272206,
    "CZK": 24.8692721144,
    "GBP": 0.8175548875,
    "RON": 4.4069417874,
    "SEK": 10.0353466339,
    "IDR": 16140.0018219914,
    "INR": 75.4937596793,
    "BRL": 5.0929215633,
    "RUB": 78.6935410404,
    "HRK": 6.9363213993,
    "JPY": 108.7364489387,
    "THB": 32.5854058486,
    "CHF": 0.9639245696,
    "EUR": 0.9109957183,
    "MYR": 4.3380705111,
    "BGN": 1.7817254259,
    "TRY": 6.4621481279,
    "CNY": 7.0961100483,
    "NOK": 10.6183838936,
    "NZD": 1.6897148583,
    "ZAR": 17.6200236859,
    "USD": 1,
    "MXN": 23.5336612918,
    "SGD": 1.4359114512,
    "AUD": 1.6588321035,
    "ILS": 3.5905074246,
    "KRW": 1226.4826455316,
    "PLN": 4.1273572014
  },
  "base": "USD",
  "date": "2020-03-27"
};

// source https://openexchangerates.org/api/latest.json?app_id=xxxxxx
var openExchangeRates = {
    "disclaimer": "Usage subject to terms: https://openexchangerates.org/terms",
    "license": "https://openexchangerates.org/license",
    "timestamp": 1585832400,
    "base": "USD",
    "rates": {
        "AED": 3.6732,
        "AFN": 76.665465,
        "ALL": 116.906854,
        "AMD": 502.025907,
        "ANG": 1.790115,
        "AOA": 536.68,
        "ARS": 64.4716,
        "AUD": 1.65647,
        "AWG": 1.8,
        "AZN": 1.7025,
        "BAM": 1.791225,
        "BBD": 2,
        "BDT": 84.950776,
        "BGN": 1.79096,
        "BHD": 0.377088,
        "BIF": 1889.705692,
        "BMD": 1,
        "BND": 1.432935,
        "BOB": 6.895506,
        "BRL": 5.2598,
        "BSD": 1,
        "BTC": 0.000149745687,
        "BTN": 76.409246,
        "BWP": 12.085521,
        "BYN": 2.60025,
        "BZD": 2.015872,
        "CAD": 1.423561,
        "CDF": 1710.599779,
        "CHF": 0.969611,
        "CLF": 0.031218,
        "CLP": 865.1,
        "CNH": 7.117355,
        "CNY": 7.0912,
        "COP": 4102.573734,
        "CRC": 577.542197,
        "CUC": 1,
        "CUP": 25.75,
        "CVE": 101.35,
        "CZK": 25.361584,
        "DJF": 178,
        "DKK": 6.86216,
        "DOP": 53.914101,
        "DZD": 125.325179,
        "EGP": 15.7505,
        "ERN": 14.999702,
        "ETB": 33.161062,
        "EUR": 0.919156,
        "FJD": 2.28639,
        "FKP": 0.805452,
        "GBP": 0.805452,
        "GEL": 3.285,
        "GGP": 0.805452,
        "GHS": 5.800375,
        "GIP": 0.805452,
        "GMD": 50.983333,
        "GNF": 9545.015069,
        "GTQ": 7.710519,
        "GYD": 208.94138,
        "HKD": 7.75235,
        "HNL": 24.764512,
        "HRK": 7.010297,
        "HTG": 94.823171,
        "HUF": 334.317366,
        "IDR": 16674.75,
        "ILS": 3.653245,
        "IMP": 0.805452,
        "INR": 76.386402,
        "IQD": 1193.887507,
        "IRR": 42105,
        "ISK": 142.769985,
        "JEP": 0.805452,
        "JMD": 134.363939,
        "JOD": 0.7097,
        "JPY": 107.18845,
        "KES": 105.85,
        "KGS": 75.025898,
        "KHR": 4067.099147,
        "KMF": 447.649945,
        "KPW": 900,
        "KRW": 1231.52,
        "KWD": 0.312211,
        "KYD": 0.83333,
        "KZT": 448.253324,
        "LAK": 8936.443527,
        "LBP": 1512.065399,
        "LKR": 189.512959,
        "LRD": 197.999977,
        "LSL": 17.980042,
        "LYD": 1.405551,
        "MAD": 10.24824,
        "MDL": 18.355449,
        "MGA": 3771.990431,
        "MKD": 56.379018,
        "MMK": 1401.596095,
        "MNT": 2776.196395,
        "MOP": 7.984724,
        "MRO": 357,
        "MRU": 37.627589,
        "MUR": 39.396514,
        "MVR": 15.41,
        "MWK": 736.490379,
        "MXN": 24.426527,
        "MYR": 4.3576,
        "MZN": 66.8,
        "NAD": 17.96,
        "NGN": 381.520121,
        "NIO": 33.737068,
        "NOK": 10.35852,
        "NPR": 122.254638,
        "NZD": 1.691848,
        "OMR": 0.385102,
        "PAB": 1,
        "PEN": 3.432088,
        "PGK": 3.469683,
        "PHP": 50.882998,
        "PKR": 167.136576,
        "PLN": 4.201009,
        "PYG": 6561.483858,
        "QAR": 3.641226,
        "RON": 4.4443,
        "RSD": 107.99,
        "RUB": 78.967833,
        "RWF": 952.39829,
        "SAR": 3.764119,
        "SBD": 8.300627,
        "SCR": 13.019585,
        "SDG": 55.325,
        "SEK": 10.070196,
        "SGD": 1.43435,
        "SHP": 0.805452,
        "SLL": 7602.998106,
        "SOS": 578.539651,
        "SRD": 7.458,
        "SSP": 130.26,
        "STD": 22052.77227,
        "STN": 22.45,
        "SVC": 8.750006,
        "SYP": 514.664603,
        "SZL": 17.987189,
        "THB": 32.998304,
        "TJS": 10.215541,
        "TMT": 3.51,
        "TND": 2.863,
        "TOP": 2.354431,
        "TRY": 6.657007,
        "TTD": 6.757122,
        "TWD": 30.231,
        "TZS": 2314.2,
        "UAH": 27.554114,
        "UGX": 3790.19649,
        "USD": 1,
        "UYU": 44.002798,
        "UZS": 9611.453044,
        "VEF": 248487.642241,
        "VES": 77794.424409,
        "VND": 23685.529728,
        "VUV": 122.335577,
        "WST": 2.790649,
        "XAF": 602.9266,
        "XAG": 0.06960397,
        "XAU": 0.0006243,
        "XCD": 2.70255,
        "XDR": 0.732519,
        "XOF": 602.9266,
        "XPD": 0.00043779,
        "XPF": 109.684448,
        "XPT": 0.0013685,
        "YER": 250.349961,
        "ZAR": 18.56445,
        "ZMW": 18.225183,
        "ZWL": 322.000001
    }
}

export {
  canFetchRates,
  getRates,
  getAvailCurrencies,
  convert,
  getLastFetchTime,
}
