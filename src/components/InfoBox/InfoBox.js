import React, { useState, useEffect, useContext } from "react";

import "./InfoBox.css";
import { AppContext } from "../../App.js";

const boxTypes = ["info", "success", "error"];
export default function InfoBox() {
  const [open, setOpen] = useState(true);

  const data = useContext(AppContext).infoBoxData;

  // Try two different ways to validate props
  const text = "text" in data ? data.text : null;
  const type = !("type" in data)
    ? "info"
    : boxTypes.includes(data.type)
    ? data.type
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
