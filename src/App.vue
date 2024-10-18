<template>
  <div id="app">
    <button type="submit" @click="goPrev">前月</button>
    <button type="submit" @click="goThisMonth">当月</button>
    <button type="submit" @click="goNext">翌月</button>
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
  subMonths,
  addMonths,
} from "date-fns";
export default {
  name: "App",
  components: {},
  data() {
    return {
      currentDay: new Date(),
      dates: [],
    };
  },
  mounted() {
    this.makeDatesArrey();
  },
  computed: {
    formattedDates() {
      return this.dates.map((date) => {
        return format(date, "dd eeee");
      });
    },
  },
  methods: {
    makeDatesArrey() {
      const start = startOfMonth(this.currentDay);
      const end = lastDayOfMonth(this.currentDay);
      this.dates = eachDayOfInterval({ start, end });
    },
    goPrev() {
      this.currentDay = subMonths(this.currentDay, 1);
      this.makeDatesArrey();
    },
    goNext() {
      this.currentDay = addMonths(this.currentDay, 1);
      this.makeDatesArrey();
    },
    goThisMonth() {
      this.currentDay = new Date();
      this.makeDatesArrey();
    },
  },
};
</script>
