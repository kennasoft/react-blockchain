import {
  FETCH_CURRENCIES,
  FETCH_CURRENCIES_SUCCESS,
  FETCH_CURRENCIES_FAILED,
  CLEAR_DATA,
  SET_LOADING_STATE,
  FETCH_QUOTES,
  FETCH_QUOTES_SUCCESS,
  FETCH_QUOTES_FAILED,
  SORT_QUOTES,
  REMOVE_QUOTE,
} from "./actions";
import * as R from "ramda";

export const initialState = {
  loading: false,
  currencies: [],
  quotes: [],
  deletedQuotes: [],
  sortDirection: "asc",
  error: null,
};

export const reducer = (state = initialState, action) => {
  const newState = { ...state };

  switch (action.type) {
    case FETCH_CURRENCIES:
    case FETCH_QUOTES:
      newState.loading = true;
      break;
    case FETCH_CURRENCIES_SUCCESS:
      newState.loading = false;
      newState.currencies = action.value;
      break;
    case FETCH_QUOTES_SUCCESS:
      newState.loading = false;
      newState.quotes = [...state.quotes, ...action.value];
      break;
    case FETCH_CURRENCIES_FAILED:
      newState.loading = false;
      newState.currencies = initialState.currencies;
      newState.error = action.value;
      break;
    case FETCH_QUOTES_FAILED:
      newState.loading = false;
      newState.quotes = initialState.quotes;
      newState.error = action.value;
      break;
    case REMOVE_QUOTE:
      newState.deletedQuotes = [
        ...state.deletedQuotes,
        state.quotes[state.quotes.length - 1],
      ];
      newState.quotes = state.quotes.slice(0, -1);
      break;
    case SORT_QUOTES:
      let comparator = getComparator(
        action.value?.orderBy,
        action.value?.order
      );
      newState.quotes.sort(comparator);
      break;
    case SET_LOADING_STATE:
      newState.loading = action.value;
      break;
    case CLEAR_DATA:
      action.value.forEach((field) => (newState[field] = initialState[field]));
      break;
    default:
      return newState;
  }

  return newState;
};

function getComparator(fieldName, direction) {
  const dir = direction === "asc" ? 1 : -1;
  return function comparator(a, b) {
    let field = fieldName.split(".");
    return dir * (R.path(field, a) - R.path(field, b));
  };
}
