<template>
  <div id="app">
    <CalendarHeader
      :baseDate="baseDate"
      @changeMonth="changeMonth"
      @changeToCurrentMonth="changeToCurrentMonth"
      @onSubmit="registSchedule" />
    <ol>
      <li v-for="(date, index) in dates" :key="index">
        <CalendarEachRow 
        :date="date"/>
      </li>
    </ol>
    <p>{{ schedules }}</p>
  </div>
</template>

<script>
import {
  startOfMonth,
  lastOfMonth,
  getEachDateOfMonth,
  addMonths,
  getNewDate,
  format,
  parse,
} from "./libs/date-fns";
import CalendarHeader from "./components/molecules/CalendarHeader/CalendarHeader.vue";
import CalendarEachRow from "./components/atoms/CalendarEachRow/CalendarEachRow.vue";

export default {
  name: "App",
  components: { CalendarHeader, CalendarEachRow },
  data() {
    return{
      baseDate: null,
      schedules: [],
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
    const matchPath = currentPath.match(/(\d{4})\/(0?[1-9]|1[0-2])$/);
    if (matchPath === null) {
      this.baseDate = new Date();
      return this.baseDate;
    }
    this.baseDate = parse(matchPath[1] + "/" + matchPath[2], "yyyy/MM");
  },
  methods: {
    formatDate(date, setting){
      return format(date, setting);
    },
    changeToCurrentMonth() {
      this.baseDate = getNewDate();
      window.location.pathname = format(this.baseDate, "yyyy/MM");
    },
    changeMonth(num) {
      this.baseDate = addMonths(this.baseDate, num);
      window.location.pathname = format(this.baseDate, "yyyy/MM");
    },
    registSchedule(newSchedule) {
      const id = this.schedules?.at(-1)?.id ?? 0;
      // newSchedule.id = id + 1;
      this.schedules.push({...newSchedule, id:id + 1})
    }
  },
};
</script>
