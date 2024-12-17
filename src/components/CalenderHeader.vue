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
        <button type="button" @click="toggleScheduleModal(true)">登録</button>
      </li>
    </ul>
    <ScheduleModal
      :is-modal-open="isModalOpen"
      @closeModal="toggleScheduleModal(false)"
      @onRegisterSchedule="
        (newSchedule) => $emit('onRegisterSchedule', newSchedule)
      "
    />
  </div>
</template>

<script>
import { format } from "../libs/date-fns";
import ScheduleModal from "../components/ScheduleModal.vue";

export default {
  name: "CalenderHeader",
  components: { ScheduleModal },
  props: {
    currentDate: { type: Date, default: "" },
  },
  data() {
    return {
      isModalOpen: false,
    };
  },
  computed: {
    title() {
      console.log(this.currentDate);
      return format(this.currentDate, "yyyy年MM月");
    },
  },
  methods: {
    toggleScheduleModal(val) {
      this.isModalOpen = val;
    },
  },
};
</script>
