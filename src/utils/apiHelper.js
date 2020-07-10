import { getListCurrenciesUrl, getEurRateOfCurrencyUrl } from "./urlHelper";

const getResponseJson = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export const listCurrenciesRequest = async () => {
  const url = getListCurrenciesUrl();
  const { symbols } = await getResponseJson(url);
  const currencies = Object.keys(symbols);
  return currencies;
};

export const getEurRateOfCurrency = async (to) => {
  const url = getEurRateOfCurrencyUrl(to);
  const { rates } = await getResponseJson(url);
  return rates[to];
};
