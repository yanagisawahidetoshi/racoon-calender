<template>
  <vue-modal-2
    :name="modalName"
    @on-close="$emit('close')"
    :headerOptions="{ title: 'スケジュール登録' }"
    :footerOptions="{
      btn1: 'キャンセル',
      btn2: '登録',
      btn2OnClick: () => {
        handleSubmit();
      },
      btn1OnClick: () => {
        handleClose();
      },
    }"
  >
    <!-- <input
      type="date"
      @input="updateScheduleDate($event.target.value)"
    /> -->
    <input 
      type="date" 
      name="date" 
      v-model="schedule.date"
    /><br>
    <input 
      type="time" 
      name="startTime" 
      v-model="schedule.startTime"
    /><br>
    <input 
      type="time" 
      name="endTime" 
      v-model="schedule.endTime"
    /><br>
    <textarea 
      type="text" 
      name="content" 
      v-model="schedule.content"
    ></textarea>
    <!-- <input
      v-model="scheduleContent"
      @input="updateScheduleContent"
      placeholder="内容を入力"
    /> -->
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
    headerOptions: {
      type: Object,
    },
    footerOptions: {
      type: Object,
    },
  },
  data() {
    return {
      modalName: MODAL_NAME,
      schedule: {
        id: "",
        date: "",
        startTime: "",
        endTime: "",
        content: "",
      },
      // scheduleContent: "",
    };
  },
  watch: {
    isModalOpen: function(flag) {
      if (flag) {
        this.$vm2.open(MODAL_NAME);
      }else{
        this.$vm2.close(MODAL_NAME);
      }
    },
  },
  methods: {
    handleClose() {
      this.$vm2.close(MODAL_NAME);
    },
    handleSubmit() {
      this.$emit("onSubmit", this.schedule);
      this.$vm2.close(MODAL_NAME);
    }
    // updateScheduleDate(value) {
    //   this.$emit("updateScheduleDate", value);
    // },
    // updateScheduleContent() {
    //   this.$emit("updateScheduleContent", this.scheduleContent);
    // }
  },
};
</script>
