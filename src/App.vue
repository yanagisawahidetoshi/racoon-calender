<template>
  <div id="app">
    <button type="submit" @click="changeMonth(-1)">前月</button>
    <button type="submit" @click="changeToCurrentMonth">当月</button>
    <button type="submit" @click="changeMonth(1)">翌月</button>
    {{ format(currentDay, "yyyy年MM月") }}
    <ol>
      <li v-for="(date, index) in dates" :key="index">
        <p>{{ format(date, "MM/dd EE") }}</p>
      </li>
    </ol>
    {{ inputDate }}
    {{ inputTime }}
    {{ inputText }}<br />
    <InputDate v-model="inputDate" />
    <InputTime v-model="inputTime" />
    <InputText v-model="inputText" />
  </div>
</template>

<script>
import {
  startOfMonth,
  lastDayOfMonth,
  eachDayOfInterval,
  format,
  addMonths,
} from "./libs/date-util.js";
import InputDate from "./components/atoms/InputDate";
import InputText from "./components/atoms/InputText";
import InputTime from "./components/atoms/InputTime";
export default {
  name: "App",
  components: {
    InputDate,
    InputText,
    InputTime,
  },
  data() {
    return {
      currentDay: new Date(),
      inputDate: "2024-10-28",
      inputText: "aaa",
      inputTime: "10:12",
    };
  },
  mounted() {
    const url = location.href;
    const matchedString = url.match(
      /^https?:\/\/.*\/([0-9]{4})\/(0?[1-9]|1[0-2])\/.*?/
    );
    if (matchedString) {
      const URLYear = matchedString[1];
      const URLMonth = matchedString[2];
      this.currentDay = new Date(URLYear + "-" + URLMonth + "-01");
    }
  },
  computed: {
    dates() {
      const start = startOfMonth(this.currentDay);
      const end = lastDayOfMonth(this.currentDay);
      return eachDayOfInterval({ start, end });
    },
  },
  methods: {
    format(date, pattern) {
      return format(date, pattern);
    },
    changeMonth(num) {
      this.currentDay = addMonths(this.currentDay, num);
    },
    changeToCurrentMonth() {
      this.currentDay = new Date();
    },
  },
};
</script>
