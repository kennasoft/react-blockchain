import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  Snackbar,
  Container,
  CssBaseline,
  LinearProgress,
  Box,
  Button,
  AppBar,
  Toolbar,
  IconButton,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import DeleteIcon from "@material-ui/icons/Delete";
import WalletIcon from "@material-ui/icons/AccountBalanceWallet";
import { Dropdown } from "./components/Dropdown";
import { DataTable } from "./components/DataTable";
import {
  fetchCurrencies,
  fetchQuotes,
  clearError,
  removeQuote,
  sortQuotes,
} from "./store/actions";
import {
  getCurrencies,
  getQuotes,
  getError,
  getLoadingState,
} from "./selectors";
import "./index.css";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const StatelessApp = (props) => {
  const {
    quotes,
    currencies,
    fetchQuotes,
    fetchCurrencies,
    loading,
    error,
    removeQuote,
    clearError,
    sortQuotes,
  } = props;

  const [quoted, setQuoted] = useState([]);

  useEffect(() => {
    fetchCurrencies(10);
    // we want to fetch currencies list once, on component mount
  }, [fetchCurrencies]);

  useEffect(() => {
    // fetch first 5 quotes once currencies load
    if (currencies?.length && !quotes?.length) {
      const first5 = currencies.slice(0, 5).map((curr) => curr.id);
      setQuoted(first5);
      fetchQuotes(first5);
    }
    if (quotes?.length) {
      setQuoted(quotes.map((q) => q.id));
    }
  }, [quotes, currencies, fetchQuotes]);

  return (
    <React.Fragment>
      <CssBaseline />
      <div className="App">
        {loading && <LinearProgress />}
        <AppBar color="transparent" elevation={0} position="static">
          <Toolbar>
            <IconButton>
              <WalletIcon color="action" />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Container maxWidth="md">
          <Dropdown
            data={currencies}
            withQuote={quoted}
            onSelect={fetchQuotes}
          />
          <Box
            paddingTop={3}
            paddingBottom={3}
            display="flex"
            justifyContent="flex-end"
          >
            <Button
              variant="contained"
              color="secondary"
              disabled={quotes.length < 2}
              onClick={() => removeQuote(quotes[quotes.length - 1]?.id)}
            >
              <DeleteIcon />
              <span>Remove Rows</span>
            </Button>
          </Box>
          <DataTable data={quotes} sortAction={sortQuotes} />
        </Container>
        <Snackbar open={!!error} onClose={clearError} autoHideDuration={6000}>
          <Alert onClose={clearError} severity="error">
            {error}
          </Alert>
        </Snackbar>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: getLoadingState(state),
    currencies: getCurrencies(state) || [],
    quotes: getQuotes(state) || [],
    error: getError(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCurrencies: (howMany) => dispatch(fetchCurrencies(howMany)),
    fetchQuotes: (ids) => dispatch(fetchQuotes(ids)),
    removeQuote: (id) => dispatch(removeQuote(id)),
    sortQuotes: (sortProps) => dispatch(sortQuotes(sortProps)),
    clearError: () => dispatch(clearError()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StatelessApp);
