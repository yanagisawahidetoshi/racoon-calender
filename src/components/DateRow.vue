<template>
  <div>
    <p>{{ formatDate(date) }}</p>
    <div v-for="(schedule, index) in schedules" :key="index">
      <p>{{ schedule.startTime }}～{{ schedule.finishTime }}</p>
      <p>{{ schedule.content }}</p>
    </div>
  </div>
</template>
<script>
import { format } from "../libs/date-fns";

export default {
  name: "DateRow",
  props: {
    date: { type: Date },
    schedules: {
      type: Array,
    },
  },
  methods: {
    formatDate(date) {
      return format(date, "MM月dd日");
    },
  },
};
</script>
