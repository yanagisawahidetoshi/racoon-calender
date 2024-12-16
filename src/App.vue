<template>
  <div id="app">
    <CalenderHeader
      :changeDate="changeDate"
      :changeCurrentMonth="changeCurrentMonth"
      :currentDate="currentDate"
      @onSchedule="addSchedule"
    />
    <section class="block">
      <ol class="list">
        <li class="detail" v-for="(date, index) in currentMonth" :key="index">
          <CalenderDate
            :date="date"
            :schedules="filterSchedules(date)"
            @onToggleModalEditSchedule="toggleModalEditSchedule"
          />
        </li>
      </ol>
    </section>
    <ModalSchedule
      @onToggleModalSchedule="toggleModalEditSchedule"
      @onSchedule="updateSchedule"
      :schedule="
        schedules.find((schedule) => schedule.id === editingScheduleId)
      "
      :isModalOpen="isModalEditScheduleOpen"
      :modalName="'modalEditSchedule'"
      :modalTitle="'予定の編集'"
      :modalBtnName="'編集'"
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
  isSameDay,
} from "./libs/date-util";
import CalenderHeader from "./components/molecules/Calender/Header.vue";
import CalenderDate from "./components/molecules/Calender/Date.vue";
import ModalSchedule from "./components/molecules/Calender/ModalSchedule.vue";

export default {
  name: "App",
  components: { CalenderHeader, CalenderDate, ModalSchedule },
  data() {
    return {
      currentDate: new Date(),
      schedules: [], //初期値は空。dateValue,startTimeValue,endTimeValue,id
      isModalEditScheduleOpen: false,
      editingScheduleId: Number,
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
        if (v.id === newSchedule.id) {
          return { ...v, ...newSchedule };
        }
        return v;
      });
    },
    toggleModalEditSchedule(val, id) {
      this.isModalEditScheduleOpen = val;
      this.editingScheduleId = id;
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
