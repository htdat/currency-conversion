import React from 'react';
import Currency from './Currency/Currency.js';
import rates from '../states/rates.js';

function convert(baseCurrency, changeCurrency, baseAmount) {

  // All rates are from USD to other currencies
  const usdToBase = parseFloat(rates.rates[baseCurrency] ); // E.g: USD/EUR = 0.9
  const usdToChange = parseFloat( rates.rates[changeCurrency] ); // E.g: USD/CNY = 7.1
  const baseToChange = usdToChange / usdToBase // E.g: EUR/CNY = (USD/CNY) / (USD/EUR)

  const convertedAmount = baseToChange * parseFloat(baseAmount);

  if (isNaN(convertedAmount)) return null;

  return convertedAmount.toLocaleString('fullwide', {
    maximumFractionDigits: 2
  })
}

class To extends React.Component {

  constructor(props){
    super(props);
  }

  toBlock(currencyCode) {
    const {baseCurrency, baseAmount} = this.props.data;
    const convertedAmount = convert(baseCurrency, currencyCode, baseAmount);
    return (
      <figure className="change-currency" key={currencyCode}>
        <button
          onClick={ () => {this.props.handleSwapButton(currencyCode)}}
        >
            🔃 Swap
        </button>
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
