<template>
  <div id="app">
    <h1>カレンダー</h1>
    <section class="mb10">
      <h2>来月、翌月ボタン追加</h2>
      <ul class="btnArea mb10">
        <li><button class="btn" @click="prevMonth">前月</button></li>
        <li><button class="btn" @click="currentMonth">当月</button></li>
        <li><button class="btn" @click="nextMonth">翌月</button></li>
      </ul>
      <ol>
        <li v-for="(date, index) in generateDate()" :key="index">
          {{ formatDate(date) }}
        </li>
      </ol>
    </section>
    <section>
      <h2>inputコンポーネント確認用</h2>
      <div class="input-wrap">
        <InputText v-model="inputText" />
        <InputDate v-model="inputDate" />
        <InputTime v-model="inputTime" />
      </div>
    </section>
  </div>
</template>

<script>
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  addMonths,
  subMonths,
} from "./libs/date-util";
import InputText from "./components/atoms/InputText/";
import InputDate from "./components/atoms/InputDate/";
import InputTime from "./components/atoms/InputTime/";
export default {
  name: "App",
  components: {
    InputText,
    InputDate,
    InputTime,
  },
  data() {
    return {
      activeDate: new Date(),
      changeText: "",
    };
  },
  mounted() {
    this.generateDate();
  },
  methods: {
    handleText(val) {
      this.changeText = val;
    },
    formatDate(date) {
      return format(date, "yyyy年M月d日（E）");
    },
    generateDate() {
      const start = startOfMonth(this.activeDate);
      const end = endOfMonth(this.activeDate);
      return eachDayOfInterval({ start, end });
    },
    prevMonth() {
      this.activeDate = addMonths(this.activeDate, 1);
    },
    nextMonth() {
      this.activeDate = subMonths(this.activeDate, 1);
    },
    currentMonth() {
      this.activeDate = new Date();
    },
  },
};
</script>
<style scoped>
.mb10 {
  margin-bottom: 10px;
}
.btnArea {
  display: flex;
  gap: 10px;
}
.btn {
  padding: 0.5em;
  background-color: #ddd;
  border-radius: 3px;
}
.input-wrap {
  display: flex;
  gap: 10px;
}
</style>
