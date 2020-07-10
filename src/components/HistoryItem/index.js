import React from "react";
import { CommandText } from "../CommandText";

const renderWithError = (history) => {
  if (history.error) {
    return <div style={{ color: "red" }}>{history.error}</div>;
  } else {
    return (
      <div>
        {history.result.map((val, index) => {
          return <div key={index}>{val}</div>;
        })}
      </div>
    );
  }
};

function HistoryItem({ history }) {
  return (
    <div>
      <CommandText text={history.inputText} />
      {renderWithError(history)}
    </div>
  );
}

export default HistoryItem;
