<template>
  <div id="app">
    <h1>カレンダー</h1>
    <section>
      <h2>ハードコードで1日〜31日までをv-forで表示</h2>
      <ol>
        <li v-for="index in 31" :key="index">{{ index }}日</li>
      </ol>
    </section>
    <section>
      <h2>date-fnsを使って当月の1日〜最終日までをv-forで表示</h2>
      <ol>
        <li v-for="(date, index) in dateList" :key="index">
          {{ formatDate(date) }}
        </li>
      </ol>
    </section>
  </div>
</template>

<script>
import { startOfMonth, endOfMonth, eachDayOfInterval, format } from "date-fns";
import ja from "date-fns/locale/ja";
export default {
  name: "App",
  data() {
    return {
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
      const now = new Date();
      const start = startOfMonth(now);
      const end = endOfMonth(now);
      this.dateList = eachDayOfInterval({ start, end });
    },
  },
  components: {},
};
</script>
<style scoped>
ul,
ol {
  list-style: none;
}
</style>
