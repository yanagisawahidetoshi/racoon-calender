<template>
  <div>
    <h1>{{ title }}</h1>
    <ul>
      <li>
        <button type="button" @click="$emit('changeToPrevMonth')">先月</button>
      </li>
      <li>
        <button type="button" @click="$emit('changeCurrentMonth')">当月</button>
      </li>
      <li>
        <button type="button" @click="$emit('changeToNextMonth')">翌月</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { format } from "../libs/date-fns";

export default {
  name: "CalenderHeader",
  props: {
    currentDate: { type: Date },
  },
  computed: {
    title() {
      console.log(this.currentDate);
      return format(this.currentDate, "yyyy年MM月");
    },
  },
};
</script>
