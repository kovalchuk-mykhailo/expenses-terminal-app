import React, { useEffect } from "react";
import CommandInput from "./CommandInput";
import { connect } from "react-redux";
import { getCurrenciesAsyncRequest } from "../actions/currencies";
import HistoryList from "./HistoryList";

function App({ getCurrenciesAsync }) {
  useEffect(() => {
    getCurrenciesAsync();
  }, []);

  return (
    <div>
      <HistoryList />
      <CommandInput />
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  getCurrenciesAsync: () => {
    dispatch(getCurrenciesAsyncRequest());
  },
});

export default connect(null, mapDispatchToProps)(App);
