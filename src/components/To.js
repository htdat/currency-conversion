import React from 'react';
import Currency from './Currency/Currency.js';
import Amount from './Amount/Amount.js';

class To extends React.Component {
  render() {
    return (
      <div className="To">
      <h2>To:</h2>
        <figure className="Exchange-info">
          <button>Swap</button>
          <Amount />
          <Currency />
        </figure>

        <figure className="Exchange-info">
          <button>Swap</button>
          <Amount />
          <Currency />
        </figure>
      </div>
    );

  }
}

export default To;
