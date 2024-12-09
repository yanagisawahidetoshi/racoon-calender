<template>
  <vue-modal-2 :name='modalName' @on-close="$emit('close')"> test 
  </vue-modal-2>
</template>

<script>
const MODAL_NAME = 'scheduleModal';
export default {
  name: "ScheduleModal",
  props: {
    isModalOpen: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return{
      modalName: MODAL_NAME,
    }
  },
  watch: {
    isModalOpen: function(flag) {
      if (flag) {
        this.$vm2.open(MODAL_NAME);
      }else{
        this.$vm2.close(MODAL_NAME);
      }
    }
  },
};
</script>