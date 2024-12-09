<template>
  <p>{{ formatDate(date, 'MM/dd EEEE') }}</p>
</template>

<script>
import {
  format,
} from "@/libs/date-fns";

export default {
  name: "CalendarEachRow",
  props: {
    date: {
      type: Date,
      required: true,
    },
  },
  methods: {
    formatDate(date, setting){
      return format(date, setting);
    },
  },
}
</script>