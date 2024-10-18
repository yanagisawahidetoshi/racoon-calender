<template>
  <div id="app">
    <ol>
      <li v-for="date in formattedDates" :key="date">
        <p>{{ date }}</p>
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
} from "date-fns";
export default {
  name: "App",
  components: {},
  computed: {
    dates() {
      const now = new Date();
      const start = startOfMonth(now);
      const end = lastDayOfMonth(now);
      return eachDayOfInterval({ start, end });
    },
    formattedDates() {
      return this.dates.map((date) => {
        return format(date, "dd eeee");
      });
    },
  },
};
</script>
