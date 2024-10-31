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
      today: new Date(),
    }
  },
  computed: {
    dates(){
      const startDate = startOfMonth(this.today);
      const lastDate = lastDayOfMonth(this.today);
      return eachDayOfInterval({
        start: startDate,
        end: lastDate
      }).map(date => format(date, 'MM/dd EEEE'))
    }
  },
  methods: {
    movePreviousMonth() {
      return this.today = addMonths(this.today, -1);
    },
    moveCurrentMonth() {
      return this.today = new Date();
    },
    moveNextMonth() {
      return this.today = addMonths(this.today, 1);
    },
  }
};
</script>
