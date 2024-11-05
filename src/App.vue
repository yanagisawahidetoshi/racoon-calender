<template>
  <div id="app">
    <CalenderHeader
      :changeDate="changeDate"
      :changeCurrentMonth="changeCurrentMonth"
    />
    <h1 class="title">カレンダー</h1>
    <section class="block">
      <ol class="list">
        <li class="detail" v-for="(day, index) in instanceMonth" :key="index">
          <CalenderDate :day="day" />
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
  parse,
} from "./libs/date-util";
import InputDate from "./components/atoms/InputDate.vue";
import InputTime from "./components/atoms/InputTime.vue";
import CalenderHeader from "./components/molecules/Calender/Header.vue";
import CalenderDate from "./components/molecules/Calender/Date.vue";

export default {
  name: "App",
  components: { InputDate, InputTime, CalenderHeader, CalenderDate },
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
    },
    changeDate(num) {
      this.active = addMonths(this.active, num);
    },
  },
  mounted() {
    const params = new URLSearchParams(window.location.search);
    const year = params.get("year");
    const month = params.get("month");
    if (year && month) {
      this.active = parse(`${year}-${month}`, "yyyy-MM", new Date());
    }
  },
  watch: {
    active: function (newActive) {
      const url = new URL(window.location.href);
      url.searchParams.set("year", format(newActive, "yyyy"));
      url.searchParams.set("month", format(newActive, "MM"));
      window.history.pushState({}, "", url);
    },
  },
};
</script>

<style scoped>
#app {
  margin: 30px;
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
