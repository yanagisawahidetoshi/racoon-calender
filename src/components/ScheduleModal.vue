<template>
  <vue-modal-2 :name="name" @on-close="handleClose"> test </vue-modal-2>
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
    return { name: MODAL_NAME };
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
      this.$emit("closeModal");
    },
  },
};
</script>
