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
        <li v-for="(day, index) in instanceMonth" :key="index">
          {{ formatDate(day) }}
        </li>
      </ol>
      <div>
        <button @click="prevMonth">前月</button>
        <button @click="currentMonth">当月</button>
        <button @click="nextMonth">翌月</button>
      </div>
    </section>
  </div>
</template>

<script>
import {
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  format,
  subMonths,
} from "date-fns";
import { ja } from "date-fns/locale";

export default {
  name: "App",
  components: {},
  data() {
    return {
      active: new Date(),
    };
  },
  computed: {
    instanceMonth() {
      const dates = eachDayOfInterval({
        start: startOfMonth(this.active),
        end: endOfMonth(this.active),
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
    prevMonth() {
      this.active = subMonths(this.active, +1);
    },
    nextMonth() {
      this.active = subMonths(this.active, -1);
    },
    currentMonth() {
      this.active = new Date();
    },
  },
};
</script>
