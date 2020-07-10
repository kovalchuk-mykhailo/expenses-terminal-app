export const isAmountSpentValid = (val) => {
  return !Number.isNaN(+val) && val >= 0;
};

export const isCurrencyValid = (currencies, currency) => {
  return currencies.includes(currency.toUpperCase());
};

export const isListOptValid = (opt) => {
  return opt.length === 0 ? true : false;
};

export const isAddOptValid = (opt) => {
  return opt.length === 4 ? true : false;
};

export const isClearOptValid = (opt) => {
  return opt.length === 1 ? true : false;
};

export const isTotalOptValid = (opt) => {
  return opt.length === 1 ? true : false;
};
