<template>
  <p class="date">
    {{ formatDate }} 日 <span class="day">({{ day }})</span>
    <span v-for="(n, index) in scheduleDate" :key="index" class="schedule">
      {{ n.schedule }} ({{ n.startTime }} - {{ n.endTime }})
    </span>
  </p>
</template>

<script>
import { format } from "../libs/date-utility";
export default {
  name: "DateItem",
  props: {
    date: {
      type: String,
      required: true,
    },
    day: {
      type: String,
      required: true,
    },
    scheduleDate: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    formatDate() {
      const viewDate = format(this.date, "d");
      return viewDate;
    },
  },
};
</script>
<style>
.date {
  padding: 0 0 0 12px;
}
.day {
  font-size: 12px;
}
.schedule {
  margin: 0 0 0 12px;
}
</style>
