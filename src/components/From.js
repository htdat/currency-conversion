import React from "react";
import PropTypes from "prop-types";

import Currency from "./Currency/Currency.js";

export default function From(props) {
  const { baseCurrency, baseAmount, onBaseAmountChange } = props;
  const formattedBaseAmount = isNaN(parseFloat(baseAmount))
    ? ""
    : parseFloat(baseAmount).toLocaleString("fullwide", {
        maximumFractionDigits: 2,
      });

  return (
    <div className="From">
      <h2>From:</h2>
      <figure className="from-currency">
        <Currency code={baseCurrency} />
        <input
          value={baseAmount}
          onChange={(e) => onBaseAmountChange(e.target.value)}
          type="number"
        />
        <div className="amount">
          <span>{baseCurrency}</span> {formattedBaseAmount}
        </div>
      </figure>
    </div>
  );
}

From.propTypes = {
  baseCurrency: PropTypes.string.isRequired,
  baseAmount: PropTypes.number.isRequired,
  onBaseAmountChange: PropTypes.func.isRequired,
};
