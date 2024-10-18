<template>
  <div>
    <Button @click="previousMonth()" class="btn">前月</Button>
    <span>{{ dispDate }}</span>
    <Button @click="nextMonth()" class="btn">次月</Button>
    <Button @click="currentMonth()" class="btn">当月</Button>

    <div class="input-wrap">
      {{ /* input:text */ }}
      <InputText v-model="inputText" placeholder="テキストを入力" />
      {{ /* input:date */ }}
      <InputDate v-model="inputDate" />
      {{ /* input:time */ }}
      <InputTime v-model="inputTime" />
    </div>
    {{ /* 日付と曜日を出力 */ }}
    <ol>
      <li v-for="(n, index) in calendar" :key="index">
        {{ n.date }}({{ n.day }})
      </li>
    </ol>
    <input type="text" />
  </div>
</template>

<script>
// 1.初回表示時は当月日がを表示する
// 2.年月用の変数を用意（入れ替えることで、月初、月末の取得を動的に行う）
// 3.date-fnsに年月の算出が出来る関数があれば利用、なければ計算用のロジックを考える。
// 4.当月・次月・前月のボタンで、年月の変数を切り替える（値を入れ替える？）
//   ボタンは使いまわしが出来そうなのでコンポーネント化
// 5.日・曜日は再算出（関数利用）用の、computedを用意
//   表示用の年月もここで処理
// 6.ボタン操作用のmethodsを用意
// 7.dateに、年月日用の変数を定義。日本語用の曜日を定義
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  getDay,
  addMonths,
} from "date-fns";
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
      const SOM = startOfMonth(this.currentDate);
      const EOM = endOfMonth(this.currentDate);
      return eachDayOfInterval({
        start: new Date(SOM),
        end: new Date(EOM),
      }).map((days) => ({
        date: format(days, "dd日"),
        day: this.daysOfWeek[getDay(days)],
      }));
    },
  },
  methods: {
    previousMonth() {
      this.currentDate = addMonths(this.currentDate, -1);
    },
    nextMonth() {
      this.currentDate = addMonths(this.currentDate, 1);
    },
    currentMonth() {
      this.currentDate = new Date();
    },
  },
  /*
  data() {
    const currentDate = new Date();
    const SOM = startOfMonth(currentDate);
    const EOM = endOfMonth(currentDate);
    // 曜日追加
    const daysOfWeek = ["日", "月", "火", "水", "木", "金", "土"];
    const calendar = eachDayOfInterval({
      start: new Date(SOM),
      end: new Date(EOM),
    }).map((day) => ({
      date: format(day, "dd"),
      day: daysOfWeek[getDay(day)],
    }));
    //console.log(calendar);
    return {
      calendar,
    };
  },
	*/
};
</script>
<style scoped>
ol,
li {
  padding: 0;
  margin: 0;
  list-style: none;
}
.btn {
  margin: 0 6px;
}
.input-wrap {
  margin: 25px 0;
}
</style>
