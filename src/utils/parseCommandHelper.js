import {
  isListOptValid,
  isTotalOptValid,
  isAddOptValid,
  isAmountSpentValid,
  isClearOptValid,
  isCurrencyValid,
} from "./optionsValidation";
import {
  ADD_COMMAND,
  LIST_COMMAND,
  CLEAR_COMMAND,
  TOTAL_COMMAND,
} from "../constants/Commands";
import {
  isDateValid,
  getStandardStringDate,
  getSpecificStringDate,
} from "./dateHelper";
import { getEurRateOfCurrency } from "./apiHelper";
import {
  INVALID_CURRENCY,
  INVALID_TOTAL_OPTIONS,
  INVALID_LIST_OPTIONS,
  INVALID_DATE,
  INVALID_AMOUNT_MONEY_SPENT,
  INVALID_ADD_OPTIONS,
  INVALID_CLEAR_OPTIONS,
  INVALID_COMMAND,
} from "../constants/Errors";

const generateExpense = (
  stringDate,
  amountMoneySpent,
  currency,
  productName
) => ({
  date: getStandardStringDate(stringDate),
  amountMoneySpent: +amountMoneySpent,
  currency,
  productName,
});

const convertExpensesToString = (expenses) => {
  return expenses.map(
    ({ date, amountMoneySpent, currency, productName }) =>
      `${getSpecificStringDate(
        date
      )} ${productName}\n${amountMoneySpent} ${currency}`
  );
};

const listStrategy = (opt, expensesInstance) => {
  if (isListOptValid(opt)) {
    const sorted = [...expensesInstance];
    sorted.sort((a, b) => {
      const aDate = new Date(a.date);
      const bDate = new Date(b.date);
      return aDate - bDate;
    });

    return convertExpensesToString(sorted);
  } else throw new Error(INVALID_LIST_OPTIONS);
};

const totalStrategy = async (opt, expensesInstance, currencies) => {
  let desiredCurrency;
  let sum = 0;
  if (isTotalOptValid(opt)) {
    desiredCurrency = opt[0].toUpperCase();
  } else throw new Error(INVALID_TOTAL_OPTIONS);

  if (isCurrencyValid(currencies, desiredCurrency)) {
    const memoRates = new Map();

    for (let i = 0; i < expensesInstance.length; i++) {
      const expense = expensesInstance[i];

      if (expense.currency === desiredCurrency) {
        sum += expense.amountMoneySpent;
      } else if (memoRates.has(expense.currency)) {
        sum += expense.amountMoneySpent * memoRates.get(expense.currency);
      } else {
        let rateDesiredResp = await getEurRateOfCurrency(desiredCurrency);

        if (expense.currency !== "EUR") {
          const rateExpenseResp = await getEurRateOfCurrency(expense.currency);
          rateDesiredResp = rateDesiredResp / rateExpenseResp;
        }

        memoRates.set(expense.currency, rateDesiredResp);

        const moneySpent = expense.amountMoneySpent * rateDesiredResp;
        sum += moneySpent;
      }
    }
  } else throw new Error(INVALID_CURRENCY);

  const resultString = `${sum.toFixed(2)} ${desiredCurrency}`;

  return [resultString];
};

const addStrategy = (opt, expensesInstance, currencies, onAddExpense) => {
  let result = [];
  if (isAddOptValid(opt)) {
    const [date, amountSpent, currency, productName] = opt;
    if (!isDateValid(date)) throw new Error(INVALID_DATE);
    if (!isAmountSpentValid(amountSpent))
      throw new Error(INVALID_AMOUNT_MONEY_SPENT);
    if (!isCurrencyValid(currencies, currency))
      throw new Error(INVALID_CURRENCY);

    const inputExpense = generateExpense(
      date,
      amountSpent,
      currency,
      productName
    );

    onAddExpense(inputExpense);

    result = [...expensesInstance, inputExpense];
  } else throw new Error(INVALID_ADD_OPTIONS);
  return convertExpensesToString(result);
};

const clearStrategy = (opt, expensesInstance, onClearExpenses) => {
  if (isClearOptValid(opt) && isDateValid(opt[0])) {
    const date = getStandardStringDate(opt[0]);

    onClearExpenses(date);

    const resultExpenses = expensesInstance.filter(
      (expense) => expense.date !== date
    );
    return convertExpensesToString(resultExpenses);
  } else throw new Error(INVALID_CLEAR_OPTIONS);
};

export const parseInput = async (
  inputText,
  expenses,
  currencies,
  onAddExpense,
  onClearExpenses
) => {
  const words = inputText.trim().split(" ");
  let historyItem = {
    command: "",
    inputText,
    result: [],
    error: "",
  };

  let commandResult = [];

  try {
    if (words.length > 0 && words.length <= 5) {
      const [command, ...options] = words;
      historyItem = { ...historyItem, command };
      switch (command) {
        case ADD_COMMAND:
          commandResult = addStrategy(
            options,
            expenses,
            currencies,
            onAddExpense
          );
          break;
        case LIST_COMMAND:
          commandResult = listStrategy(options, expenses);
          break;
        case CLEAR_COMMAND:
          commandResult = clearStrategy(options, expenses, onClearExpenses);
          break;
        case TOTAL_COMMAND:
          commandResult = await totalStrategy(options, expenses, currencies);
          break;
        default:
          throw new Error(INVALID_COMMAND);
      }
    } else throw new Error(INVALID_COMMAND);

    historyItem = { ...historyItem, result: commandResult };
  } catch (error) {
    historyItem = { ...historyItem, error: error.message };
  }
  return historyItem;
};
