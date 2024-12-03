import {
  startOfMonth as dateFnsStartOfMonth,
  eachDayOfInterval as dateFnsEachDayOfInterval,
  lastDayOfMonth as dateFnsLastOfMonth,
  parse as dateFnsParse,
  format,
  addMonths as dateFnsAddMonth
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
export const addMonths = (date, num) => {
  return dateFnsAddMonth(date, num);
}
export const setNewDate = () => {
  return new Date();
}
export const formatDate = (date, formatSetting) => {
  return format(date, formatSetting, {locale: ja});
}
export const parse = (dateString, formatSetting) => {
  return dateFnsParse(dateString, formatSetting, new Date());
}