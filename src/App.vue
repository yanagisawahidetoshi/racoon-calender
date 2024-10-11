<template>
  <div id="app">
    <h1>カレンダー</h1>
    <section>
      <h2>まずは、ハードコードで1日〜31日までをv-forで表示させてみる</h2>
      <ol>
        <li v-for="day in 31" :key="day">
          {{ day }}日{{ applyDayOfWeek(day) }}曜日
        </li>
      </ol>
    </section>
    <section>
      <h2>date-fnsを使って当月の1日〜最終日までをv-forで表示させる</h2>
      <ol>
        <li v-for="(day, index) in currentMonth" :key="index">
          {{ formatDate(day) }}
        </li>
      </ol>
    </section>
  </div>
</template>

<script>
import { eachDayOfInterval, startOfMonth, endOfMonth, format } from "date-fns";
import { ja } from "date-fns/locale";

export default {
  name: "App",
  components: {},
  computed: {
    currentMonth() {
      const now = new Date();
      const dates = eachDayOfInterval({
        start: startOfMonth(now),
        end: endOfMonth(now),
      });
      return dates;
    },
  },
  methods: {
    applyDayOfWeek(day) {
      const dayOfWeek = ["月", "火", "水", "木", "金", "土", "日"];
      return dayOfWeek[(day - 1) % 7];
    },
    formatDate(date) {
      return format(date, "yyyy年MMMMdo（EEEE）", { locale: ja });
    },
  },
};
</script>
