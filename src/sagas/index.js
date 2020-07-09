import { all } from "redux-saga/effects";
import { watchCurrenciesAsync } from "./currenciesWatch";

export default function* rootSaga() {
  yield all([watchCurrenciesAsync()]);
}
