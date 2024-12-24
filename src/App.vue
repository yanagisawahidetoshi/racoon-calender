<template>
  <div id="app">
    <CalenderHeader
      @changeToPrevMonth="changeMonth(-1)"
      @changeToNextMonth="changeMonth(1)"
      @changeCurrentMonth="changeCurrentMonth"
      :currentDate="currentDate"
      @onRegisterSchedule="handleRegisterSchedule"
    />
    <CalenterBody :dates="dates" :schedules="schedules" />
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
  isSameDay,
} from "./libs/date-fns";
import { getYearAndMonth } from "./libs/get-year-and-month.js";

import CalenderHeader from "./components/CalenderHeader";
import CalenterBody from "./components/CalenterBody";

export default {
  name: "App",
  components: {
    CalenderHeader,
    CalenterBody,
  },
  data() {
    return {
      currentDate: null,
      schedules: [
        {
          content: "aaaa",
          date: "2024-12-19",
          finishTime: "14:08",
          id: 1,
          startTime: "14:07",
        },
        {
          content: "BBBBB",
          date: "2024-12-19",
          finishTime: "11:08",
          id: 2,
          startTime: "10:07",
        },
        {
          content: "CCCC",
          date: "2024-12-20",
          finishTime: "11:08",
          id: 3,
          startTime: "10:07",
        },
        {
          content: "DDDD",
          date: "2024-12-20",
          finishTime: "14:08",
          id: 4,
          startTime: "12:07",
        },
      ],
    };
  },
  computed: {
    dates() {
      const start = getStartOfMonth(this.currentDate);
      const end = getLastDayOfMonth(this.currentDate);
      console.log(getEachDayOfInterval({ start, end }));
      return getEachDayOfInterval({ start, end });
    },
  },
  mounted() {
    // ~/{西暦４桁}/{月1or2桁} を判断する正規表現。どんなURLにも対応できるように
    const pathName = location.pathname;
    this.currentDate = getYearAndMonth(pathName, parse);
  },
  methods: {
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
    handleRegisterSchedule(newSchedule) {
      const id = this.schedules.length > 0 ? this.schedules.at(-1).id + 1 : 1;
      this.schedules = [...this.schedules, { ...newSchedule, id }].sort(
        (a, b) => a.startTime.localeCompare(b.startTime)
      );
      console.log(this.schedules);
      // localecompareは文字列以外でも比較してくれる
      // dateFnsをつかったほうがより厳密にできる
      // 関数を切り出してテストを書けば、いちいち画面上で操作してテストしなくて済む
    },
    filterSchedule(date) {
      return this.schedules.filter((v) => {
        return isSameDay(date, v.date);
      });
    },
  },
};
</script>
