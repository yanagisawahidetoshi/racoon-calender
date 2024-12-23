<template>
  <div id="app">
    <CalenderHeader
      @changeToPrevMonth="changeMonth(-1)"
      @changeToNextMonth="changeMonth(1)"
      @changeCurrentMonth="changeCurrentMonth"
      :currentDate="currentDate"
      @onSubmit="resgistSchedule"
    />
    <ol>
      <li v-for="(date, index) in dates" :key="index">
        <DateRow :date="date" :schedules="getSchedule(date)" />
      </li>
    </ol>
    {{ schedules }}
  </div>
</template>

<script>
import {
  getStartOfMonth,
  getLastDayOfMonth,
  getEachDayOfInterval,
  format,
  addMonths,
  parse,
} from "./libs/date-fns";
import { getYearAndMonth } from "./libs/get-year-and-month.js";

import CalenderHeader from "./components/CalenderHeader";
import DateRow from "./components/DateRow";

export default {
  name: "App",
  components: {
    CalenderHeader,
    DateRow,
  },
  data() {
    return {
      currentDate: null,
      schedules: [
        {
          id: 1,
          date: "2024-12-23",
          startTime: "14:22",
          endTime: "15:22",
          content: "aaaaaa",
        },
        {
          id: 2,
          date: "2024-12-23",
          startTime: "10:22",
          endTime: "15:22",
          content: "bbbbb",
        },
      ],
    };
  },
  computed: {
    dates() {
      const start = getStartOfMonth(this.currentDate);
      const end = getLastDayOfMonth(this.currentDate);
      return getEachDayOfInterval({ start, end });
    },
  },
  mounted() {
    // ~/{西暦４桁}/{月1or2桁} を判断する正規表現。どんなURLにも対応できるように
    const pathName = location.pathname;
    this.currentDate = getYearAndMonth(pathName, parse);
  },
  methods: {
    getSchedule(date) {
      const formatDate = format(date, "yyyy-MM-dd");
      const schedules = this.schedules.filter(
        (item) => item.date === formatDate
      );
      return schedules;
    },
    formatDate(date) {
      return format(date, "MM月dd日");
    },
    changeMonth(num) {
      this.currentDate = addMonths(this.currentDate, num);
      history.pushState({}, "", "/2024/11");
    },
    changeCurrentMonth() {
      this.currentDate = new Date();
    },
    resgistSchedule(newSchedule) {
      const id = this.schedules?.at(-1)?.id ?? 0;
      this.schedules.push({ ...newSchedule, id: id + 1 });
    },
  },
};
</script>
