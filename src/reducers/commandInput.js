import { INPUT_CHANGE, INPUT_CLEAR } from "../constants/CommandInput";

const initialState = {
  inputValue: "",
};

export const commandInputReducer = (state = initialState, action) => {
  switch (action.type) {
    case INPUT_CHANGE: {
      return {
        inputValue: action.value,
      };
    }

    case INPUT_CLEAR: {
      return {
        inputValue: "",
      };
    }

    default:
      return state;
  }
};
