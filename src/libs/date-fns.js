import { startOfMonth, eachDayOfInterval, lastDayOfMonth, format, addMonths } from 'date-fns';
import ja from 'date-fns/locale/ja'

export const getStartOfMonth = (today) => {
  return startOfMonth(today);
}
export const getLastOfMonth = (today) => {
  return lastDayOfMonth(today);
}
export const getEachDateAndDay = (startDate, lastDate, setting01, setting02) => {
  return eachDayOfInterval({
    start: startDate,
    end: lastDate
  }).map(date => ({num: format(date, setting01, {locale: ja}), day: format(date, setting02, {locale: ja})}))
}
export const moveMonth = (date, num) => {
  return addMonths(date, num);
}
export const moveToCurrentMonth = () => {
  return new Date();
}
export const formatYearAndDate = (date) => {
  return format(date, 'yyyy年M月', {locale: ja});
}