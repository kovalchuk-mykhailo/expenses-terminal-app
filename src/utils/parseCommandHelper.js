import {
  isListOptValid,
  isTotalOptValid,
  isAddOptValid,
  isAmountSpentValid,
  isClearOptValid,
} from "./optionsValidation";

const {
  ADD_COMMAND,
  LIST_COMMAND,
  CLEAR_COMMAND,
  TOTAL_COMMAND,
} = require("../constants/Commands");
const { isDateValid, getStandardStringDate } = require("./dateHelper");
const { getEurRateOfCurrency } = require("./apiHelper");

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

const listStrategy = (opt, expensesInstance) => {
  //Should return expenses sorted  by date

  if (isListOptValid(opt)) {
    const sorted = [...expensesInstance];
    sorted.sort((a, b) => {
      const aDate = new Date(a.date);
      const bDate = new Date(b.date);
      return aDate - bDate;
    });
    return sorted;
  } else throw new Error("INVALID list options");
};

const totalStrategy = async (opt, expensesInstance, currencies) => {
  let desiredCurrency;
  let sum = 0;
  if (isTotalOptValid(opt)) {
    desiredCurrency = opt[0];
  } else throw new Error("INVALID total options");

  if (currencies.includes(desiredCurrency)) {
    const memoRates = new Map();
    for (let i = 0; i < expensesInstance.length; i++) {
      const expense = expensesInstance[i];
      if (expense.currency === desiredCurrency) {
        sum += expense.amountMoneySpent;
      } else if (memoRates.has(expense.currency)) {
        sum += expense.amountMoneySpent * memoRates.get(expense.currency);
      } else {
        // Find rate
        let rateDesiredResp = await getEurRateOfCurrency(desiredCurrency);
        if (desiredCurrency !== "EUR") {
          const rateExpenseResp = await getEurRateOfCurrency(expense.currency);
          rateDesiredResp = rateDesiredResp / rateExpenseResp;
        }

        //Memorize desired rate
        memoRates.set(expense.currency, rateDesiredResp);

        const moneySpent = expense.amountMoneySpent * rateDesiredResp;
        sum += moneySpent;
      }
    }
  } else throw new Error("Invalid currency");

  return { sum, currency: desiredCurrency };
};

const addStrategy = (opt, expensesInstance, currencies, onAddExpense) => {
  let result = [];
  if (isAddOptValid(opt)) {
    const [date, amountSpent, currency, productName] = opt;
    if (!isDateValid(date)) throw new Error("Invalid Date");
    if (!isAmountSpentValid(amountSpent))
      throw new Error("Invalid AmountSpent");
    if (!currencies.includes(currency)) throw new Error("Invalid Currency");

    const inputExpense = generateExpense(
      date,
      amountSpent,
      currency,
      productName
    );

    onAddExpense(inputExpense);

    result = [...expensesInstance, inputExpense];
  } else throw new Error("Invalid ADD Options");
  return result;
};

const clearStrategy = (opt, expensesInstance, onClearExpenses) => {
  if (isClearOptValid(opt) && isDateValid(opt[0])) {
    const date = new Date(opt[0]).toString();

    onClearExpenses(date);

    const resultExpenses = expensesInstance.filter(
      (expense) => expense.date !== date
    );
    return resultExpenses;
  } else throw new Error("INVALID Clear Options");
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
          throw new Error("Invalid command");
      }
    } else throw new Error("Invalid options");

    historyItem = { ...historyItem, result: commandResult };
  } catch (error) {
    const errMsg = error.message;
    historyItem = { ...historyItem, error: errMsg };
  }
  return historyItem;
};
