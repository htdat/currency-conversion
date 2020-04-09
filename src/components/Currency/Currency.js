import React from 'react';
import 'currency-flags/dist/currency-flags.css'
import './Currency.css'
import currencyNames from '../../const/currencies.json';

class Currency extends React.Component {

  render() {
    const code = this.props.code.toUpperCase();
    const display = typeof(code) !== 'undefined' && currencyNames.hasOwnProperty(code);

    return ! display
      ? null
      : (
        <div className="currency">
          <div className={"currency-flag currency-flag-lg currency-flag-" + code.toLowerCase()}></div>
          <div className="code">{code}</div>
          <div className="name">{currencyNames[code]}</div>
        </div>
      );
  }
}

export default Currency;
