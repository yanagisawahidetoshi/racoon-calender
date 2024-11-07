<template>
  <p v-bind:class="className !== '' ? className : defaultClass">
    {{ formatDate }} 日 <span class="day">({{ day }})</span>
    <span v-if="scheduleDate" class="schedule">
      {{ scheduleDate.schedule }}
      ({{ scheduleDate.startTime }} - {{ scheduleDate.endTime }})
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
      type: Object,
      default: null,
    },
    className: {
      type: String,
      default: "",
    },
    defaultClass: {
      type: String,
      default: "date",
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
