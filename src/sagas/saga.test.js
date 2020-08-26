import { put, call, select } from "redux-saga/effects";
import {
  fetchQuotesAsync,
  fetchQuotes,
  fetchCryptoCurrenciesAsync,
  fetchMap,
} from "./saga";
import {
  SET_LOADING_STATE,
  FETCH_QUOTES,
  FETCH_QUOTES_SUCCESS,
  FETCH_QUOTES_FAILED,
  FETCH_CURRENCIES,
  FETCH_CURRENCIES_SUCCESS,
  FETCH_CURRENCIES_FAILED,
} from "../store/actions";
import { getAlreadyFetchedQuotes } from "../selectors";

describe("Fetch cryptocurrencies list", () => {
  const fetchAction = { type: FETCH_CURRENCIES, value: 7 };

  it("fetches a list of cryptocurrencies successfully", () => {
    const generator = fetchCryptoCurrenciesAsync(fetchAction);
    expect(generator.next().value).toEqual(
      put({ type: SET_LOADING_STATE, value: true })
    );
    expect(generator.next().value).toEqual(call(fetchMap, fetchAction.value));
    expect(generator.next().value).toEqual(
      put({ type: FETCH_CURRENCIES_SUCCESS })
    );
  });

  it("handles exception as expected", () => {
    const generator = fetchCryptoCurrenciesAsync(fetchAction);
    expect(generator.next().value).toEqual(
      put({ type: SET_LOADING_STATE, value: true })
    );

    expect(generator.next().value).toEqual(call(fetchMap, fetchAction.value));
    expect(generator.throw("error").value).toEqual(
      put({ type: FETCH_CURRENCIES_FAILED, value: undefined })
    );
  });
});

describe("Fetch cryptocurrency quotes", () => {
  const fetchAction = { type: FETCH_QUOTES, value: 3 };

  it("fetches the quotes successfully", () => {
    const generator = fetchQuotesAsync(fetchAction);
    expect(generator.next().value).toEqual(
      put({ type: SET_LOADING_STATE, value: true })
    );
    expect(generator.next().value).toEqual(select(getAlreadyFetchedQuotes));
    expect(generator.next().value).toEqual(
      call(fetchQuotes, fetchAction.value)
    );
    expect(generator.next().value).toEqual(
      put({ type: FETCH_QUOTES_SUCCESS, value: undefined })
    );
  });

  it("handles exception as expected", () => {
    const generator = fetchQuotesAsync(fetchAction);
    expect(generator.next().value).toEqual(
      put({ type: SET_LOADING_STATE, value: true })
    );
    expect(generator.next().value).toEqual(select(getAlreadyFetchedQuotes));
    expect(generator.next().value).toEqual(
      call(fetchQuotes, fetchAction.value)
    );
    expect(generator.throw("error").value).toEqual(
      put({ type: FETCH_QUOTES_FAILED, value: undefined })
    );
  });
});
