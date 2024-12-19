<template>
  <div id="app">
    <CalenderHeader
      :changeDate="changeDate"
      :changeCurrentMonth="changeCurrentMonth"
      :currentDate="currentDate"
      @onSchedule="addSchedule"
    />
    <DateList
      :currentMonth="currentMonth"
      :schedules="schedules"
      @onSchedule="updateSchedule"
    />
  </div>
</template>

<script>
import {
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  format,
  addMonths,
  parse,
} from "./libs/date-util";
import CalenderHeader from "./components/molecules/Calender/Header.vue";
import DateList from "./components/molecules/Calender/DateList.vue";

export default {
  name: "App",
  components: { CalenderHeader, DateList },
  data() {
    return {
      currentDate: new Date(),
      schedules: [], //初期値は空。dateValue,startTimeValue,endTimeValue,id
      isModalEditScheduleOpen: false,
    };
  },
  computed: {
    currentMonth() {
      const dates = eachDayOfInterval({
        start: startOfMonth(this.currentDate),
        end: endOfMonth(this.currentDate),
      });
      return dates;
    },
  },
  watch: {
    currentDate: function (newcurrentDate) {
      const url = new URL(window.location.href);
      url.searchParams.set("year", format(newcurrentDate, "yyyy"));
      url.searchParams.set("month", format(newcurrentDate, "MM"));
      window.history.pushState({}, "", url);
    },
  },
  mounted() {
    const params = new URLSearchParams(window.location.search);
    const year = params.get("year");
    const month = params.get("month");
    if (year && month) {
      this.currentDate = parse(`${year}-${month}`, "yyyy-MM", new Date());
    }
    // //URLが/年/月/の場合に正規表現を使って年月を取得する
    // const url = location.href;
    // const date = url.match(
    //   /^https?:\/\/[^/]+\/([0-9]{4})\/(0[1-9]|1[0-2]|[1-9])\/?$/
    // ); //[^/]+スラッシュまで繰り返す・()で配列に格納
    // if (date) {
    //   this.currentDate = parse(`${date[1]}-${date[2]}`, "yyyy-MM", new Date());
    // }
  },
  methods: {
    formatDate(date, f) {
      return format(date, f);
    },
    changeCurrentMonth() {
      this.currentDate = new Date();
    },
    changeDate(num) {
      this.currentDate = addMonths(this.currentDate, num);
    },
    addSchedule(data) {
      data.id = Date.now(); //その時の日時（ミリ単位）をIDとして登録
      const schedules = this.schedules.push(data);
      this.schedules = this.sortSchedules(schedules);
    },
    updateSchedule(newSchedule) {
      const schedules = this.schedules.map((v) => {
        if (v.id === newSchedule.id) {
          return { ...v, ...newSchedule };
        }
        return v;
      });
      this.schedules = this.sortSchedules(schedules);
    },
    sortSchedules(schedules) {
      return schedules.sort((a, b) =>
        a.startTimeValue.localeCompare(b.startTimeValue)
      );
    },
  },
};
</script>

<style scoped>
#app {
  margin: 30px;
}
</style>
