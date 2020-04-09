import React from 'react';
import Currency from './Currency/Currency.js';

class From extends React.Component {

  constructor(props){
    super(props);
    this.changeAmount = this.changeAmount.bind(this);
  }

  changeAmount(e){
    this.props.onBaseAmountChange(e.target.value);
  }

  render() {
    return (
      <div className="From">
      <h2>From:</h2>
        <input value={this.props.baseAmount} onChange={this.changeAmount} type="number"/>
        <Currency code={this.props.baseCurrency}/>
      </div>
    );
  }
}

export default From;
