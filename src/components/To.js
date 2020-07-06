import React, { useContext } from "react";

import Currency from "./Currency/Currency.js";
import { convert } from "../lib/helpers.js";
import { AppContext } from "../App.js";

export default function To() {
  // Parse props
  const {
    baseCurrency,
    baseAmount,
    changeCurrencies,
    handleSwapButton,
  } = useContext(AppContext);

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
