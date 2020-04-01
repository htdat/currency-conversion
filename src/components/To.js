import React from 'react';
import Currency from './Currency/Currency.js';
import rates from '../states/rates.js';


class To extends React.Component {

  constructor(props){
    super(props)
  }

  convertCurrency(baseCurrency, changeCurrency, baseAmount) {
    const convertedAmount = parseFloat(rates.rates[changeCurrency]) * parseFloat(baseAmount);

    if (isNaN(convertedAmount)) return null;

    return convertedAmount.toLocaleString('fullwide', {
      maximumFractionDigits: 2
    })
  }

  toBlock(currencyCode) {
    const {baseCurrency, baseAmount} = this.props.data;
    const convertedAmount = this.convertCurrency(baseCurrency, currencyCode, baseAmount);
    return (
      <figure className="change-currency" key={currencyCode}>
        <button>Swap</button>
        <div className="amount">{convertedAmount}</div>
        <Currency code={currencyCode}/>
      </figure>
    )
  }

  render() {
    const {changeCurrencies} = this.props.data;
    return (
      <div className="To">
        <h2>To:</h2>
        {changeCurrencies.map((code) => this.toBlock(code))}
      </div>
    );

  }
}

export default To;
