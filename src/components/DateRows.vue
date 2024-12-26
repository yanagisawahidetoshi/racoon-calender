<template>
  <div>
    <li v-for="(date, index) in dates" :key="index">
      <DateRow :date="date" :schedules="filterSchedule(date)" />
    </li>
    <!-- モーダルかく -->
  </div>
</template>
<script>
import DateRow from "./DateRow";
import { isSameDay } from "../libs/date-fns";

export default {
  name: "DateRows",
  props: {
    dates: {
      type: 
        Array,
    },
    schedules: {
      type: 
        Array,
    },
  },
  components: {
    DateRow,
  },
  methods: {
    filterSchedule(date) {
      return this.schedules.filter((v) => {
        return isSameDay(date, v.date);
      });
    },
  },

  // methods: {
  //   filterSchedule(date) {
  //     return this.schedules.filter((v) => {
  //       return isSameDay(date, v.date);
  //     });
  //   },
  // },
};
</script>
