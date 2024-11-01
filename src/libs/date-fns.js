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
  }).map(date => format(date, 'd EEEEE', {locale: ja}))
}
export const moveMonth = (date, num) => {
  return addMonths(date, num);
}
export const moveToCurrentMonth = () => {
  return new Date();
}