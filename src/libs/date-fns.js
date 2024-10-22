import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  addMonths,
  subMonths,
} from "date-fns";
import ja from "date-fns/locale/ja";

export const getStartOfMonth = (date) => {
  return startOfMonth(date);
};
export const getEndOfMonth = (date) => {
  return endOfMonth(date);
};
export const getEachDayOfInterval = ({ start, end }) => {
  return eachDayOfInterval({ start, end });
};
export const getFormat = (date) => {
  return format(date, "yyyy年M月d日（E）", { locale: ja });
};
export const getAddMonths = (date, num) => {
  return addMonths(date, num);
};
export const getSubMonths = (date, num) => {
  return subMonths(date, num);
};
