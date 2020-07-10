import { ADD_HISTORY_ITEM } from "../constants/CommandHistory";

export const addHistoryItem = (historyItem) => ({
  type: ADD_HISTORY_ITEM,
  historyItem,
});
