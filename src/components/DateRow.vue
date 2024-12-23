<template>
  <div>
    <p>{{ formatDate(date) }}</p>
    <p v-for="schedule in schedules" :key="schedule.id">
      <button>
        {{ schedule.content }} ({{ schedule.startTime }} -
        {{ schedule.endTime }})
      </button>
    </p>
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
