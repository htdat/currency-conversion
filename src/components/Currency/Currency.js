import React from 'react';
import 'currency-flags/dist/currency-flags.css'
import './Currency.css'
import currencies from '../../const/currencies.json';

class Currency extends React.Component {

  render() {
    const code = this.props.code.toUpperCase();
    if (typeof(code) === 'undefined') return null;
    if (! currencies.hasOwnProperty(code)) return null;

    return (
      <div className="currency">
        <div className={"currency-flag currency-flag-lg currency-flag-" + code.toLowerCase()}></div>
        <div className="code">{code}</div>
        <div className="name">{currencies[code]}</div>
      </div>
    );
  }
}

export default Currency;