import { ADD_EXPENSE, CLEAR_SOME_EXPENSES } from "../constants/Expenses";
import { getStandardStringDate } from "../utils/dateHelper";

const initialState = {
  values: [],
};

const getFilteredExpenses = (expenses, dateString) => {
  const date = getStandardStringDate(dateString);
  return expenses.filter((expense) => expense.date !== date);
};

export const expensesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_EXPENSE: {
      return {
        values: [...state.values, action.expense],
      };
    }

    case CLEAR_SOME_EXPENSES: {
      return {
        values: getFilteredExpenses(state.values, action.dateString),
      };
    }

    default:
      return state;
  }
};
