<template>
  <div>
    <CalenderHeader
      :dispDate="dispDate"
      @changeMonth="changeMonth"
      @changeCurrentMonth="changeCurrentMonth"
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
  mounted() {
    /*
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
    */
    // 課題 正規表現
    //const currentUrl = window.location.href;
    //const url = new URL(currentUrl);
    const currentPath = window.location.pathname;
    //console.log(currentPath);
    const matchDate = currentPath.match(/^\/(\d{4})\/(0?[1-9]|1[0-2])\/?$/);
    //console.log(matchDate);
    if (matchDate) {
      //const year = matchDate[1];
      //const month = matchDate[2];
      //console.log(`年: ${year}, 月: ${month}`);

      this.currentDate = format(
        new Date(`${matchDate[1]} / ${matchDate[2]}`),
        "yyyy/MM"
      );

      //console.log(this.currentDate);
    } else {
      // console.log("NG: マッチしません。");
      this.currentDate = new Date();
    }
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
    urlParams() {
      const year = format(this.currentDate, "yyyy");
      const Month = format(this.currentDate, "MM");
      //const newUrl = `${window.location.pathname}?year=${year}&month=${Month}`;
      //console.log(window.location.origin);
      const newUrl = `${window.location.origin}/${year}/${Month}/`;
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
    },
    getSchedule(date) {
      const scheduleDate = this.rgistedSchedule.filter(
        (item) => item.date === date
      );
      return scheduleDate ? scheduleDate : null;
    },
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
