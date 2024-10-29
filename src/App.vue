<template>
  <div id="app">
    <header class="header">
      <ul class="btnArea">
        <li><button class="btn" @click="changeMonth(-1)">&lt;</button></li>
        <li><button class="btn" @click="currentMonth">当月</button></li>
        <li><button class="btn" @click="changeMonth(1)">&gt;</button></li>
      </ul>
      <div>{{ formatMonth(activeDate) }}</div>
      <button class="btn" @click="openModal">登録</button>
      <!-- TODO: 登録ボタンの実装 -->
      <vue-modal-2
        name="scheduleRegister-modal"
        :headerOptions="{
          title: '予定を登録',
        }"
        :footerOptions="{
          btn1: 'キャンセル',
          btn2: '登録',
          btn2Style: {
            backgroundColor: 'green',
          },
          btn2OnClick: () => {
            doDelete();
          },
          btn1OnClick: () => {
            $vm2.close('scheduleRegister-modal');
          },
        }"
        @on-close="closeModal"
        class="scheduleRegister-modal"
      >
        <div class="scheduleRegister-content">
          <div>
            <InputText v-model="inputText" />
          </div>
          <div><InputDate v-model="inputDate" /></div>
          <div class="scheduleRegister-startTime">
            <span>開始時間</span><InputTime v-model="inputTime" />
          </div>
          <div class="scheduleRegister-endTime">
            <span>終了時間</span>
            <InputTime v-model="inputTime" />
          </div>
        </div>
      </vue-modal-2>
    </header>
    <section>
      <ol class="calender">
        <li v-for="(date, index) in generateDate()" :key="index">
          <div class="date-content">
            <p class="date">{{ formatDate(date) }}</p>
            <p class="day">{{ formatDay(date) }}</p>
          </div>
          <div class="schedule-content">
            <!-- TODO: スケジュール登録 -->
            <div><span>00:00</span> ～ <span>00:00</span></div>
            <p>スケジュールが入ります</p>
          </div>
        </li>
      </ol>
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
      inputText: "",
      inputDate: "",
      inputTime: "",
    };
  },
  mounted() {
    this.getDateQueryParam();
  },
  methods: {
    formatDate(date) {
      return format(date, "d");
    },
    formatDay(date) {
      return format(date, "E");
    },
    formatMonth(date) {
      return format(date, "yyyy年M月");
    },
    generateDate() {
      const start = startOfMonth(this.activeDate);
      const end = endOfMonth(this.activeDate);
      return eachDayOfInterval({ start, end });
    },
    changeMonth(num) {
      const changeMonth = addMonths(this.activeDate, num);
      history.replaceState("", "", "?date=" + format(changeMonth, "yyyy-M"));
      this.getDateQueryParam();
    },
    getDateQueryParam() {
      const url = location.search.substring(1);
      this.activeDate = url || new Date();
      this.generateDate();
    },
    currentMonth() {
      this.activeDate = new Date();
    },
    closeModal() {
      this.isModalVisible = false;
      this.$vm2.close("scheduleRegister-modal");
    },
    openModal() {
      this.isModalVisible = true;
      this.$vm2.open("scheduleRegister-modal");
    },
  },
};
</script>
<style scoped>
.mb10 {
  margin-bottom: 10px;
}
.header {
  padding: 10px;
  border-bottom: 2px solid #333;
  display: flex;
  align-items: center;
  gap: 10px;
}
.btnArea {
  display: flex;
  align-items: center;
  gap: 10px;
}
.btn {
  padding: 0.5em;
  background-color: #ddd;
  border-radius: 3px;
}
.calender > li {
  padding: 20px;
  border-bottom: 2px solid #ccc;
  display: flex;
  gap: 15px;
}
.date-content {
  display: flex;
  align-items: center;
  gap: 5px;
}
.date-content .day {
  font-size: 12px;
}
.schedule-content {
  display: flex;
  align-items: center;
  gap: 20px;
}
.scheduleRegister-content {
  padding: 0 20px 0.6rem;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}
.scheduleRegister-startTime,
.scheduleRegister-endTime {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
}
</style>
