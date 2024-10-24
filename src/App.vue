<template>
  <div>
    <div class="menu">
      <Button @click="chengeMonth(-1)" className="arrow-left"></Button>
      <Button @click="chengeMonth(1)" className="arrow-right"></Button>
      <span class="nowMonth">{{ dispDate }}</span>
      <Button @click="$vm2.open('modal-1')" tagName="a" className="regist">
        登録
      </Button>
      <Button @click="currentMonth()">当月</Button>
    </div>
    <vue-modal-2
      name="modal-1"
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
          $vm2.close('modal-1');
        },
      }"
    >
      <div class="input-wrap">
        {{ /* input:text */ }}
        <p>
          <InputText v-model="inputText" placeholder="予定を入力" />
        </p>
        {{ /* input:date */ }}
        <p>
          <InputDate v-model="inputDate" />
        </p>
        {{ /* input:time */ }}
        <p>開始時間：<InputTime v-model="inputTime" /></p>
        <p>終了時間：<InputTime v-model="inputTime" /></p>
      </div>
    </vue-modal-2>

    {{ /* 日付と曜日を出力 */ }}
    <ol class="date-list">
      <li v-for="(n, index) in calendar" :key="index">
        {{ n.date }}({{ n.day }})
      </li>
    </ol>
    <input type="text" />
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
import Button from "./components/Button/";
import InputText from "./components/InputText/";
import InputDate from "./components/InputDate/";
import InputTime from "./components/InputTime/";

export default {
  name: "app",
  components: {
    Button,
    InputText,
    InputDate,
    InputTime,
  },

  data() {
    return {
      currentDate: new Date(),
      daysOfWeek: ["日", "月", "火", "水", "木", "金", "土"],
      inputText: "",
      inputDate: "",
      inputTime: "",
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
        date: format(days, "dd日"),
        day: this.daysOfWeek[getDay(days)],
      }));
    },
  },
  methods: {
    chengeMonth(addDate) {
      this.currentDate = addMonths(this.currentDate, addDate);
    },
    currentMonth() {
      this.currentDate = new Date();
    },
    open() {
      this.$vm2.open("modal-1");
    },
    close() {
      this.$vm2.close("modal-1");
    },
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
.menu {
  position: sticky;
  background: #fff;
  top: 0;
  border-bottom: 2px solid #333;
  padding: 0 0 12px;
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
.arrow-left,
.arrow-right {
  margin: 0 6px;
}
.nowMonth {
  font-size: 18px;
  vertical-align: middle;
  font-weight: 500;
  margin: 0 0 0 16px;
  display: inline-block;
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
.arrow-left {
  display: inline-block;
  width: 0.6rem;
  height: 0.6rem;
  margin: 0 10px;
  border-left: 2px solid #000;
  border-bottom: 2px solid #000;
  transform: rotate(45deg);
}
.arrow-right {
  display: inline-block;
  width: 0.6rem;
  height: 0.6rem;
  margin: 0 10px;
  border-top: 2px solid #000;
  border-right: 2px solid #000;
  transform: rotate(45deg);
}
.regist {
  vertical-align: -4px;
  margin: 0 6px;
}
</style>
