import { combineReducers } from "redux";
import { currenciesReducer } from "./currencies";
import { commandInputReducer } from "./commandInput";
import { expensesReducer } from "./expenses";

const allReducers = combineReducers({
  currencies: currenciesReducer,
  commandInput: commandInputReducer,
  expenses: expensesReducer,
});

export default allReducers;
