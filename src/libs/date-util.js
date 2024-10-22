import {
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  format,
  subMonths,
} from "date-fns";
import { ja } from "date-fns/locale";

export const getEachDayOfInterval = (startDate, endDate) => {
  return eachDayOfInterval(startDate, endDate);
};
export const getStartOfMonth = (date) => {
  return startOfMonth(date);
};
export const getEndOfMonth = (date) => {
  return endOfMonth(date);
};
export const getFormat = (date, type) => {
  return format(date, type, { locale: ja });
};
export const getSubMonths = (date, monthsToSubtract) => {
  return subMonths(date, monthsToSubtract);
};
