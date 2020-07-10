import { takeEvery, call, put } from "redux-saga/effects";
import { GET_CURRENCIES_ASYNC_REQUEST } from "../constants/Currencies";
import {
  getCurrenciesRequest,
  getCurrenciesSuccess,
  getCurrenciesFailure,
} from "../actions/currencies";
import { listCurrenciesRequest } from "../utils/apiHelper";

function* requestCurrenciesAsync() {
  try {
    yield put(getCurrenciesRequest());

    const currencies = yield call(listCurrenciesRequest);

    yield put(getCurrenciesSuccess(currencies));
  } catch (error) {
    yield put(getCurrenciesFailure(error.message));
  }
}

export function* watchCurrenciesAsync() {
  yield takeEvery(GET_CURRENCIES_ASYNC_REQUEST, requestCurrenciesAsync); //Always watch for requestCurrenciesAsync, when action.type = GET_CURRENCIES_ASYNC_REQUEST
}
