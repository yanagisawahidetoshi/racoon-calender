<template>
  <vue-modal-2 name="scheduleModal" @on-close="$emit('close')"> test 
  </vue-modal-2>
</template>

<script>
export default {
  name: "ScheduleModal",
  props: {
    isModalOpen: {
      type: Boolean,
      required: true,
    },
  },
  watch: {
    isModalOpen: function(flag) {
      if (flag === true) {
        this.$vm2.open("scheduleModal");
      }else{
        this.$vm2.close("scheduleModal");
      }
    }
  },
};
</script>