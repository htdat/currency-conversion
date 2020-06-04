import React, { useState, useEffect } from "react";
import Modal from "react-responsive-modal";
import PropTypes from "prop-types";

import currencyNames from "../constants/currencies.json";
import { getAvailCurrencies } from "../lib/helpers.js";
import Currency from "./Currency/Currency.js";

export default function EditCurrencies(props) {
  // props
  const { baseCurrency, changeCurrencies, updateCurrencies } = props;

  // state
  const [open, setOpen] = useState(false);
  const [displayCurrencies, setDisplayCurrencies] = useState(
    getAvailCurrencies()
  );
  const [selectedCurrencies, setSelectedCurrencies] = useState([]);
  useEffect(() => {
    if (open) {
      setSelectedCurrencies([baseCurrency, ...changeCurrencies]);
    }
  }, [baseCurrency, changeCurrencies, open]);

  const onOpenModal = () => {
    setOpen(true);
    setDisplayCurrencies(getAvailCurrencies());
  };

  const onCloseModal = () => {
    setOpen(false);
    updateCurrencies(selectedCurrencies);
  };

  // Handle when clicking/touching on the currecy list
  const addRemove = (code) => {
    const currencies = [...selectedCurrencies];

    if (currencies.includes(code)) {
      // Remove this code if it exists in the current selected currencies
      // Do not let it less than 2 currencies too
      if (currencies.length > 2) currencies.splice(currencies.indexOf(code), 1);
    } else {
      // Otherwise, add it
      currencies.push(code);
    }

    setSelectedCurrencies(currencies);
  };

  // Search matched currencies on a given keyword
  const search = (keyword) => {
    const availCurrencies = getAvailCurrencies();
    const regex = new RegExp(keyword.toLowerCase());

    const result = availCurrencies.filter((code) => {
      const text = (code + " " + currencyNames[code]).toLowerCase();
      return regex.test(text);
    });

    setDisplayCurrencies(result);
  };

  // Print a list including selected currencies
  const printSelectedCurrencies = selectedCurrencies.map((code) => {
    return (
      displayCurrencies.includes(code) && (
        <li
          className="selected-currency"
          key={code}
          onClick={() => addRemove(code)}
        >
          <Currency code={code} />{" "}
          <span role="img" aria-label="selected">
            ★
          </span>
        </li>
      )
    );
  });

  // Print another currency list but excluding selected currencies
  const printOtherCurrencies = displayCurrencies.map((code) => {
    return (
      !selectedCurrencies.includes(code) && (
        <li key={code} onClick={() => addRemove(code)}>
          <Currency code={code} />
        </li>
      )
    );
  });

  return (
    <>
      <button onClick={() => onOpenModal()}>Edit Currencies</button>
      <Modal open={open} onClose={() => onCloseModal()}>
        <h1>Select currencies</h1>
        <input
          type="text"
          placeholder="Search currencies"
          onChange={(e) => search(e.target.value)}
        />
        <ul className="edit-currencies">
          {printSelectedCurrencies}
          {printOtherCurrencies}
        </ul>
      </Modal>
    </>
  );
}

EditCurrencies.propTypes = {
  baseCurrency: PropTypes.string.isRequired,
  changeCurrencies: PropTypes.array.isRequired,
  updateCurrencies: PropTypes.func.isRequired,
};
