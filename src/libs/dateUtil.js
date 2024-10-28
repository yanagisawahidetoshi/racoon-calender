import {
  lastDayOfMonth as dateFnsLastDayOfMonth,
  startOfMonth as dateFnsStartOfMonth,
  addMonths as dateFnsAddMonths,
  subMonths as dateFnsSubMonths,
  format as dateFnsFormat,
  eachDayOfInterval as dateFnsEachDayOfInterval,
  getMonth as dateFnsGetMonth,
} from "date-fns";

import { ja } from "date-fns/locale";

export const lastDayOfMonth = (currentDate) => {
  return dateFnsLastDayOfMonth(currentDate);
};

export const startOfMonth = (currentDate) => {
  return dateFnsStartOfMonth(currentDate);
};

export const addMonths = (currentDate, addNumber) => {
  return dateFnsAddMonths(currentDate, addNumber);
};

export const subMonths = (currentDate, addNumber) => {
  return dateFnsSubMonths(currentDate, addNumber);
};

export const format = (date, pattern) => {
  return dateFnsFormat(date, pattern, { locale: ja });
};

export const eachDayOfInterval = (start, end) => {
  return dateFnsEachDayOfInterval({ start, end });
};
export const getMonth = (date) => {
  return dateFnsGetMonth(date);
};
