import {
  eachDayOfInterval as getDateFnsEachDayOfInterval,
  startOfMonth as getDateFnsStartOfMonth,
  endOfMonth as getDateFnsEndOfMonth,
  format as getDateFnsFormat,
  addMonths as getDateFnsAddMonths,
  parse as getDateFnsParse,
  parseISO as getDateFnsParseISO,
  isSameYear as getDateFnsIsSameYear,
  isSameMonth as getDateFnsIsSameMonth,
  isSameDay as getDateFnsIsSameDay,
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
export const parseISO = (date) => {
  return getDateFnsParseISO(date);
};
export const isSameYear = (date1, date2) => {
  return getDateFnsIsSameYear(date1, date2);
};
export const isSameMonth = (date1, date2) => {
  return getDateFnsIsSameMonth(date1, date2);
};
export const isSameDay = (date1, date2) => {
  return getDateFnsIsSameDay(date1, date2);
};
