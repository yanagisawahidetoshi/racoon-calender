<template>
  <div class="row">
    <p>{{ formatDate(date, "d") }}</p>
    <p class="day">{{ formatDate(date, "E") }}</p>
    <button
      v-for="(schedule, index) in schedules"
      :key="index"
      class="calender-button"
    >
      <div>
        {{ schedule.startTime }}～{{ schedule.finishTime }}
        {{ schedule.content }}
      </div>
    </button>
  </div>
</template>
<script>
import { format } from "../../libs/dateUtil.js";

export default {
  name: "CalenderRow",
  props: {
    date: {
      type: Date,
    },
    schedules: {
      type: Array,
    },
  },
  methods: {
    formatDate(date, pattern) {
      return format(date, pattern);
    },
  },
};
</script>
<style scoped>
.row {
  display: flex;
  align-items: center;
  gap: 5px;
}
.day {
  font-size: 0.8em;
}
.calender-button {
  margin-right: 10px;
}
</style>
