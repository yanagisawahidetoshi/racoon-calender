<template>
  <div id="app">
    <h1>カレンダー</h1>
    <section>
      <h2>来月、翌月ボタン追加</h2>
      <button @click="prevMonth">前月</button>
      <button @click="currentMonth">当月</button>
      <button @click="nextMonth">翌月</button>
      <ol>
        <li v-for="(date, index) in dateList" :key="index">
          {{ formatDate(date) }}
        </li>
      </ol>
    </section>
  </div>
</template>

<script>
import { startOfMonth, endOfMonth, eachDayOfInterval, format, addMonths, subMonths } from "date-fns";
import ja from "date-fns/locale/ja";
export default {
  name: "App",
  data() {
    return {
      currentDay : new Date(),
      dateList: [],
    };
  },
  mounted() {
    this.generateDate();
  },
  methods: {
    formatDate(date) {
      return format(date, "yyyy年M月d日（E）", { locale: ja })
    },
    generateDate() {
      const start = startOfMonth(this.currentDay);
      const end = endOfMonth(this.currentDay);
      this.dateList = eachDayOfInterval({ start, end });
    },
    prevMonth() {
      this.currentDay = subMonths(this.currentDay, 1);
      this.generateDate();
    },
    nextMonth() {
      this.currentDay = addMonths(this.currentDay, 1);
      this.generateDate();
    },
    currentMonth() {
      this.currentDay = new Date();
      this.generateDate();
    }
  },
};
</script>
<style scoped>
ul,
ol {
  list-style: none;
}
</style>
