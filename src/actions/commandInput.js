import { INPUT_CHANGE, INPUT_CLEAR } from "../constants/CommandInput";

export const inputChange = (value) => ({
  type: INPUT_CHANGE,
  value: value,
});

export const inputClear = () => ({
  type: INPUT_CLEAR,
});
