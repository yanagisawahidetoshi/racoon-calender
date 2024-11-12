<template>
  <p>
    <span>{{ formatDate(day, "do（E）") }}</span>
    <span v-for="(object, index) in hasSchedules" :key="index">
      {{ object.startTimeValue }} ～ {{ object.endTimeValue }}
    </span>
    <!-- 年月日が一致すれば該当オブジェクトの時間を表示 -->
  </p>
</template>

<script>
import {
  parse,
  format,
  isSameYear,
  isSameMonth,
  isSameDay,
} from "../../../libs/date-util";
export default {
  name: "CalenderDate",
  props: {
    day: {
      type: Date,
    },
    schedules: {
      type: Array,
    },
  },
  computed: {
    hasSchedules() {
      return this.schedules.filter((object) => {
        const dateValue = parse(object.dateValue, "yyyy-MM-dd", new Date()); // dateValueはyyyy-mm-ddなので、dayと比較するためフォーマットを揃える
        return (
          isSameYear(this.day, dateValue) &&
          isSameMonth(this.day, dateValue) &&
          isSameDay(this.day, dateValue)
        );
      });
    },
  },
  methods: {
    formatDate(date, f) {
      return format(date, f);
    },
  },
};
</script>
