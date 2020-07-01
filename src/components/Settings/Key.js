import React from "react";
import PropTypes from "prop-types";

export default function Key({ keyText, infoTxt, setKey, display }) {
  return (
    display && (
      <>
        <label htmlFor="data-key">Key: </label>
        <input
          type="text"
          id="data-key"
          onChange={(e) => setKey(e.target.value)}
          defaultValue={keyText}
        />
        {infoTxt && <div>{infoTxt}</div>}
      </>
    )
  );
}

Key.propTypes = {
  keyText: PropTypes.string.isRequired,
  infoTxt: PropTypes.string.isRequired,
  setKey: PropTypes.func.isRequired,
  display: PropTypes.bool.isRequired,
};
