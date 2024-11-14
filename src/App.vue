<template>
  <div id="app">
    <CalenderHeader
      :active-date="activeDate"
      @changeMonth="changeMonth"
      @onChange="changeCurrentMonth"
      @register="handleRegister"
    />
    <section>
      <ol class="calender">
        <li v-for="(date, index) in generateDate()" :key="index">
          <CalenderRow :date="date" :scheduleList="updateScheduleList(date)" />
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
      scheduleList: [],
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
    changeCurrentMonth() {
      history.replaceState("", "", "?date=" + format(new Date(), "yyyy-MM"));
      this.getDateQueryParam();
    },
    handleRegister(scheduleData) {
      this.scheduleList = [...this.scheduleList, scheduleData];
    },
    updateScheduleList(date) {
      const formatDate = format(date, "yyyy-MM-dd");
      const scheduleList = this.scheduleList.filter((v) => {
        return formatDate == v.date;
      });
      return scheduleList;
    },
  },
};
</script>
