<template>
  <div id="app">
    <CalenderHeader
      :current-date="currentDate"
      @changeMonth="changeMonth"
      @onChange="changeCurrentMonth"
      @register="handleRegisterSchedule"
    />
    <section>
      <ol class="calender">
        <li v-for="(date, index) in generateDate()" :key="index">
          <CalenderRow
            :date="date"
            :scheduleList="filterScheduleListByDate(date)"
          />
        </li>
      </ol>
    </section>
  </div>
</template>

<script>
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  addMonths,
  parse,
} from "./libs/date-util";

import CalenderHeader from "./components/molecules/CalenderHeader/";
import CalenderRow from "./components/molecules/CalenderRow/";
export default {
  name: "App",
  components: {
    CalenderHeader,
    CalenderRow,
  },
  data() {
    return {
      currentDate: new Date(),
      scheduleList: [],
    };
  },
  mounted() {
    this.getDateQueryParam();
    this.dateFromUrl();
  },
  methods: {
    generateDate() {
      const start = startOfMonth(this.currentDate);
      const end = endOfMonth(this.currentDate);
      return eachDayOfInterval({ start, end });
    },
    changeMonth(num) {
      const changeMonth = addMonths(this.currentDate, num);
      history.replaceState("", "", "?date=" + format(changeMonth, "yyyy-MM"));
      this.getDateQueryParam();
    },
    getDateQueryParam() {
      const url = location.href;
      const match = url.match(/date=([0-9]{4})-(0[1-9]|1[0-2]|[1-9])/);
      if (match === null) {
        this.currentDate = new Date();
        return;
      }
      match[2] = match[2].padStart(2, "0");
      this.currentDate = parse(`${match[1]}-${match[2]}`, "yyyy-MM");
      this.generateDate();
    },
    changeCurrentMonth() {
      history.replaceState("", "", "?date=" + format(new Date(), "yyyy-MM"));
      this.getDateQueryParam();
    },
    handleRegisterSchedule(scheduleData) {
      this.scheduleList = [...this.scheduleList, scheduleData];
    },
    filterScheduleListByDate(date) {
      const formatDate = format(date, "yyyy-MM-dd");
      const scheduleList = this.scheduleList.filter((v) => {
        return formatDate == v.date;
      });
      return scheduleList;
    },
    dateFromUrl() {
      const url = "https://hoge.com/2024/1/";
      const match = url.match(/\/([0-9]{4})\/(0?[1-9]|1[0-2])\//);
      if (!match) return;
      match[2] = match[2].padStart(2, "0");
      const formatDate = `${match[1]}-${match[2]}`;
      console.log(formatDate);
    },
  },
};
</script>
