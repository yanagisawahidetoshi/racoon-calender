<template>
  <div id="app">
    <CalenderHeader
      :currentDate="currentDate"
      @changeMonth="changeMonth"
      @changeToCurrentMonth="changeToCurrentMonth"
      :inputDate="inputDate"
      :inputText="inputText"
      :inputTime="inputTime"
    />
    <ol>
      <li v-for="(date, index) in dates" :key="index">
        <DateRow :date="date" />
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
import DateRow from "./components/atoms/DateRow";
import CalenderHeader from "./components/organisms/CalenderHeader";
export default {
  name: "App",
  components: {
    DateRow,
    CalenderHeader,
  },
  data() {
    return {
      currentDate: new Date(),
      inputDate: "2024-10-28",
      inputText: "aaa",
      inputTime: "10:12",
    };
  },
  mounted() {
    const currentURL = window.location.href;
    const match = currentURL.match(
      /^https?:\/\/.*\/([0-9]{4})\/(0[1-9]|1[0-2])\/?.*$/
    );
    if (match) {
      const yearFromURL = match[1];
      const monthFromURL = match[2].padStart(2, 0);
      this.currentDate = new Date(yearFromURL + "-" + monthFromURL + "-01");
    }
  },
  computed: {
    dates() {
      const start = startOfMonth(this.currentDate);
      const end = lastDayOfMonth(this.currentDate);
      return eachDayOfInterval({ start, end });
    },
  },
  methods: {
    format(date, pattern) {
      return format(date, pattern);
    },
    changeMonth(num) {
      this.currentDate = addMonths(this.currentDate, num);
      window.history.pushState(
        {},
        "",
        this.format(this.currentDate, "/yyyy/MM/")
      );
    },
    changeToCurrentMonth() {
      this.currentDate = new Date();
    },
  },
};
</script>
