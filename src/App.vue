<template>
  <div id="app">
    {{ today }}
    <section>
      <h1>ハードコードで1日〜31日までをv-forで表示させてみる</h1>
      <ol>
        <li v-for="m in 31" :key="m">{{ m }}日</li>
      </ol>
    </section>
    <section>
      <h1>date-fnsを使って当月の1日〜最終日までをv-forで表示させる</h1>
      <ul class="controle-month">
        <li><button type="button" @click="lastMonth">前月</button></li>
        <li><button type="button" @click="currentMonth">当月</button></li>
        <li><button type="button" @click="nextMonth">翌月</button></li>
      </ul>
      <ol>
        <li v-for="(date, index) in calendar" :key="index">
          {{ formatDate(date) }}
        </li>
      </ol>
    </section>
  </div>
</template>

<script>
import {
  lastDayOfMonth,
  startOfMonth,
  addMonths,
  subMonths,
  format,
  eachDayOfInterval,
} from "date-fns";
import { ja } from "date-fns/locale";

// date-fnsを使って当月の1日〜最終日までをv-forで表示させる
// リストは日付 + 曜日にする
// リスtーの頭に何月かを表示させる。日本語形式で
// 1行1日のリスト形式で大丈夫です。
// console.log(format(new Date(), "yyyy年MM月dd日（E）", { locale: ja }));

// 今月を取得し、今月の最終日を取得する

export default {
  name: "App",
  data() {
    return {
      today: new Date(),
    };
  },
  computed: {
    calendar() {
      const start = startOfMonth(this.today);
      const end = lastDayOfMonth(this.today);
      return eachDayOfInterval({
        start,
        end,
      });
    },
  },
  methods: {
    formatDate(date) {
      return format(date, "MM月dd日(E)", { locale: ja });
    },
    lastMonth() {
      this.today = subMonths(this.today, 1);
    },
    nextMonth() {
      this.today = addMonths(this.today, 1);
    },
    currentMonth() {
      this.today = new Date();
    },
  },
};
</script>
<style scoped>
li {
  list-style-type: none;
}
.controle-month {
  display: flex;
  gap: 10px;
  :hover {
    cursor: pointer;
  }
}
</style>
