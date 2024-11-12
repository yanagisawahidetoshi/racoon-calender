<template>
  <div id="app">
    <ul>
      <li><button @click="changeMonth(-1)">prev</button></li>
      <li><button @click="changeToCurrentMonth()">current</button></li>
      <li><button @click="changeMonth(1)">next</button></li>
    </ul>
    <ol>
      <li v-for="(date, index) in dates" :key="index">
        <p>{{ formatDate(date, 'MM/dd EEEE') }}</p>
      </li>
    </ol>
  </div>
</template>

<script>
import {
  startOfMonth,
  lastDayOfMonth,
  getEachDayOfMonth,
  addMonth,
  moveCurrentMonth,
  formatDateAndDay,
} from "./libs/date-fns";

export default {
  name: "App",
  components: {},
  data() {
    return{
      baseDate: new Date(),
    }
  },
  computed: {
    dates(){
      const startDate = startOfMonth(this.baseDate);
      const lastDate = lastDayOfMonth(this.baseDate);
      return getEachDayOfMonth(startDate, lastDate);
    }
  },
  methods: {
    formatDate(date, formatSetting){
      return formatDateAndDay(date, formatSetting);
    },
    changeToCurrentMonth() {
      this.baseDate = moveCurrentMonth();
    },
    changeMonth(num) {
      this.baseDate = addMonth(this.baseDate, num);
    },
  }
};
</script>
