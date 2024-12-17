<template>
  <div id="app">
    <CalenderHeader
      @changeToPrevMonth="changeMonth(-1)"
      @changeToNextMonth="changeMonth(1)"
      @changeCurrentMonth="changeCurrentMonth"
      :currentDate="currentDate"
      @onRegisterSchedule="handleRegisterSchedule"
    />
    <ol>
      <li v-for="(date, index) in dates" :key="index">
        <DateRow :date="date" />
      </li>
    </ol>
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
      schedules: [],
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
      this.schedules = [...this.schedules, { ...newSchedule, id }];
      this.schedules = this.schedules.sort((a, b) =>
        a.startTime.localeCompare(b.startTime)
      );
      console.log(this.schedules);
      // 課題：現状、再描画が2回されているので、1回でおさめる
      // localecompareは文字列以外でも比較してくれる
      // dateFnsをつかったほうがより厳密にできる
      // 関数を切り出してテストを書けば、いちいち画面上で操作してテストしなくて済む
    },
  },
};
</script>
