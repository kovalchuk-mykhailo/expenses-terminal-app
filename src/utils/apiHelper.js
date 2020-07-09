import { getListCurrenciesUrl } from "./urlHelper";

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
