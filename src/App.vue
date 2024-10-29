<template>
  <div id="app">
    <ol>
      <li v-for="(date, index) in dates" :key="index">
        <p>{{ format(date, "dd EE") }}</p>
      </li>
    </ol>
  </div>
</template>

<script>
import {
  startOfMonth,
  lastDayOfMonth,
  eachDayOfInterval,
  format,
} from "date-fns";
export default {
  name: "App",
  components: {},
  computed: {
    dates() {
      const now = new Date();
      const start = startOfMonth(now);
      const end = lastDayOfMonth(now);
      return eachDayOfInterval({ start, end });
    },
  },
  methods: {
    format(date, pattern) {
      return format(date, pattern);
    },
  },
};
</script>
