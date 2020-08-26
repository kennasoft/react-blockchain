export const FETCH_CURRENCIES = "FETCH_CURRENCIES";
export const FETCH_CURRENCIES_SUCCESS = "FETCH_CURRENCIES_SUCCESS";
export const FETCH_CURRENCIES_FAILED = "FETCH_CURRENCIES_FAILED";
export const FETCH_QUOTES = "FETCH_QUOTES";
export const FETCH_QUOTES_SUCCESS = "FETCH_QUOTES_SUCCESS";
export const FETCH_QUOTES_FAILED = "FETCH_QUOTES_FAILED";
export const REMOVE_QUOTE = "REMOVE_QUOTE";
export const SORT_QUOTES = "SORT_QUOTES";
export const CLEAR_DATA = "CLEAR_DATA";
export const SET_LOADING_STATE = "SET_LOADING_STATE";

export const clearError = () => ({ type: CLEAR_DATA, value: ["error"] });

export const fetchCurrencies = (howMany) => ({
  type: FETCH_CURRENCIES,
  value: howMany,
});

export const fetchCurrenciesSuccess = (data) => ({
  type: FETCH_CURRENCIES_SUCCESS,
  value: data,
});

export const fetchCurrenciesFailed = (errorMessage) => ({
  type: FETCH_CURRENCIES_FAILED,
  value: errorMessage,
});

export const fetchQuotes = (currencyCodes) => ({
  type: FETCH_QUOTES,
  value: currencyCodes,
});

export const fetchQuotesSuccess = (data) => ({
  type: FETCH_QUOTES_SUCCESS,
  value: data,
});

export const fetchQuotesFailed = (errorMessage) => ({
  type: FETCH_QUOTES_FAILED,
  value: errorMessage,
});

export const removeQuote = (id) => ({
  type: REMOVE_QUOTE,
  value: id,
});

export const sortQuotes = (sortBy) => ({
  type: SORT_QUOTES,
  value: sortBy,
});

export const clearData = (fields) => ({
  type: CLEAR_DATA,
  value: fields,
});
