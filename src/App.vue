<template>
  <div id="app">
    <ul>
      <li><button @click="changeMonth(-1)">prev</button></li>
      <li><button @click="changeToCurrentMonth()">current</button></li>
      <li><button @click="changeMonth(1)">next</button></li>
    </ul>
    <ol>
      <li v-for="(date, index) in dates" :key="index">
        <p>{{ date }}</p>
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
} from "./libs/date-fns";

export default {
  name: "App",
  components: {},
  data() {
    return{
      today: new Date(),
    }
  },
  computed: {
    dates(){
      const startDate = getStartOfMonth(this.today);
      const lastDate = getLastOfMonth(this.today);
      return getEachDayOfMonth(startDate, lastDate);
    }
  },
  methods: {
    changeToCurrentMonth() {
      this.today = moveToCurrentMonth();
    },
    changeMonth(num) {
      this.today = moveMonth(this.today, num);
    },
  }
};
</script>
