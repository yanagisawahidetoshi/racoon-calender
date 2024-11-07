<template>
  <div>
    <CalenderHeader
      :dispDate="dispDate"
      @changeMonth="changeMonth"
      @currentMonth="currentMonth"
      @registerSchedule="registerSchedule"
      @open="open"
    />
    {{ /* 日付と曜日を出力 */ }}
    <ol class="date-list">
      <li v-for="(n, index) in calendar" :key="index">
        <DateItem
          :date="n.date"
          :day="n.day"
          :scheduleDate="getSchedule(n.date)"
        />
      </li>
    </ol>

    <vue-modal-2
      name="modalToRegistSchedule"
      @on-close="close"
      :headerOptions="{
        title: '予定を登録',
      }"
      :footerOptions="{
        btn1: 'キャンセル',
        btn2: '登録',
        btn1Style: {
          backgroundColor: '#cccccc',
        },
        btn2Style: {
          backgroundColor: 'green',
        },
        btn1OnClick: () => {
          this.close();
        },
        btn2OnClick: () => {
          this.registerSchedule();
        },
      }"
    >
      <div class="input-wrap">
        {{ /* input:text */ }}
        <p>
          <InputText v-model="inputSchedule" placeholder="予定を入力" />
        </p>
        {{ /* input:date */ }}
        <p>
          <InputDate v-model="inputDate" />
        </p>
        {{ /* input:time */ }}
        <p>開始時間：<InputTime v-model="inputStartTime" /></p>
        <p>終了時間：<InputTime v-model="inputEndTime" /></p>
      </div>
    </vue-modal-2>
  </div>
</template>

<script>
import {
  format,
  dateInterval,
  addMonths,
  startOfMonth,
  endOfMonth,
  getDay,
} from "./libs/date-utility";
import DateItem from "./components/DateItem";
import CalenderHeader from "./components/CalenderHeader";
import InputDate from "./components/InputDate";
import InputTime from "./components/InputTime";
import InputText from "./components/InputText";

export default {
  name: "app",
  components: {
    DateItem,
    CalenderHeader,
    InputDate,
    InputTime,
    InputText,
  },

  data() {
    return {
      currentDate: new Date(),
      daysOfWeek: ["日", "月", "火", "水", "木", "金", "土"],
      inputSchedule: "",
      inputDate: "",
      inputStartTime: "",
      inputEndTime: "",
      items: [],
    };
  },
  computed: {
    dispDate() {
      return format(this.currentDate, "yyyy年MM月");
    },
    calendar() {
      const startDate = startOfMonth(this.currentDate);
      const endDate = endOfMonth(this.currentDate);
      return dateInterval(startDate, endDate).map((days) => ({
        date: format(days, "yyyy-MM-dd"),
        day: this.daysOfWeek[getDay(days)],
      }));
    },
  },

  methods: {
    changeMonth(addDate) {
      //console.log("");
      this.currentDate = addMonths(this.currentDate, addDate);
      this.urlParams();
    },
    currentMonth() {
      this.currentDate = new Date();
      this.urlParams();
    },
    open() {
      this.$vm2.open("modalToRegistSchedule");
    },
    close() {
      this.$vm2.close("modalToRegistSchedule");
    },
    clear() {
      this.inputDate = "";
      this.inputStartTime = "";
      this.inputEndTime = "";
      this.inputSchedule = "";
    },
    urlParams() {
      const year = format(this.currentDate, "yyyy");
      const Month = format(this.currentDate, "MM");
      //console.log(year);
      const newUrl = `${window.location.pathname}?year=${year}&month=${Month}`;
      window.history.pushState({ path: newUrl }, "", newUrl);
    },
    registerSchedule() {
      // 追加用
      const newSchedule = {
        date: this.inputDate,
        startTime: this.inputStartTime,
        endTime: this.inputEndTime,
        schedule: this.inputSchedule,
      };
      //console.log(newSchedule);
      this.items.push(newSchedule);
      //console.log(this.items);
      this.clear();
      this.close();
    },
    getSchedule(date) {
      //console.log(this.items);
      const scheduleDate = this.items.find((item) => item.date === date);
      return scheduleDate ? scheduleDate : null;
    },
  },
  mounted() {
    const currentUrl = window.location.href;
    const url = new URL(currentUrl);
    const yearParam = !isNaN(Number(url.searchParams.get("year")))
      ? url.searchParams.get("year")
      : null;
    const monthParam = !isNaN(Number(url.searchParams.get("month")))
      ? url.searchParams.get("month")
      : null;
    if (yearParam && monthParam) {
      //console.log(new Date(yearParam, monthParam));
      this.currentDate = new Date(yearParam, monthParam - 1);
    }
  },
};
</script>
<style scoped>
ol,
li {
  padding: 0;
  margin: 0;
  list-style: none;
}
.date-list li {
  border-bottom: 1px solid #d3d3d3;
  padding: 12px 0;
}
.btn {
  margin: 0 6px;
}
.input-wrap {
  margin: 6px 10px;
}
.inputDate,
.inputTime {
  border: none;
}
.inputText {
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid #cccccc;
  width: 100%;
  border-radius: inherit;
}
.inputText:focus {
  outline: none;
}
</style>
