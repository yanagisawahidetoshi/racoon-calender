<template>
  <vue-modal-2 v-if="isModalOpen" name="scheduleModal"> test </vue-modal-2>
</template>

<script>
export default {
  name: "ScheduleModal",
  props: {
    isModalOpen: {
      type: Boolean,
    },
  },
  mounted() {
    this.$vm2.open("scheduleModal");
  },
};
</script>
