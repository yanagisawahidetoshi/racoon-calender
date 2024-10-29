<template>
  <div id="app">
    <button type="submit" @click="changeMonth(-1)">前月</button>
    <button type="submit" @click="goThisMonth">当月</button>
    <button type="submit" @click="changeMonth(1)">翌月</button>
    <ol>
      <li v-for="(date, index) in dates" :key="index">
        <p>{{ format(date, "MM/dd EE") }}</p>
      </li>
    </ol>
  </div>
</template>

<script>
import {
  startOfMonth,
  lastDayOfMonth,
  eachDayOfInterval,
  format,
  addMonths,
} from "./libs/date-util.js";
export default {
  name: "App",
  components: {},
  data() {
    return {
      currentDay: new Date(),
    };
  },
  computed: {
    dates() {
      const start = startOfMonth(this.currentDay);
      const end = lastDayOfMonth(this.currentDay);
      return eachDayOfInterval({ start, end });
    },
  },
  methods: {
    format(date, pattern) {
      return format(date, pattern);
    },
    changeMonth(num) {
      this.currentDay = addMonths(this.currentDay, num);
    },
    goThisMonth() {
      this.currentDay = new Date();
    },
  },
};
</script>
