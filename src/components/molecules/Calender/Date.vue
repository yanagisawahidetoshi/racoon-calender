<template>
  <p>{{ formatDate(day, "yyyy年MMMMdo（EEEE）") }}</p>
</template>

<script>
import { format } from "../../../libs/date-util";
export default {
  name: "CalenderDate",
  props: {
    day: {
      type: String,
    },
  },
  methods: {
    formatDate(date, f) {
      return format(date, f);
    },
  },
};
</script>
