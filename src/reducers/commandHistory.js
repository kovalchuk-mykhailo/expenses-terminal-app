import { ADD_HISTORY_ITEM } from "../constants/CommandHistory";

const initialState = {
  history: [],
};

export const commandHistoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_HISTORY_ITEM: {
      return {
        history: [...state.history, action.historyItem],
      };
    }

    default:
      return state;
  }
};
