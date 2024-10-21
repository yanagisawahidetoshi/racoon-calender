import { startOfMonth, endOfMonth, eachDayOfInterval, format, getDay, addMonths, } from "date-fns";
/*-----*/
export const getEachDayOfInterval = (currentDate, daysOfWeek) => {
	return eachDayOfInterval({
		start: new Date(startOfMonth(currentDate)),
		end: new Date(endOfMonth(currentDate)),
	}).map((days) => ({
		date: format(days, "dd日"),
		day: daysOfWeek[getDay(days)]
	}))
}
export const getAddMonths = (currentDate, e) => {
	return addMonths(currentDate, e);
}
export const getFormat = (currentDate, dateFormat) => {
	return format(currentDate, dateFormat);
}