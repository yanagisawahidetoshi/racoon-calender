import {
  startOfMonth as dateFnsStartOfMonth,
  lastDayOfMonth as dateFnslastDayOfMonth,
  eachDayOfInterval as dateFnsEachDayOfInterval,
  format as dateFnsFormat,
  addMonths as dateFnsAddMonths,
} from "date-fns";
import { ja } from "date-fns/locale";

export const startOfMonth = (date) => {
  return dateFnsStartOfMonth(date);
};
export const lastDayOfMonth = (date) => {
  return dateFnslastDayOfMonth(date);
};
export const eachDayOfInterval = (startDate, endDate) => {
  return dateFnsEachDayOfInterval(startDate, endDate);
};
export const format = (date, pattern) => {
  return dateFnsFormat(date, pattern, { locale: ja });
};
export const addMonths = (date, num) => {
  return dateFnsAddMonths(date, num);
};
