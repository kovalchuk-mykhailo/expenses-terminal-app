import { combineReducers } from "redux";
import { currenciesReducer } from "./currencies";
import { commandInputReducer } from "./commandInput";

const allReducers = combineReducers({
  currencies: currenciesReducer,
  commandInput: commandInputReducer,
});

export default allReducers;
