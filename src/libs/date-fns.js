import { startOfMonth as dateFnsStartOfMonth, eachDayOfInterval, lastDayOfMonth as dateFnsLastOfMonth, format, addMonths } from 'date-fns';
import ja from 'date-fns/locale/ja'

export const startOfMonth = (baseDate) => {
  return dateFnsStartOfMonth(baseDate);
}
export const lastDayOfMonth = (baseDate) => {
  return dateFnsLastOfMonth(baseDate);
}
export const getEachDayOfMonth = (startDate, lastDate) => {
  return eachDayOfInterval({
    start: startDate,
    end: lastDate
  });
}
export const addMonth = (date, num) => {
  return addMonths(date, num);
}
export const moveCurrentMonth = () => {
  return new Date();
}
export const formatDateAndDay = (date, formatSetting) => {
  return format(date, formatSetting, {locale: ja});
}