import React, { useState } from "react";
import Modal from "react-responsive-modal";
import PropTypes from "prop-types";

import rateSources from "../constants/sources.json";
import { canFetchData } from "../lib/helpers.js";

function keyCheckInfo(txt) {
  return txt && <div>{txt}</div>;
}

export default function Settings(props) {
  const { data, saveAppSettings } = props;
  const [open, setOpen] = useState(false);
  const [infoTxt, setInfoTxt] = useState("");
  const [source, setSource] = useState(data.source);
  const [key, setKey] = useState(data.key);

  const onOpenModal = () => {
    // Reset these state values back to their parent values
    // This is a bit different from handling for EditCurrencies
    // @TODO - make sure EditCurrencies and Settings components having the same approach
    setOpen(true);
    setInfoTxt("");
    setSource(data.source);
    setKey(data.key);
  };

  const onCloseModal = () => {
    setOpen(false);
  };

  async function saveSettings() {
    setInfoTxt("⌛Checking the API Data...");
    const keyGood = await canFetchData(source, key);

    if (rateSources[source].keyRequired) {
      // Set infoTxt
      const txt = keyGood
        ? "" // Good key, say nothing
        : "❌ Oh, wrong! Check your key or switch to a source without key";

      setInfoTxt(txt);

      if (!keyGood) return "";
    }

    saveAppSettings({
      source: source,
      key: key,
    });

    onCloseModal();
  }

  const options = Object.keys(rateSources).map((item) => {
    const keyInfo = rateSources[item].keyRequired
      ? "(free - key required)"
      : "(free - no key)";
    return (
      <option value={item} key={item}>
        {rateSources[item].name} {keyInfo}
      </option>
    );
  });

  const sourceInfo = (
    <a
      href={rateSources[source].info}
      target="_blank"
      rel="noopener noreferrer"
    >
      Learn more about this source.
    </a>
  );

  const keyField = rateSources[source].keyRequired && (
    <>
      <label htmlFor="data-key">Key: </label>
      <input
        type="text"
        id="data-key"
        onChange={(e) => setKey(e.target.value)}
        defaultValue={key}
      />
      {keyCheckInfo(infoTxt)}
    </>
  );

  return (
    <>
      <button onClick={onOpenModal}>Settings</button>
      <Modal open={open} onClose={onCloseModal}>
        <h1>Settings</h1>
        <label htmlFor="data-source">Source: </label>
        <select
          id="data-source"
          value={source}
          onChange={(e) => setSource(e.target.value)}
        >
          {options}
        </select>
        <br />
        {sourceInfo}
        <br />
        <br />
        {keyField}
        <br />
        <button onClick={onCloseModal}>Cancel</button> |{" "}
        <button onClick={saveSettings}>Save</button>
      </Modal>
    </>
  );
}

Settings.propTypes = {
  data: PropTypes.exact({
    source: PropTypes.oneOf(Object.keys(rateSources)),
    key: PropTypes.string,
  }),
  saveAppSettings: PropTypes.func.isRequired,
};
