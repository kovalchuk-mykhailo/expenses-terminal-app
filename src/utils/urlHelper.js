const API_KEY = process.env.REACT_APP_FIXER_API_KEY;

export const getListCurrenciesUrl = () => {
  return `http://data.fixer.io/api/symbols?access_key=${API_KEY}`;
};
