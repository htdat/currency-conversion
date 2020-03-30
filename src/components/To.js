import React from 'react';
import Currency from './Currency/Currency.js';
import Amount from './Amount/Amount.js';

class To extends React.Component {

  toBlock(currencyCode) {
    return (
      <figure className="Exchange-info">
        <button>Swap</button>
        <Amount />
        <Currency code={currencyCode}/>
      </figure>
    )
  }

  render() {
    const codes = this.props.codes;
    return (
      <div className="To">
      <h2>To:</h2>
        {codes.map((code) => this.toBlock(code))}
      </div>
    );

  }
}

export default To;
