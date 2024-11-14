<template>
  <div>
    <CalenderHeader
      :dispDate="dispDate"
      @changeMonth="changeMonth"
      @changeCurrentMonth="changeCurrentMonth"
      @modalOpen="modalOpen"
      @modalClose="modalClose"
      @registerSchedule="registerSchedule"
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

export default {
  name: "App",
  components: {
    DateItem,
    CalenderHeader,
  },

  data() {
    return {
      currentDate: new Date(),
      daysOfWeek: ["日", "月", "火", "水", "木", "金", "土"],
      inputSchedule: "",
      inputDate: "",
      inputStartTime: "",
      inputEndTime: "",
      rgistedSchedule: [],
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
      this.currentDate = addMonths(this.currentDate, addDate);
      this.urlParams();
    },
    changeCurrentMonth() {
      this.currentDate = new Date();
      this.urlParams();
    },
    modalOpen() {
      this.$vm2.open("modalToRegistSchedule");
    },
    modalClose() {
      //this.clearInput(scheduleData);
      this.$vm2.close("modalToRegistSchedule");
    },
    /*
    clearInput() {
      this.inputDate = "";
      this.inputStartTime = "";
      this.inputEndTime = "";
      this.inputSchedule = "";
      console.log("クリア" + this.inputSchedule + "です");
    },
		*/
    urlParams() {
      const year = format(this.currentDate, "yyyy");
      const Month = format(this.currentDate, "MM");
      const newUrl = `${window.location.pathname}?year=${year}&month=${Month}`;
      window.history.pushState({ path: newUrl }, "", newUrl);
    },
    registerSchedule(scheduleData) {
      const newSchedule = {
        date: scheduleData.date,
        startTime: scheduleData.startTime,
        endTime: scheduleData.endTime,
        schedule: scheduleData.schedule,
      };
      this.rgistedSchedule.push(newSchedule);
      //this.clearInput();
      this.modalClose();
    },
    getSchedule(date) {
      const scheduleDate = this.rgistedSchedule.filter(
        (item) => item.date === date
      );
      if (scheduleDate) {
        console.log(scheduleDate);
      }

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
      this.currentDate = new Date(yearParam, monthParam - 1);
    }
  },
};
</script>
<style>
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
