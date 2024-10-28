<template>
  <div id="app">
    <header class="header">
      <ul class="controle-month">
        <li>
          <a href="javascript:void(0);" @click="changeMonth(-1)">
            <svg
              data-v-0b6b1d24=""
              focusable="false"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                data-v-0b6b1d24=""
                d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12l4.58-4.59z"
              ></path>
            </svg>
          </a>
        </li>
        <li>
          <a href="javascript:void(0);" @click="changeMonth(1)">
            <svg
              data-v-0b6b1d24=""
              focusable="false"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                data-v-0b6b1d24=""
                d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z"
              ></path>
            </svg>
          </a>
        </li>
        <!-- <li><button type="button" @click="currentMonth">当月</button></li> -->
      </ul>
      <h1 class="title">{{ formatDate(currentDate, "yyyy年M月") }}</h1>
      <button type="button" @click="openModalAddSchedule">登録</button>
    </header>
    <ol class="calendar-list">
      <li v-for="(date, index) in calendar" :key="index" class="calendar-item">
        <p>{{ formatDate(date, "d") }}</p>
        <p class="day">{{ formatDate(date, "E") }}</p>
      </li>
    </ol>
    <vue-modal-2
      name="modal-add-schedule"
      @on-close="closeModalAddSchedule"
      :footerOptions="{
        btn1: '登録',
        btn2: 'キャンセル',
        btn2OnClick: () => {
          $vm2.close('modal-add-schedule');
        },
      }"
    >
      <div>
        <p>予定を変更</p>
        <p><FormInputDate v-model="inputDate" /></p>
        <p>開始時間<FormInputTime v-model="inputTime" /></p>
        <p>終了時間<FormInputTime v-model="inputTime" /></p>
        <!-- <FormInputDate :value="inputDate" @change="inputDate = $event" /> -->
        <!-- <button type="button">登録</button>
        <button type="button" @on-close="closeModalAddSchedule">
          キャンセル
        </button> -->
      </div>
    </vue-modal-2>
  </div>
</template>

<script>
import {
  lastDayOfMonth,
  startOfMonth,
  addMonths,
  format,
  eachDayOfInterval,
  getMonth,
} from "./libs/dateUtil.js";

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
    FormInputDate,
    FormInputTime,
  },
  computed: {
    calendar() {
      const start = startOfMonth(this.currentDate);
      const end = lastDayOfMonth(this.currentDate);
      return eachDayOfInterval(start, end);
    },
  },
  methods: {
    formatDate(date, pattern) {
      return format(date, pattern);
    },
    changeMonth(number) {
      this.currentDate = addMonths(this.currentDate, number);
      const param = this.formatDate(this.currentDate, "yyyyMM");
      const url = new URL(window.location);
      url.searchParams.set("month", param);
      window.history.pushState({}, "", url);
    },
    currentMonth() {
      this.currentDate = new Date();
    },
    openModalAddSchedule() {
      this.$vm2.open("modal-add-schedule");
    },
    closeModalAddSchedule() {
      this.$vm2.close("modal-add-schedule");
    },
  },
  mounted() {
    const url = new URL(window.location);
    const param = url.searchParams.get("month");
    if (param !== null) {
      const year = param.slice(0, 4);
      const month = getMonth(new Date(year, param.slice(4), 1));
      const newDate = `${year}-${month}-1`;
      this.currentDate = new Date(newDate);
    }
  },
};
</script>
<style scoped>
button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  padding: 0;
  appearance: none;
}
.header {
  display: flex;
  align-items: center;
  gap: 10px;
  border-bottom: 1px solid #000;
}
.title {
  font-size: 18px;
  margin: 0;
}
li {
  list-style-type: none;
}
.controle-month {
  display: flex;
  gap: 10px;
  align-items: center;
  margin: 0;
  padding-left: 0;
  :hover {
    cursor: pointer;
  }
}
.calendar-list {
  padding-left: 0;
}
.calendar-item {
  display: flex;
  align-items: center;
  gap: 5px;
  border-bottom: 1px solid #dadce0;
  padding: 16px;
  .day {
    font-size: 0.8em;
  }
}
</style>
