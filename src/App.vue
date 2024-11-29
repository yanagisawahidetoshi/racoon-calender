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
  lastOfMonth,
  getEachDateOfMonth,
  changeMonth,
  changeToCurrentMonth,
  formatDate,
  parse,
} from "./libs/date-fns";

export default {
  name: "App",
  components: {},
  data() {
    return{
      baseDate: null,
    }
  },
  computed: {
    dates(){
      const startDate = startOfMonth(this.baseDate);
      const lastDate = lastOfMonth(this.baseDate);
      return getEachDateOfMonth(startDate, lastDate);
    }
  },
  mounted(){
    const currentPath = window.location.pathname;
    const matchPath = currentPath.match(/\d{4}\/(0?[1-9]|1[0-2])$/);
    if (matchPath === null) {
      this.baseDate = new Date();
      return this.baseDate;
    }
    this.baseDate = parse(matchPath[0], "yyyy/MM");
  },
  methods: {
    formatDate(date, setting){
      return formatDate(date, setting);
    },
    changeToCurrentMonth() {
      this.baseDate = changeToCurrentMonth();
    },
    changeMonth(num) {
      this.baseDate = changeMonth(this.baseDate, num);
    },
  },
};
</script>
