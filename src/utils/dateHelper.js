import moment from "moment";

const format = "YYYY-MM-DD";

export const isDateValid = (stringDate) => {
  const res = moment(stringDate, format);
  return res.isValid();
};

export const getStandardStringDate = (stringDate) => {
  return moment(stringDate, format).format();
};

export const getSpecificStringDate = (stringDate) => {
  return moment(stringDate).format(format);
};
