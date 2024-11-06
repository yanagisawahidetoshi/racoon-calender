<template>
  <div class="calender-row">
    <div class="date-content">
      <p class="date">{{ formatDate(date) }}</p>
      <p class="day">{{ formatDay(date) }}</p>
    </div>
    <div class="schedule-content">
      <!-- TODO: スケジュール登録 -->
      <div><span>00:00</span> ～ <span>00:00</span></div>
      <p>スケジュールが入ります</p>
    </div>
  </div>
</template>
<script>
import { format } from "@/libs/date-util";
export default {
  name: "CalenderRow",
  props: {
    date: {
      type: Date,
      required: true,
    },
  },
  methods: {
    formatDate(date) {
      return format(date, "d");
    },
    formatDay(date) {
      return format(date, "E");
    },
  },
};
</script>
<style scoped>
.calender-row {
  padding: 20px;
  border-bottom: 2px solid #ccc;
  display: flex;
  gap: 15px;
}
.date-content {
  display: flex;
  align-items: center;
  gap: 5px;
}
.date-content .day {
  font-size: 12px;
}
.schedule-content {
  display: flex;
  align-items: center;
  gap: 20px;
}
</style>
