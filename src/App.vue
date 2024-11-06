<template>
  <div id="app">
    <CalenderHeader
      :active-date="activeDate"
      @changeMonth="changeMonth"
      @currentMonth="currentMonth"
    />
    <section>
      <ol class="calender">
        <li v-for="(date, index) in generateDate()" :key="index">
          <CalenderRow :date="date" />
        </li>
      </ol>
    </section>
  </div>
</template>

<script>
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  addMonths,
  parse,
} from "./libs/date-util";

import CalenderHeader from "./components/molecules/CalenderHeader/";
import CalenderRow from "./components/molecules/CalenderRow/";
export default {
  name: "App",
  components: {
    CalenderHeader,
    CalenderRow,
  },
  data() {
    return {
      activeDate: new Date(),
    };
  },
  mounted() {
    this.getDateQueryParam();
  },
  methods: {
    generateDate() {
      const start = startOfMonth(this.activeDate);
      const end = endOfMonth(this.activeDate);
      return eachDayOfInterval({ start, end });
    },
    changeMonth(num) {
      const changeMonth = addMonths(this.activeDate, num);
      history.replaceState("", "", "?date=" + format(changeMonth, "yyyy-MM"));
      this.getDateQueryParam();
    },
    getDateQueryParam() {
      const urlParams = new URLSearchParams(location.search);
      const dateParam = urlParams.get("date");
      if (dateParam) {
        this.activeDate = parse(dateParam, "yyyy-MM", new Date());
      } else {
        this.activeDate = new Date();
      }
      this.generateDate();
    },
    currentMonth() {
      history.replaceState("", "", "?date=" + format(new Date(), "yyyy-MM"));
      this.getDateQueryParam();
    },
  },
};
</script>
