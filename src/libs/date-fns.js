import {
  lastDayOfMonth,
  startOfMonth,
  addMonths,
  subMonths,
  format,
  eachDayOfInterval,
} from "date-fns";

import { ja } from "date-fns/locale";

export const getLastDayOfMonth = (currentDate) => {
  return lastDayOfMonth(currentDate);
};

export const getStartOfMonth = (currentDate) => {
  return startOfMonth(currentDate);
};

export const getAddMonths = (currentDate, addNumber) => {
  return addMonths(currentDate, addNumber);
};

export const getSubMonths = (currentDate, addNumber) => {
  return subMonths(currentDate, addNumber);
};

export const getFormatJa = (date, pattern) => {
  return format(date, pattern, { locale: ja });
};

export const getEachDayOfInterval = (start, end) => {
  return eachDayOfInterval({ start, end });
};
