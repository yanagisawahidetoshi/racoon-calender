<template>
  <div id="app">
    <ul>
      <li><button @click="changeMonth(-1)">prev</button></li>
      <li><button @click="changeToCurrentMonth()">current</button></li>
      <li><button @click="changeMonth(1)">next</button></li>
    </ul>
    <ol>
      <li v-for="(date, index) in dates" :key="index">
        <p>{{ formatDate(date, 'MM/dd EEEE') }}</p>
      </li>
    </ol>
  </div>
</template>

<script>
import {
  startOfMonth,
  lastOfMonth,
  getEachDateOfMonth,
  changeMonth,
  changeToCurrentMonth,
  formatDate,
  parse
} from "./libs/date-fns";

export default {
  name: "App",
  components: {},
  data() {
    return{
      baseDate: new Date(),
    }
  },
  computed: {
    dates(){
      const startDate = startOfMonth(this.baseDate);
      const lastDate = lastOfMonth(this.baseDate);
      return getEachDateOfMonth(startDate, lastDate);
    }
  },
  methods: {
    formatDate(date, setting){
      return formatDate(date, setting);
    },
    changeToCurrentMonth() {
      this.baseDate = changeToCurrentMonth();
    },
    changeMonth(num) {
      this.baseDate = changeMonth(this.baseDate, num);
    },
  },
  mounted(){
    // ~/{西暦４桁}/{月1or2桁} を判断する正規表現。どんなURLにも対応できるように
    const currentUrl = window.location.href;
    const matchUrl = currentUrl.match(/https?:\/\/.+\/(\d{4})\/(\d{1,2})/);
    const inputedDate = matchUrl[1] + '/' + matchUrl[2];
    
    this.baseDate = parse(inputedDate, "yyyy/MM");
  }
};
</script>
