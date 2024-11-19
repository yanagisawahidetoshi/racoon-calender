<template>
  <div id="app">
    <CalenderHeader
      :changeDate="changeDate"
      :changeCurrentMonth="changeCurrentMonth"
      :currentDate="currentDate"
      @sendSchedule="receivedSchedules"
    />
    <section class="block">
      <ol class="list">
        <li class="detail" v-for="(day, index) in instanceMonth" :key="index">
          <CalenderDate :day="day" :schedules="schedules" />
        </li>
      </ol>
    </section>
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
import CalenderDate from "./components/molecules/Calender/Date.vue";

export default {
  name: "App",
  components: { CalenderHeader, CalenderDate },
  data() {
    return {
      currentDate: new Date(),
      schedules: [],
    };
  },
  computed: {
    instanceMonth() {
      const dates = eachDayOfInterval({
        start: startOfMonth(this.currentDate),
        end: endOfMonth(this.currentDate),
      });
      return dates;
    },
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
    receivedSchedules(data) {
      this.schedules.push(data); //data内はdateValue,startTimeValue,endTimeValue
    },
  },
  mounted() {
    const params = new URLSearchParams(window.location.search);
    const year = params.get("year");
    const month = params.get("month");
    if (year && month) {
      this.currentDate = parse(`${year}-${month}`, "yyyy-MM", new Date());
    }
    //URLがhttps://hoge.com/2024/01/の場合に正規表現を使って年月を取得する
    const url = location.href;
    const date = url.match(
      /^http:\/\/[^/]+\/([0-9]{4})\/(0[1-9]|1[0-2]|[1-9])\/$/
    ); //[^/]+スラッシュまで繰り返す・()で配列に格納
    console.log(date[1] + "年" + date[2] + "月");
  },
  watch: {
    currentDate: function (newcurrentDate) {
      const url = new URL(window.location.href);
      url.searchParams.set("year", format(newcurrentDate, "yyyy"));
      url.searchParams.set("month", format(newcurrentDate, "MM"));
      window.history.pushState({}, "", url);
    },
  },
};
</script>

<style scoped>
#app {
  margin: 30px;
}
.block {
  margin: 30px 0;
}
.list .detail {
  margin-bottom: 8px;
}
</style>
