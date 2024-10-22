import {
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  format,
  subMonths,
} from "date-fns";
import { ja } from "date-fns/locale";

export const dateFnsEachDayOfInterval = (startDate, endDate) => {
  return eachDayOfInterval(startDate, endDate);
};
export const dateFnsStartOfMonth = (date) => {
  return startOfMonth(date);
};
export const dateFnsEndOfMonth = (date) => {
  return endOfMonth(date);
};
export const dateFnsFormat = (date, type) => {
  return format(date, type, { locale: ja });
};
export const dateFnsSubMonths = (date, monthsToSubtract) => {
  return subMonths(date, monthsToSubtract);
};
