import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import "./InfoBox.css";

const boxTypes = ["info", "success", "error"];
export default function InfoBox(props) {
  const [open, setOpen] = useState(true);

  // Try two different ways to validate props
  const text = "text" in props ? props.text : null;
  const type = !("type" in props)
    ? "info"
    : boxTypes.includes(props.type)
    ? props.type
    : "info";

  useEffect(() => {
    setOpen(true);
  }, [text]);

  // Build style classes
  const classes = ["info-box", type].join(" ");
  return (
    text &&
    open && (
      <div className={classes}>
        {text} <button onClick={() => setOpen(false)}>Dismiss</button>
      </div>
    )
  );
}

InfoBox.propTypes = {
  text: PropTypes.string,
  type: PropTypes.oneOf(boxTypes),
};
