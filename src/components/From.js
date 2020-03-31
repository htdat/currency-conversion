import React from 'react';
import Currency from './Currency/Currency.js';

class From extends React.Component {
  render() {
    return (
      <div className="From">
      <h2>From:</h2>
        <input value={this.props.baseAmount}/>
        <Currency code={this.props.code}/>
      </div>
    );
  }
}

export default From;
