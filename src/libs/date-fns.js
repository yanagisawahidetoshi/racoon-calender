import { startOfMonth, eachDayOfInterval, lastDayOfMonth, format, addMonths } from 'date-fns';
import ja from 'date-fns/locale/ja'

export const getStartOfMonth = (today) => {
  return startOfMonth(today);
}
export const getLastOfMonth = (today) => {
  return lastDayOfMonth(today);
}
export const getEachDayOfMonth = (startDate, lastDate) => {
  return eachDayOfInterval({
    start: startDate,
    end: lastDate
  });
}
export const moveMonth = (date, num) => {
  return addMonths(date, num);
}
export const moveToCurrentMonth = () => {
  return new Date();
}
export const formatDateAndDay = (date) => {
  return format(date, 'MM/dd EEEE', {locale: ja});
}