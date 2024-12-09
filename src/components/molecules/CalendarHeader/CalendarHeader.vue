<template>
  <header>
    <ul>
      <li><button @click="$emit('changeMonth', -1)">prev</button></li>
      <li><button @click="$emit('changeToCurrentMonth')">current</button></li>
      <li><button @click="$emit('changeMonth', 1)">next</button></li>
      <li>
        <button type="button" @click="openScheduleModal">登録</button>
      </li>
    </ul>
    <ScheduleModal
      :isModalOpen="isModalOpen"
      @close="closeScheduleModal" />
  </header>
</template>

<script>
import ScheduleModal from "../ScheduleModal/ScheduleModal.vue";
export default {
  name: "CalendarHeader",
  components: { ScheduleModal },
  props: {
    baseDate: {
      type: Date,
      required: true,
    },
  },
  data() {
    return {
      isModalOpen: false,
    };
  },
  methods: {
    openScheduleModal() {
      this.isModalOpen = true;
      this.$vm2.open("scheduleModal");
    },
    closeScheduleModal() {
      this.isModalOpen = false;
      this.$vm2.close("scheduleModal");
    },
  },
}
</script>