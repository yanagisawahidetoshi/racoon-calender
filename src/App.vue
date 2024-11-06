<template>
  <div id="app">
    <ul>
      <li><button @click="changeMonth(-1)">prev</button></li>
      <li><button @click="changeToCurrentMonth()">current</button></li>
      <li><button @click="changeMonth(1)">next</button></li>
    </ul>
    <ol>
      <li v-for="(date, index) in dates" :key="index">
        <p>{{ formatDate(date) }}</p>
      </li>
    </ol>
  </div>
</template>

<script>
import {
  getStartOfMonth,
  getLastOfMonth,
  getEachDayOfMonth,
  moveMonth,
  moveToCurrentMonth,
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
      const startDate = getStartOfMonth(this.baseDate);
      const lastDate = getLastOfMonth(this.baseDate);
      return getEachDayOfMonth(startDate, lastDate);
    }
  },
  methods: {
    formatDate(date){
      return formatDateAndDay(date);
    },
    changeToCurrentMonth() {
      this.baseDate = moveToCurrentMonth();
    },
    changeMonth(num) {
      this.baseDate = moveMonth(this.baseDate, num);
    },
  }
};
</script>
