<template>
  <div>
    {{ /* 日付と曜日を出力 */ }}
    <ol>
      <li v-for="(n, index) in calendar" :key="index">
        {{ n.DAY }}({{ n.DOW }})
      </li>
    </ol>
  </div>
</template>

<script>
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  getDay,
} from "date-fns";

export default {
  name: "app",
  components: {},
  data() {
    const currentDate = new Date();
    const SOM = startOfMonth(currentDate);
    const LOM = endOfMonth(currentDate);
    // 曜日追加
    const daysOfWeek = ["日", "月", "火", "水", "木", "金", "土"];
    const calendar = eachDayOfInterval({
      start: new Date(SOM),
      end: new Date(LOM),
    }).map((date) => ({
      DAY: format(date, "dd"),
      DOW: daysOfWeek[getDay(date)],
    }));
    return {
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
