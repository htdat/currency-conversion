import React from "react";
import PropTypes from "prop-types";

import Currency from "./Currency/Currency.js";
import { convert } from "../lib/helpers.js";

export default function To(props) {
  // Parse props
  const {
    baseCurrency,
    baseAmount,
    changeCurrencies,
    handleSwapButton,
  } = props;

  // Define how a block looks like
  function toBlock(currencyCode) {
    const convertedAmount = convert(baseCurrency, currencyCode, baseAmount);
    return (
      <figure className="change-currency" key={currencyCode}>
        <button
          onClick={() => {
            handleSwapButton(currencyCode);
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

  // Render
  return (
    <div className="To">
      <h2>To:</h2>
      {changeCurrencies.map((code) => toBlock(code))}
    </div>
  );
}

To.propTypes = {
  baseCurrency: PropTypes.string.isRequired,
  baseAmount: PropTypes.number.isRequired,
  changeCurrencies: PropTypes.array.isRequired,
  handleSwapButton: PropTypes.func.isRequired,
};
