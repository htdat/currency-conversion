import React from "react";
import PropTypes from "prop-types";

export default function LastFetchTime({ timestamp }) {
  console.log(timestamp);
  return timestamp ? (
    <div>
      Exchange rates - last update:{" "}
      <span>{new Date(timestamp).toString()}</span>
    </div>
  ) : null;
}

LastFetchTime.propTypes = {
  timestamp: PropTypes.number,
};
