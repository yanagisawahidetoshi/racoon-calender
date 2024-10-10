<template>
  <div>
    {{ /* 日付と曜日を出力 */ }}
    <ol>
      <li v-for="(n, index) in calendar" :key="index">
        {{ n.DAY }}({{ n.DOW }})
      </li>
    </ol>

    月初：{{ BOM }} 月末：{{ EOM }}
  </div>
</template>

<script>
import { startOfMonth, endOfMonth, getDay, format, addDays } from "date-fns";

export default {
  name: "app",
  components: {},
  data() {
    const currentDate = new Date();
    const start = startOfMonth(currentDate);
    const end = endOfMonth(currentDate);
    // 曜日追加
    const daysOfWeek = ["日", "月", "火", "水", "木", "金", "土"];
    const calendar = []; // 空の配列
    for (let i = 0; i < end.getDate(); i++) {
      const day = addDays(start, i);
      calendar.push({
        DAY: format(day, "dd"), // 01とするためのformat
        DOW: daysOfWeek[getDay(day)], // 曜日
      });
    }
    return {
      BOM: start.getDate(), // 月初
      EOM: end.getDate(), // 月末
      calendar,
    };
  },
};
</script>
<style scoped>
ol,
li {
  padding: 0;
  margin: 0;
  list-style: none;
}
</style>
