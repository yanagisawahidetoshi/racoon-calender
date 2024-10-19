<template>
  <div id="app">
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
    <section>
      <h1>
        input:text/input:date/input:timeのコンポーネントを作っておいてください。
      </h1>
      <FormInput v-model="inputText" />
      <FormInputDate :value="inputDate" @change="inputDate = $event" />
      <FormInputTime v-model="inputTime" />
    </section>
  </div>
</template>

<script>
import {
  getLastDayOfMonth,
  getStartOfMonth,
  getAddMonths,
  getSubMonths,
  getFormatJa,
  getEachDayOfInterval,
} from "./libs/date-fns.js";

import FormInput from "@/components/atoms/FormInput";
import FormInputDate from "@/components/atoms/FormInputDate";
import FormInputTime from "@/components/atoms/FormInputTime";

export default {
  name: "App",
  data() {
    return {
      currentDate: new Date(),
      inputText: "",
      inputDate: "",
      inputTime: "",
    };
  },
  components: {
    FormInput,
    FormInputDate,
    FormInputTime,
  },
  computed: {
    calendar() {
      const start = getStartOfMonth(this.currentDate);
      const end = getLastDayOfMonth(this.currentDate);
      return getEachDayOfInterval(start, end);
    },
  },
  methods: {
    formatDate(date) {
      return getFormatJa(date, "MM月dd日(E)");
    },
    lastMonth() {
      this.currentDate = getSubMonths(this.currentDate, 1);
    },
    nextMonth() {
      this.currentDate = getAddMonths(this.currentDate, 1);
    },
    currentMonth() {
      this.currentDate = new Date();
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
