<template>
  <div id="app">
    <CalenderHeader
      :changeDate="changeDate"
      :changeCurrentMonth="changeCurrentMonth"
      :active="active"
      @sendParent="receivedSchedules"
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
      active: new Date(),
      schedules: [],
    };
  },
  computed: {
    instanceMonth() {
      const dates = eachDayOfInterval({
        start: startOfMonth(this.active),
        end: endOfMonth(this.active),
      });
      return dates;
    },
  },
  methods: {
    formatDate(date, f) {
      return format(date, f);
    },
    changeCurrentMonth() {
      this.active = new Date();
    },
    changeDate(num) {
      this.active = addMonths(this.active, num);
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
      this.active = parse(`${year}-${month}`, "yyyy-MM", new Date());
    }
  },
  watch: {
    active: function (newActive) {
      const url = new URL(window.location.href);
      url.searchParams.set("year", format(newActive, "yyyy"));
      url.searchParams.set("month", format(newActive, "MM"));
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
