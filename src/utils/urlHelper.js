const API_KEY = process.env.REACT_APP_FIXER_API_KEY;

export const getListCurrenciesUrl = () => {
  return `http://data.fixer.io/api/symbols?access_key=${API_KEY}`;
};

export const getRateOfCurrencyUrl = (from, to) => {
  return `http://data.fixer.io/api/latest?access_key=${API_KEY}&base=${from}&symbols=${to}`;
};

export const getEurRateOfCurrencyUrl = (to) => {
  return getRateOfCurrencyUrl("EUR", to);
};
