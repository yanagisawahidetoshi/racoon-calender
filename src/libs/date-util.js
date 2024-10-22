import {
  startOfMonth as dateFnsStartOfMonth,
  endOfMonth as dateFnsEndOfMonth,
  eachDayOfInterval as dateFnsEachDayOfInterval,
  format as dateFnsFormat,
  addMonths as dateFnsAddMonths,
  subMonths as dateFnsSubMonths,
} from "date-fns";
import ja from "date-fns/locale/ja";

export const startOfMonth = (date) => {
  return dateFnsStartOfMonth(date);
};
export const endOfMonth = (date) => {
  return dateFnsEndOfMonth(date);
};
export const eachDayOfInterval = ({ start, end }) => {
  return dateFnsEachDayOfInterval({ start, end });
};
export const format = (date, DateFormatDate) => {
  return dateFnsFormat(date, DateFormatDate, { locale: ja });
};
export const addMonths = (date, num) => {
  return dateFnsAddMonths(date, num);
};
export const subMonths = (date, num) => {
  return dateFnsSubMonths(date, num);
};
