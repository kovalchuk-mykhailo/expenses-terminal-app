import React from "react";
import styles from "./commandText.module.css";
import CommandSymbol from "../CommandSymbol";

export function CommandText({ text }) {
  return (
    <div className={styles.TextContainer}>
      <CommandSymbol />
      <section className={styles.Text}>{text}</section>
    </div>
  );
}
