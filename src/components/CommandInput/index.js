import React, { useState } from "react";
import "./Command.css";
import CommandSymbol from "../CommandSymbol";

export default function CommandInput() {
  const [input, setInput] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setInput(value);
  };

  const keyPressed = (event) => {
    if (event.key === "Enter") {
      const val = "";
      setInput(val);
      event.target.value = val;
    }
  };

  return (
    <div className="CommandContainer">
      <CommandSymbol />
      <input
        onChange={handleChange}
        onKeyPress={keyPressed}
        value={input}
        placeholder="Enter a command..."
        className={"Com"}
      />
    </div>
  );
}
