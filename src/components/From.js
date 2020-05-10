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
    const {baseCurrency, baseAmount} = this.props;
    const formattedBaseAmount = isNaN(parseFloat(baseAmount))
      ? ''
      : parseFloat(baseAmount).toLocaleString('fullwide', { maximumFractionDigits: 2})

    return (
      <div className="From">
      <h2>From:</h2>
        <figure className="from-currency">
          <Currency code={baseCurrency}/>
          <input value={baseAmount} onChange={this.changeAmount} type="number"/>
          <div className="amount"><span>{baseCurrency}</span> {formattedBaseAmount}</div>

        </figure>
      </div>
    );
  }
}

export default From;
