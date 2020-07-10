import { combineReducers } from "redux";
import { currenciesReducer } from "./currencies";
import { commandInputReducer } from "./commandInput";
import { expensesReducer } from "./expenses";
import { commandHistoryReducer } from "./commandHistory";

const allReducers = combineReducers({
  currencies: currenciesReducer,
  commandInput: commandInputReducer,
  expenses: expensesReducer,
  commandHistory: commandHistoryReducer,
});

export default allReducers;
