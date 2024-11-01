<template>
  <div id="app">
    <header class="header">
      <button class="pager" @click="changeMonth(-1)">＜</button>
      <!-- <li><button @click="changeToCurrentMonth()">current</button></li> -->
      <button class="pager" @click="changeMonth(1)">＞</button>
      <p class="currentMonth">{{ cuurentMonth }}</p>
      <button>登録</button>
    </header>
    <ol class="calender">
      <li class="date-container" v-for="(date, index) in dates" :key="index">
        <p class="date-num">{{ date.num }}</p>
        <p class="date-day">{{ date.day }}</p>
      </li>
    </ol>
  </div>
</template>

<script>
import {
  getStartOfMonth,
  getLastOfMonth,
  getEachDateAndDay,
  moveMonth,
  moveToCurrentMonth,
  formatYearAndDate,
} from "./libs/date-fns";

export default {
  name: "App",
  components: {},
  data() {
    return{
      today: new Date(),
    }
  },
  computed: {
    dates(){
      const startDate = getStartOfMonth(this.today);
      const lastDate = getLastOfMonth(this.today);
      return getEachDateAndDay(startDate, lastDate, 'd', 'E');
    },
    cuurentMonth(){
      return formatYearAndDate(this.today);
    }
  },
  methods: {
    changeToCurrentMonth() {
      this.today = moveToCurrentMonth();
    },
    changeMonth(num) {
      this.today = moveMonth(this.today, num);
    },
  }
};
</script>

<style>
.header{
  display: grid;
  grid-template-columns: 1rem 1rem 7.5rem 3rem;
  column-gap: 20px;
  padding: 8px;
  border-bottom: 2px solid #3c4043;
}
.calender{

}
.currentMonth{
  font-size: 22px;
  font-weight: 500;
}
.date-container{
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(1.5rem, 1fr));
  column-gap: 8px;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid gainsboro;
}
.date-num{
  font-size: 18px;
}
.date-day{
  font-size: 11px;
}
</style>