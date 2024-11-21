<template>
  <div id="app">
    <CalenderHeader
      @changeMonth="changeMonth"
      :date="currentDate"
      @registeredSchedule="registeredSchedules"
    />
    <ol class="calendar-list">
      <li v-for="(date, index) in calendar" :key="index" class="calendar-item">
        <CalenderRow :date="date" :schedules="filterScheduleByDate(date)" />
      </li>
    </ol>
  </div>
</template>

<script>
import {
  lastDayOfMonth,
  startOfMonth,
  addMonths,
  format,
  eachDayOfInterval,
  parse,
} from "./libs/dateUtil.js";

import CalenderRow from "@/components/atoms/CalenderRow";
import CalenderHeader from "@/components/morcules/CalenderHeader";

export default {
  name: "App",
  data() {
    return {
      currentDate: null,
      schedules: [],
      url: {
        year: null,
        month: null,
      },
    };
  },
  components: {
    CalenderRow,
    CalenderHeader,
  },
  computed: {
    calendar() {
      const start = startOfMonth(this.currentDate);
      const end = lastDayOfMonth(this.currentDate);
      return eachDayOfInterval(start, end);
    },
    getCurrentUrl() {
      return new URL(window.location);
    },
  },
  methods: {
    filterScheduleByDate(date) {
      const target = this.formatDate(date, "yyyy-MM-dd");
      return this.schedules.filter((schedule) => {
        return target === schedule.date;
      });
    },
    formatDate(date, pattern) {
      return format(date, pattern);
    },
    changeMonth(number) {
      this.currentDate = addMonths(this.currentDate, number);
    },
    currentMonth() {
      this.currentDate = new Date();
    },
    getSearchParam(url, param) {
      return url.searchParams.get(param);
    },
    registeredSchedules(newSchedule) {
      this.schedules = [...this.schedules, newSchedule];
    },
  },
  mounted() {
    const params = new URLSearchParams(location.search);
    if (params.size > 0) {
      const year = params.get("year");
      const month = params.get("month");
      this.currentDate = new Date(
        parse(`${year}-${month}`, "yyyy-MM", new Date())
      );
    } else {
      this.currentDate = new Date();
    }

    // 課題
    const url = "localhost:2000/2024/24/";
    const regexp = /\/(19[0-9]{4}|2[0-9]{3})\/([0-9]{1,2})/;
    const result = url.match(regexp);
    if (result !== null) {
      this.url.month = result[2];
      this.url.year = result[1];
    }
    console.log(this.url);
    // const result = url.match(regexp);
    // // console.log(result);
    // this.url.month = result[2] !== null ? result[2] : null;
    // this.url.year = result[1] !== null ? result[1] : null;
    // console.log(this.url);
    // let regexp = /([0-9]{4})(?:\/)([0-9]{2})/;
    // let result = regexp.exec(url);
    // this.url.month = result[2];
    // this.url.year = result[1];
    // console.log(this.url);

    // this.url.year = url.match(/\/[0-9]{4}\//)[0].substring(1, 5);
    // this.url.month = url.match(/\/[0-9]{2}\//)[0].substring(1, 3);
    // const [year, month] = [...url.matchAll(/[0-9]{2,4}/g)];
    // this.url.year = year[0];
    // this.url.month = month[0];
    // const res = url.match(/[0-9]{2,4}/g);
    // this.url.year = res[res.length - 1];
    // this.url.month = res[res.length - 2];
    // const regex1 = /(\/[0-9]{2,4}\/)/g;
    // const res2 = regex1.exec(url);
    // console.log(res2)
  },
  watch: {
    currentDate(newCurrentDate) {
      const url = this.getCurrentUrl;
      url.searchParams.set("year", this.formatDate(newCurrentDate, "yyyy"));
      url.searchParams.set("month", this.formatDate(newCurrentDate, "MM"));
      window.history.pushState({}, "", url);
    },
  },
};
</script>
<style scoped>
button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  padding: 0;
  appearance: none;
}

li {
  list-style-type: none;
}

.calendar-list {
  padding-left: 0;
}
.calendar-item {
  border-bottom: 1px solid #dadce0;
  padding: 16px;
}
</style>
