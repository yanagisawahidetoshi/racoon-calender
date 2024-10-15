<template>
  <div>
    {{ /* 日付と曜日を出力 */ }}
    <ol>
      <li v-for="(n, index) in calendar" :key="index">
        {{ n.date }}({{ n.day }})
      </li>
    </ol>
  </div>
</template>

<script>
// 表示年月を表示
// 左右に前月次月を切り替えるボタンを表示
// 当月ボタンを表示
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
    const EOM = endOfMonth(currentDate);
    // 曜日追加
    const daysOfWeek = ["日", "月", "火", "水", "木", "金", "土"];
    const calendar = eachDayOfInterval({
      start: new Date(SOM),
      end: new Date(EOM),
    }).map((day) => ({
      date: format(day, "dd"),
      day: daysOfWeek[getDay(day)],
    }));
    //console.log(calendar);
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
