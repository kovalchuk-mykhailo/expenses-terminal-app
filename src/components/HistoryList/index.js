import React from "react";
import { connect } from "react-redux";
import HistoryItem from "../HistoryItem";

function HistoryList({ commandHistory }) {
  return (
    <div>
      {commandHistory.map((val, index) => {
        return <HistoryItem key={index} history={val} />;
      })}
    </div>
  );
}
const mapStateToProps = (state) => ({
  commandHistory: state.commandHistory.history,
});

export default connect(mapStateToProps, null)(HistoryList);
