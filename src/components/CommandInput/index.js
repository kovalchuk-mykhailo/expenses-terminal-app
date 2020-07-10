import React, { useEffect } from "react";
import "./Command.css";
import CommandSymbol from "../CommandSymbol";
import { inputChange, inputClear } from "../../actions/commandInput";
import { connect } from "react-redux";
import { addHistoryItem } from "../../actions/commandHistory";
import { addExpense, clearSomeExpenses } from "../../actions/expenses";
import { parseInput } from "../../utils/parseCommandHelper";

function CommandInput({
  inputValue,
  expenses,
  currencies,
  onInputChange,
  onInputClear,
  onAddHistoryItem,
  onAddExpense,
  onClearExpenses,
}) {
  const onHandleChange = (e) => {
    e.preventDefault();
    onInputChange(e.target.value);
  };

  const onKeyPressed = (e) => {
    if (e.key === "Enter") {
      parseInput(
        inputValue,
        expenses,
        currencies,
        onAddExpense,
        onClearExpenses
      )
        .then((res) => onAddHistoryItem(res))
        .finally(onInputClear);
    }
  };

  let commandInput;

  useEffect(() => {
    commandInput.focus();
  }, []);

  return (
    <div className="CommandContainer">
      <CommandSymbol />
      <input
        ref={(input) => {
          commandInput = input;
        }}
        onChange={onHandleChange}
        onKeyPress={onKeyPressed}
        value={inputValue}
        placeholder="Enter a command..."
        className={"Com"}
      />
    </div>
  );
}

const mapStateToCommandInputProps = (state) => ({
  inputValue: state.commandInput.inputValue,
  currencies: state.currencies.values,
  expenses: state.expenses.values,
});

const mapDispatchToCommandInputProps = (dispatch) => ({
  onInputChange: (value) => {
    dispatch(inputChange(value));
  },
  onInputClear: () => {
    dispatch(inputClear());
  },
  onAddHistoryItem: (item) => {
    dispatch(addHistoryItem(item));
  },
  onAddExpense: (expense) => {
    dispatch(addExpense(expense));
  },
  onClearExpenses: (date) => {
    dispatch(clearSomeExpenses(date));
  },
});

export default connect(
  mapStateToCommandInputProps,
  mapDispatchToCommandInputProps
)(CommandInput);
