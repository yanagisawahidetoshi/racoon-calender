import {
  startOfMonth as dateFnsStartOfMonth,
  endOfMonth as dateFnsEndOfMonth,
  eachDayOfInterval as dateFnsEachDayOfInterval,
  format as dateFnsFormat,
  addMonths as dateFnsAddMonths,
  parse as dateFnsParse,
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
export const format = (date, dateFormatDate) => {
  return dateFnsFormat(date, dateFormatDate, { locale: ja });
};
export const addMonths = (date, num) => {
  return dateFnsAddMonths(date, num);
};
export const parse = (date, dateFormatDate) => {
  return dateFnsParse(date, dateFormatDate, new Date());
};
