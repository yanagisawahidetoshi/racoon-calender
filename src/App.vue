<template>
  <div id="app">
    <CalenderHeader
      @changeMonth="changeMonth"
      :date="currentDate"
      @openModalAddSchedule="openModalAddSchedule"
    />
    <ol class="calendar-list">
      <li v-for="(date, index) in calendar" :key="index" class="calendar-item">
        <CalenderRow :date="date" />
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
import CalenderRow from "@/components/atoms/CalenderRow";
import CalenderHeader from "@/components/morcules/CalenderHeader";

export default {
  name: "App",
  data() {
    return {
      currentDate: null,
      inputText: "",
      inputDate: "",
      inputTime: "",
    };
  },
  components: {
    FormInputDate,
    FormInputTime,
    CalenderRow,
    CalenderHeader,
  },
  computed: {
    calendar() {
      const start = startOfMonth(this.currentDate);
      const end = lastDayOfMonth(this.currentDate);
      return eachDayOfInterval(start, end);
    },
    getCurrentUrl() {
      return new URL(window.location);
    },
  },
  methods: {
    formatDate(date, pattern) {
      return format(date, pattern);
    },
    changeMonth(number) {
      this.currentDate = addMonths(this.currentDate, number);
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
    const url = this.getCurrentUrl;
    const hasParams =
      url.searchParams.get("year") !== null &&
      url.searchParams.get("month") !== null;
    if (hasParams) {
      const year = url.searchParams.get("year");
      const month = getMonth(new Date(year, url.searchParams.get("month"), 1));
      const newDate = `${year}-${month}-1`;
      this.currentDate = new Date(newDate);
    } else {
      this.currentDate = new Date();
    }
  },
  watch: {
    currentDate() {
      const url = this.getCurrentUrl;
      url.searchParams.set("year", this.formatDate(this.currentDate, "yyyy"));
      url.searchParams.set("month", this.formatDate(this.currentDate, "MM"));
      window.history.pushState({}, "", url);
    },
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

li {
  list-style-type: none;
}

.calendar-list {
  padding-left: 0;
}
.calendar-item {
  border-bottom: 1px solid #dadce0;
  padding: 16px;
}
</style>
