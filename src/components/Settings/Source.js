import React from "react";
import PropTypes from "prop-types";
import rateSources from "../../constants/sources.json";

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

const SourceInfo = ({ source }) => {
  return (
    <a
      href={rateSources[source].info}
      target="_blank"
      rel="noopener noreferrer"
    >
      Learn more about this source.
    </a>
  );
};

SourceInfo.propTypes = {
  source: PropTypes.oneOf(Object.keys(rateSources)),
};

export default function Source({ source, setSource }) {
  return (
    <>
      <label htmlFor="data-source">Source: </label>
      <select
        id="data-source"
        value={source}
        onChange={(e) => setSource(e.target.value)}
      >
        {options}
      </select>
      <br />
      <SourceInfo source={source} />
    </>
  );
}

Source.propTypes = {
  source: PropTypes.oneOf(Object.keys(rateSources)),
  setSource: PropTypes.func.isRequired,
};
