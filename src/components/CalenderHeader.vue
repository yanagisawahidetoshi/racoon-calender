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
      <li>
        <button type="button" @click="openScheduleModal">登録</button>
      </li>
    </ul>
    <ScheduleModal />
  </div>
</template>

<script>
import { format } from "../libs/date-fns";
import ScheduleModal from "../components/ScheduleModal.vue";

export default {
  name: "CalenderHeader",
  props: {
    currentDate: { type: Date },
  },
  components: { ScheduleModal },
  computed: {
    title() {
      console.log(this.currentDate);
      return format(this.currentDate, "yyyy年MM月");
    },
  },
  methods: {
    openScheduleModal() {
      this.$vm2.open("scheduleModal");
    },
    close() {
      this.$vm2.close("scheduleModal");
    },
  },
};
</script>
