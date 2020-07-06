import React, { useContext } from "react";

import Currency from "./Currency/Currency.js";
import { AppContext } from "../App.js";

export default function From() {
  const { baseCurrency, baseAmount, setBaseAmount } = useContext(AppContext);

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
          onChange={(e) => setBaseAmount(e.target.value)}
          type="number"
        />
        <div className="amount">
          <span>{baseCurrency}</span> {formattedBaseAmount}
        </div>
      </figure>
    </div>
  );
}
