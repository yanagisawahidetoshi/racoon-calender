<template>
  <p>
    <span>{{ formatDate(date, 'MM/dd EEEE') }}</span>

    <span v-for="(schedule, index) in schedules" :key="index">
        <span v-if="isSameDate(date, schedule.date)">
          {{ schedule.startTime }} ～ {{ schedule.endTime }}
          {{ schedule.content }}
      </span>
    </span>
  </p>
</template>

<script>
import {
  format,
  isSameDate
} from "@/libs/date-fns";

export default {
  name: "CalendarEachRow",
  props: {
    date: {
      type: Date,
      required: true,
    },
    schedules: {
      type: Array,
    },
  },
  methods: {
    formatDate(date, setting){
      return format(date, setting);
    },
    isSameDate(date1, date2) {
      return isSameDate(date1, date2);
    }
  },
}
</script>