import { createSelector } from "reselect";

export const getCurrencies = (state) => state.currencies;
export const getLoadingState = (state) => state.loading;
export const getError = (state) => state.error;
export const getQuotes = (state) => state.quotes;
export const getDeletedQuotes = (state) => state.deletedQuotes;
export const getAlreadyFetchedQuotes = createSelector(
  [getQuotes, getDeletedQuotes],
  (quotes, deletedQuotes) => [...quotes, ...deletedQuotes]
);
