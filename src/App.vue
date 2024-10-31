<template>
  <div id="app">
    <ol>
      <li v-for="(date, index) in dates" :key="index">
        <p>{{ date }}</p>
      </li>
    </ol>
  </div>
</template>

<script>
import { startOfMonth, eachDayOfInterval, lastDayOfMonth, format } from 'date-fns';

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
      }).map(date => format(date, 'dd EEEE'))
    }
  }
};
</script>
