<template>
  <div>
    <button type="button" @click="$emit('changeMonth', -1)">前月</button>
    <button type="button" @click="$emit('changeToCurrentMonth')">当月</button>
    <button type="button" @click="$emit('changeMonth', 1)">翌月</button>
    <h1>{{ format(currentDate, "yyyy/MM") }}</h1>
    <InputDate />
    <InputTime />
    <InputText />
  </div>
</template>

<script>
import { format } from "../../libs/date-util.js";
import InputDate from "../atoms/InputDate";
import InputText from "../atoms/InputText";
import InputTime from "../atoms/InputTime";
export default {
  name: "CalenderHeader",
  components: { InputDate, InputText, InputTime },
  props: {
    currentDate: {
      type: Date,
    },
    inputDate: {
      type: String,
    },
    inputText: {
      type: String,
    },
    inputTime: {
      type: String,
    },
  },
  methods: {
    format(date, pattern) {
      return format(date, pattern);
    },
  },
};
</script>
