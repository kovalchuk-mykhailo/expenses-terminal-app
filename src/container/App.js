import React, { useEffect } from "react";
import CommandInput from "../components/CommandInput";
import { connect } from "react-redux";
import { getCurrenciesAsyncRequest } from "../actions/currencies";

function App({ getCurrenciesAsync }) {
  useEffect(() => {
    getCurrenciesAsync();
  }, []);

  return <CommandInput />;
}

const mapDispatchToCurrenciesProps = (dispatch) => ({
  getCurrenciesAsync: () => {
    dispatch(getCurrenciesAsyncRequest());
  },
});

export default connect(null, mapDispatchToCurrenciesProps)(App);
