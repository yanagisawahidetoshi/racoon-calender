import {
	startOfMonth as dateFnsStartOfMonth,
	endOfMonth as dateFnsEndOfMonth,
	eachDayOfInterval as dateFnsGetEachDayOfInterval,
	format as dateFnsFormat,
	getDay as dateFnsGetDay,
	addMonths as dateFnsAddMonths,
} from "date-fns";
// import * as dateFns from "date-fns";
/*-----*/


export const dateInterval = (currentDate, daysOfWeek) => {
	return dateFnsGetEachDayOfInterval({
		start: new Date(dateFnsStartOfMonth(currentDate)),
		end: new Date(dateFnsEndOfMonth(currentDate)),
	}).map((days) => ({
		date: dateFnsFormat(days, "dd日"),
		day: daysOfWeek[dateFnsGetDay(days)]
	}))
}
export const addMonths = (currentDate, e) => {
	return dateFnsAddMonths(currentDate, e);
}
export const format = (currentDate, dateFormat) => {
	return dateFnsFormat(currentDate, dateFormat);
}

