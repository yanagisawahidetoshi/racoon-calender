import {
  eachDayOfInterval as getDateFnsEachDayOfInterval,
  startOfMonth as getDateFnsStartOfMonth,
  endOfMonth as getDateFnsEndOfMonth,
  format as getDateFnsFormat,
  addMonths as getDateFnsAddMonths,
  parse as getDateFnsParse,
} from "date-fns";
import { ja } from "date-fns/locale";

export const eachDayOfInterval = (startDate, endDate) => {
  return getDateFnsEachDayOfInterval(startDate, endDate);
};
export const startOfMonth = (date) => {
  return getDateFnsStartOfMonth(date);
};
export const endOfMonth = (date) => {
  return getDateFnsEndOfMonth(date);
};
export const format = (date, type) => {
  return getDateFnsFormat(date, type, { locale: ja });
};
export const addMonths = (date, monthsToSubtract) => {
  return getDateFnsAddMonths(date, monthsToSubtract);
};
export const parse = (date, format, newDate) => {
  return getDateFnsParse(date, format, newDate);
};
