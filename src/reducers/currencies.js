import {
  GET_CURRENCIES_ASYNC_REQUEST,
  GET_CURRENCIES_REQUEST,
  GET_CURRENCIES_FAILURE,
  GET_CURRENCIES_SUCCESS,
} from "../constants/Currencies";

const initialState = {
  values: [],
  isLoading: false,
  error: "",
};

export const currenciesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CURRENCIES_ASYNC_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case GET_CURRENCIES_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case GET_CURRENCIES_SUCCESS:
      return {
        ...state,
        values: action.currencies,
        isLoading: false,
      };

    case GET_CURRENCIES_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };

    default:
      return state;
  }
};
