import React from 'react';
import Currency from './Currency/Currency.js';
import {convert} from '../lib/helpers.js';

class To extends React.Component {

  toBlock(currencyCode) {
    const {baseCurrency, baseAmount} = this.props.data;
    const convertedAmount = convert(baseCurrency, currencyCode, baseAmount);
    return (
      <figure className="change-currency" key={currencyCode}>
        <button
          onClick={ () => {this.props.handleSwapButton(currencyCode)} }
          className="swap"
          label="swap"
        >
            ⇅
        </button>
        <Currency code={currencyCode}/>
        <div className="amount"><span>{currencyCode}</span> {convertedAmount}</div>
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
