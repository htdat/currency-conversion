import React from "react";
import PropTypes from "prop-types";

import "currency-flags/dist/currency-flags.css";
import "./Currency.css";
import currencyNames from "../../constants/currencies.json";

export default function Currency(props) {
  const code = props.code.toUpperCase();
  const display =
    typeof code !== "undefined" && currencyNames.hasOwnProperty(code);

  return (
    display && (
      <div className="currency">
        <div
          className={
            "currency-flag currency-flag-lg currency-flag-" + code.toLowerCase()
          }
        ></div>
        <div className="code">{code}</div>
        <div className="name">{currencyNames[code]}</div>
      </div>
    )
  );
}

Currency.propTypes = {
  code: PropTypes.string,
};
