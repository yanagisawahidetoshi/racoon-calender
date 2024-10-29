<template>
  <div id="app">
    <header class="common_header">
      <div class="wrap_button">
        <button class="button" @click="changeUrl(-1)">前月</button>
        <button class="button" @click="changeCurrentMonth()">当月</button>
        <button class="button" @click="changeUrl(1)">翌月</button>
        <button class="button" @click="$vm2.open('registScheduleModal')">
          登録
        </button>
      </div>
    </header>
    <h1 class="title">カレンダー</h1>
    <section class="block">
      <ol class="list">
        <li class="detail" v-for="(day, index) in instanceMonth" :key="index">
          {{ formatDate(day, "yyyy年MMMMdo（EEEE）") }}
        </li>
      </ol>
    </section>
    <vue-modal-2
      @on-close="$vm2.close('registScheduleModal')"
      name="registScheduleModal"
      :headerOptions="{
        title: '予定を登録',
      }"
      :footerOptions="{
        btn1: 'キャンセル',
        btn2: '登録',
        btn2Style: {
          backgroundColor: 'green',
        },
        btn1OnClick: () => {
          $vm2.close('registScheduleModal');
        },
      }"
    >
      <div class="wrap_input">
        <dl class="input_col">
          <dt class="input_title">日付</dt>
          <dd><InputDate v-model="dateValue" /></dd>
        </dl>
        <dl class="input_col">
          <dt class="input_title">開始時間</dt>
          <dd><InputTime v-model="startTimeValue" /></dd>
        </dl>
        <dl class="input_col">
          <dt class="input_title">終了時間</dt>
          <dd><InputTime v-model="endTimeValue" /></dd>
        </dl>
      </div>
    </vue-modal-2>
  </div>
</template>

<script>
import {
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  format,
  addMonths,
} from "./libs/date-util";
import InputDate from "./components/atoms/InputDate.vue";
import InputTime from "./components/atoms/InputTime.vue";

export default {
  name: "App",
  components: { InputDate, InputTime },
  data() {
    return {
      active: new Date(),
      textValue: "",
      dateValue: "",
      startTimeValue: "",
      endTimeValue: "",
    };
  },
  computed: {
    instanceMonth() {
      const dates = eachDayOfInterval({
        start: startOfMonth(this.active),
        end: endOfMonth(this.active),
      });
      return dates;
    },
  },
  methods: {
    formatDate(date, f) {
      return format(date, f);
    },
    changeCurrentMonth() {
      this.active = new Date();
      this.changeUrl(0);
    },
    changeUrl(num) {
      const changeMonth = addMonths(this.active, num);
      const url = new URL(window.location.href);
      url.searchParams.set("year", format(changeMonth, "yyyy"));
      url.searchParams.set("month", format(changeMonth, "MM"));
      window.history.pushState({}, "", url);
      if (num != 0) {
        // changeCurrentMonth経由での実行の場合、実行しない
        this.changeDate();
      }
    },
    changeDate() {
      const params = new URLSearchParams(window.location.search);
      const year = params.get("year");
      const month = params.get("month");
      this.active = new Date(year, month - 1); //dateオブジェクトの月は0から始まる
    },
  },
  mounted() {
    this.changeDate();
  },
};
</script>

<style scoped>
#app {
  margin: 30px;
}
.common_header {
  padding-bottom: 10px;
  border-bottom: 1px solid #999;
  margin-bottom: 20px;
}
.title {
  font-size: 50px;
  font-weight: bold;
}
.block {
  margin: 30px 0;
}
.list .detail {
  margin-bottom: 8px;
}
.wrap_button {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
}
.button {
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(240, 240, 240);
  font-size: 15px;
  border-radius: 4px;
  border: 1px solid black;
}
.wrap_input {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 0 10px;
}
.input_col {
  display: flex;
  align-items: center;
}
.input_title:after {
  content: "：";
}
</style>
