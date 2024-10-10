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
        <li v-for="(calender, index) in formattedDateList" :key="index">
          {{ calender }}
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
      formattedDateList: [],
    };
  },
  mounted() {
    this.generateDate();
  },
  methods: {
    generateDate() {
      const now = new Date();
      const start = startOfMonth(now);
      const end = endOfMonth(now);
      const dateList = eachDayOfInterval({ start, end });
      this.formattedDateList = dateList.map((date) =>
        format(date, "yyyy年M月d日（E）", { locale: ja })
      );
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
