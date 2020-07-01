import React, { useState, useContext } from "react";
import Modal from "react-responsive-modal";

import rateSources from "../constants/sources.json";
import { canFetchData } from "../lib/helpers.js";
import Source from "./Settings/Source.js";
import Key from "./Settings/Key.js";
import { AppContext } from "../App.js";

export default function Settings(props) {
  const { settings, saveAppSettings } = useContext(AppContext);

  const [open, setOpen] = useState(false);
  const [infoTxt, setInfoTxt] = useState("");
  const [source, setSource] = useState(settings.source);
  const [key, setKey] = useState(settings.key);

  const onOpenModal = () => {
    // Reset these state values back to their parent values
    // This is a bit different from handling for EditCurrencies
    // @TODO - make sure EditCurrencies and Settings components having the same approach
    setOpen(true);
    setInfoTxt("");
    setSource(settings.source);
    setKey(settings.key);
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
      source,
      key,
    });

    onCloseModal();
  }

  return (
    <>
      <button onClick={onOpenModal}>Settings</button>
      <Modal open={open} onClose={onCloseModal}>
        <h1>Settings</h1>
        <Source source={source} setSource={setSource} />
        <br />
        <br />
        <Key
          infoTxt={infoTxt}
          keyText={key}
          setKey={setKey}
          display={rateSources[source].keyRequired}
        />
        <br />
        <button onClick={onCloseModal}>Cancel</button> |{" "}
        <button onClick={saveSettings}>Save</button>
      </Modal>
    </>
  );
}
