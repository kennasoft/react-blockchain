import { takeLatest, put, call, select } from "redux-saga/effects";
import axios from "axios";
import {
  SET_LOADING_STATE,
  FETCH_CURRENCIES,
  FETCH_CURRENCIES_SUCCESS,
  FETCH_CURRENCIES_FAILED,
  FETCH_QUOTES,
  FETCH_QUOTES_SUCCESS,
  FETCH_QUOTES_FAILED,
} from "../store/actions";
import { getAlreadyFetchedQuotes } from "../selectors";

const API_URL = "https://www.stackadapt.com/coinmarketcap";

export const fetchMap = (limit) =>
  axios.get(`${API_URL}/map${limit ? `?limit=${limit}` : ""}`).then((resp) => {
    return resp.data;
  });

export const fetchQuotes = (id) => {
  const ids = Array.isArray(id) ? id.join(",") : id;
  return axios
    .get(`${API_URL}/quotes${ids ? `?id=${ids}` : ""}`)
    .then((resp) => resp.data);
};

export function* fetchCryptoCurrenciesAsync(action) {
  yield put({ type: SET_LOADING_STATE, value: true });
  try {
    const resp = yield call(fetchMap, action.value);

    yield put({ type: FETCH_CURRENCIES_SUCCESS, value: resp && resp.data });
  } catch (exception) {
    yield put({ type: FETCH_CURRENCIES_FAILED, value: exception.message });
  }
}

export function* fetchQuotesAsync(action) {
  yield put({ type: SET_LOADING_STATE, value: true });
  try {
    const existing = yield select(getAlreadyFetchedQuotes);
    const found = existing?.find((quote) => quote.id === action.value);
    if (found) {
      return yield put({ type: FETCH_QUOTES_SUCCESS, value: [found] });
    }
    const resp = yield call(fetchQuotes, action.value);

    yield put({
      type: FETCH_QUOTES_SUCCESS,
      value: resp && Object.values(resp.data),
    });
  } catch (exception) {
    yield put({ type: FETCH_QUOTES_FAILED, value: exception.message });
  }
}

export function* initSagas() {
  yield takeLatest(FETCH_CURRENCIES, fetchCryptoCurrenciesAsync);
  yield takeLatest(FETCH_QUOTES, fetchQuotesAsync);
}
