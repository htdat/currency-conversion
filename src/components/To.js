import React from 'react';
import Currency from './Currency/Currency.js';
import {convert} from '../lib/rates.js';

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
          onClick={ () => {this.props.handleSwapButton(currencyCode)} }
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
