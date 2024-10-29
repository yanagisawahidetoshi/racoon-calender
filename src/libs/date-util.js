import {
  startOfMonth as getStartOfMonth,
  lastDayOfMonth as getlastDayOfMonth,
  eachDayOfInterval as getEachDayOfInterval,
  format as getFormat,
  addMonths as getAddMonths,
} from "date-fns";
import { ja } from "date-fns/locale";

export const startOfMonth = (date) => {
  return getStartOfMonth(date);
};
export const lastDayOfMonth = (date) => {
  return getlastDayOfMonth(date);
};
export const eachDayOfInterval = (startDate, endDate) => {
  return getEachDayOfInterval(startDate, endDate);
};
export const format = (date, pattern) => {
  return getFormat(date, pattern, { locale: ja });
};
export const addMonths = (date, num) => {
  return getAddMonths(date, num);
};
