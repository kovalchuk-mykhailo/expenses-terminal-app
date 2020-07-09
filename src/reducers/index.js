import { combineReducers } from "redux";
import { currenciesReducer } from "./currencies";

const allReducers = combineReducers({
  currencies: currenciesReducer,
});

export default allReducers;
