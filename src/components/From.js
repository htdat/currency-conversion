import React from 'react';
import Currency from './Currency/Currency.js';
import Amount from './Amount/Amount.js';


class From extends React.Component {
  render() {
    return (
      <div className="From">
      <h2>From:</h2>
        <Amount />
        <Currency code={this.props.code}/>
      </div>
    );
  }
}

export default From;
