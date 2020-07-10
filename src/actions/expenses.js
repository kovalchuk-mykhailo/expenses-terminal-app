import { ADD_EXPENSE, CLEAR_SOME_EXPENSES } from "../constants/Expenses";

export const addExpense = (expense) => ({
  type: ADD_EXPENSE,
  expense,
});

export const clearSomeExpenses = (dateString) => ({
  type: CLEAR_SOME_EXPENSES,
  dateString,
});
