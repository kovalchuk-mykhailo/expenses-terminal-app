import {
  GET_CURRENCIES_ASYNC_REQUEST,
  GET_CURRENCIES_REQUEST,
  GET_CURRENCIES_SUCCESS,
  GET_CURRENCIES_FAILURE,
} from "../constants/Currencies";

export const getCurrenciesAsyncRequest = () => ({
  type: GET_CURRENCIES_ASYNC_REQUEST,
});

export const getCurrenciesRequest = () => ({
  type: GET_CURRENCIES_REQUEST,
});

export const getCurrenciesSuccess = (currencies) => ({
  type: GET_CURRENCIES_SUCCESS,
  currencies,
});

export const getCurrenciesFailure = (error) => ({
  type: GET_CURRENCIES_FAILURE,
  error,
});
