import {
  eachDayOfInterval as getEachDayOfInterval,
  startOfMonth as getStartOfMonth,
  endOfMonth as getEndOfMonth,
  format as getFormat,
  addMonths as getAddMonths,
  parse as getParse,
} from "date-fns";
import { ja } from "date-fns/locale";

export const eachDayOfInterval = (startDate, endDate) => {
  return getEachDayOfInterval(startDate, endDate);
};
export const startOfMonth = (date) => {
  return getStartOfMonth(date);
};
export const endOfMonth = (date) => {
  return getEndOfMonth(date);
};
export const format = (date, type) => {
  return getFormat(date, type, { locale: ja });
};
export const addMonths = (date, monthsToSubtract) => {
  return getAddMonths(date, monthsToSubtract);
};
export const parse = (date, format, newDate) => {
  return getParse(date, format, newDate);
};
