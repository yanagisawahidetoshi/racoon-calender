<template>
  <vue-modal-2 v-if="isModalOpen" name="scheduleModal"> test 
    <!-- <button @click="$emit('close')">閉じる</button> -->
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
  // computed: {
  //   modalOpening(){
  //     モーダルが開いているかどうかを監視
  //   },
  // },
};
</script>