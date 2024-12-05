<template>
  <p>
    <span>{{ formatDate(date, "do（E）") }}</span>
    <span v-if="schedule">
      {{ schedule.startTimeValue }} ～ {{ schedule.endTimeValue }}
    </span>
    <!-- 年月日が一致すれば該当オブジェクトの時間を表示 -->
  </p>
</template>

<script>
import { format } from "../../../libs/date-util";
export default {
  name: "CalenderDate",
  props: {
    date: {
      type: Date,
    },
    schedule: {
      type: Object,
    },
  },
  methods: {
    formatDate(date, f) {
      return format(date, f);
    },
  },
};
</script>
