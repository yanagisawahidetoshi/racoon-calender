<template>
  <div id="app">
    <ul>
      <li><button @click="movePreviousMonth">prev</button></li>
      <li><button @click="moveCurrentMonth">current</button></li>
      <li><button @click="moveNextMonth">next</button></li>
    </ul>
    <ol>
      <li v-for="(date, index) in dates" :key="index">
        <p>{{ date }}</p>
      </li>
    </ol>
  </div>
</template>

<script>
import { startOfMonth, eachDayOfInterval, lastDayOfMonth, format, addMonths } from 'date-fns';

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
      return eachDayOfInterval({
        start: startDate,
        end: lastDate
      })
    }
  },
  methods: {
    formatDate(date) {
      return format(date, 'MM/dd EEEE');
    },
    movePreviousMonth() {
      return this.baseDate = addMonths(this.baseDate, -1);
    },
    moveCurrentMonth() {
      return this.baseDate = new Date();
    },
    moveNextMonth() {
      return this.baseDate = addMonths(this.baseDate, 1);
    },
  }
};
</script>
