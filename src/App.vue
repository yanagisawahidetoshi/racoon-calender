<template>
  <div id="app">
    <div>
      <button type="submit" @click="changeMonth(-1)">前月</button>
      <button type="submit" @click="changeToCurrentMonth">当月</button>
      <button type="submit" @click="changeMonth(1)">翌月</button>
      <h1>{{ format(currentDay, "yyyy/MM") }}</h1>
      <button type="submit" @click="openModal('registNewSchedule-modal')">
        登録
      </button>
    </div>
    <ol>
      <li v-for="(date, index) in dates" :key="index">
        <p>{{ format(date, "MM/dd EE") }}</p>
      </li>
    </ol>
    <vue-modal-2
      name="registNewSchedule-modal"
      @on-close="closeModal('registNewSchedule-modal')"
      :headerOptions="{ title: '予定を登録' }"
      :footerOptions="{
        btn1: 'キャンセル',
        btn2: '登録',
        btn2Style: {
          backgroundColor: 'blue',
        },
        btn1OnClick: () => {
          closeModal('registNewSchedule-modal');
        },
        btn2OnClick: () => {
          regist();
        },
      }"
    >
      <InputDate v-model="inputDate" />
      <InputTime v-model="inputTime" />
      <InputText v-model="inputText" />
    </vue-modal-2>
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
    openModal(name) {
      this.$vm2.open(name);
    },
    closeModal(name) {
      this.$vm2.close(name);
    },
    regist() {},
  },
};
</script>
