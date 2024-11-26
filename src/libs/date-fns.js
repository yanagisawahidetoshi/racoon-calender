import {
  startOfMonth as dateFnsStartOfMonth,
  eachDayOfInterval as dateFnsEachDayOfInterval,
  lastDayOfMonth as dateFnsLastOfMonth,
  parse as dateFnsParse,
  format,
  addMonths
}from 'date-fns';
import ja from 'date-fns/locale/ja'

export const startOfMonth = (baseDate) => {
  return dateFnsStartOfMonth(baseDate);
}
export const lastOfMonth = (baseDate) => {
  return dateFnsLastOfMonth(baseDate);
}
export const getEachDateOfMonth = (startDate, lastDate) => {
  return dateFnsEachDayOfInterval({
    start: startDate,
    end: lastDate
  });
}
export const changeMonth = (date, num) => {
  return addMonths(date, num);
}
export const changeToCurrentMonth = () => {
  return new Date();
}
export const formatDate = (date, setting) => {
  return format(date, setting, {locale: ja});
}
export const parse = (string, dateFormat) => {
  return dateFnsParse(string, dateFormat, new Date());
}