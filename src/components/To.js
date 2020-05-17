import React from "react";
import PropTypes from "prop-types";

import Currency from "./Currency/Currency.js";
import { convert } from "../lib/helpers.js";

class To extends React.Component {
  toBlock(currencyCode) {
    const { baseCurrency, baseAmount } = this.props;
    const convertedAmount = convert(baseCurrency, currencyCode, baseAmount);
    return (
      <figure className="change-currency" key={currencyCode}>
        <button
          onClick={() => {
            this.props.handleSwapButton(currencyCode);
          }}
          className="swap"
          label="swap"
        >
          ⇅
        </button>
        <Currency code={currencyCode} />
        <div className="amount">
          <span>{currencyCode}</span> {convertedAmount}
        </div>
      </figure>
    );
  }

  render() {
    const { changeCurrencies } = this.props;
    return (
      <div className="To">
        <h2>To:</h2>
        {changeCurrencies.map((code) => this.toBlock(code))}
      </div>
    );
  }
}

To.propTypes = {
  baseCurrency: PropTypes.string.isRequired,
  baseAmount: PropTypes.number.isRequired,
  changeCurrencies: PropTypes.array.isRequired,
  handleSwapButton: PropTypes.func.isRequired,
};

export default To;
