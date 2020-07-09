import React from "react";
import "./Command.css";
import CommandSymbol from "../CommandSymbol";
import { inputChange, inputClear } from "../../actions/commandInput";
import { connect } from "react-redux";

function CommandInput({ inputValue, onInputChange, onInputClear }) {
  const handleChange = (e) => {
    e.preventDefault();
    onInputChange(e.target.value);
  };

  const keyPressed = (e) => {
    if (e.key === "Enter") {
      onInputClear();
    }
  };

  return (
    <div className="CommandContainer">
      <CommandSymbol />
      <input
        onChange={handleChange}
        onKeyPress={keyPressed}
        value={inputValue}
        placeholder="Enter a command..."
        className={"Com"}
      />
    </div>
  );
}

const mapStateToCommandInputProps = (state) => ({
  inputValue: state.commandInput.inputValue,
});
const mapDispatchToCommandInputProps = (dispatch) => ({
  onInputChange: (value) => {
    dispatch(inputChange(value));
  },
  onInputClear: () => {
    dispatch(inputClear());
  },
});

export default connect(
  mapStateToCommandInputProps,
  mapDispatchToCommandInputProps
)(CommandInput);
