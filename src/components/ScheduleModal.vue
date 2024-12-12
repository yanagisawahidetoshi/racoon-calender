<template>
  <vue-modal-2
    :name="name"
    @on-close="handleClose"
    :footerOptions="{
      btn2OnClick: () => {
        handlerRegister();
      },
    }"
  >
    <input type="text" v-model="schedule.content" />
    <input type="date" v-model="schedule.date" />
    <input type="time" v-model="schedule.startTime" />
    <input type="time" v-model="schedule.finishTime" />
  </vue-modal-2>
</template>

<script>
const MODAL_NAME = "scheduleModal";
export default {
  name: "ScheduleModal",
  props: {
    isModalOpen: {
      type: Boolean,
    },
  },
  data() {
    return {
      name: MODAL_NAME,
      schedule: {
        content: "",
        date: "",
        startTime: "",
        finishTime: "",
      },
    };
  },
  watch: {
    isModalOpen(val) {
      if (val) {
        this.$vm2.open(MODAL_NAME);
      } else {
        this.$vm2.close(MODAL_NAME);
      }
    },
  },
  methods: {
    handleClose() {
      // close = modalだと分かるのでonCloseでもいいかも
      this.$emit("closeModal");
    },
    // onはイベントを通知する。$emitの中のイベントはonxxxとか 関数名はhandle..
    handlerRegister() {
      this.$emit("onRegisterSchedule", this.schedule);
    },
  },
};
</script>
