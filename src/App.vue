<template>
  <div id="app">
    <CalenderHeader
      :changeDate="changeDate"
      :changeCurrentMonth="changeCurrentMonth"
      :currentDate="currentDate"
      @schedule="addSchedule"
    />
    <section class="block">
      <ol class="list">
        <li class="detail" v-for="(date, index) in currentMonth" :key="index">
          <CalenderDate
            :date="date"
            :schedules="filterSchedules(date)"
            @updateSchedule="updateSchedule"
            @toggleEdit="toggleEdit"
          />
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
  isSameDay,
} from "./libs/date-util";
import CalenderHeader from "./components/molecules/Calender/Header.vue";
import CalenderDate from "./components/molecules/Calender/Date.vue";

export default {
  name: "App",
  components: { CalenderHeader, CalenderDate },
  data() {
    return {
      currentDate: new Date(),
      schedules: [], //初期値は空。dateValue,startTimeValue,endTimeValue,id,isEdit
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
      // schedulesの初期値は空のためif文追加
      if (this.schedules.length) {
        // 予定登録のたびにIDを+1
        data.id = this.schedules[this.schedules.length - 1].id + 1;
      }
      this.schedules.push(data);
    },
    filterSchedules(date) {
      const schedules = this.schedules.filter((v) => {
        return isSameDay(date, v.dateValue);
      });
      return schedules;
    },
    updateSchedule(newSchedule) {
      this.schedules = this.schedules.map((v) => {
        if (
          isSameDay(newSchedule.dateValue, v.dateValue) &&
          v.id === newSchedule.id
        ) {
          return { ...v, ...newSchedule };
        }
        return v;
      });
    },
    toggleEdit(schedule) {
      this.schedules = this.schedules.map((v) => {
        // 同じ日付かつ同じIDの予定を取り出す
        if (
          isSameDay(schedule.dateValue, v.dateValue) &&
          v.id === schedule.id
        ) {
          return { ...v, isEdit: !v.isEdit };
        }
        // 他の予定はそのまま返す
        return v;
      });
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
