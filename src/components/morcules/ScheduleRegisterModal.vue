<template>
  <vue-modal-2
    name="modal-add-schedule"
    @on-close="closeModalAddSchedule"
    :footerOptions="{
      btn1: '登録',
      btn2: 'キャンセル',
      btn2OnClick: () => {
        $vm2.close('modal-add-schedule');
      },
    }"
  >
    <div>
      <p>予定を変更</p>
      <p><FormInputDate v-model="inputDate" /></p>
      <p>開始時間<FormInputTime v-model="inputTime" /></p>
      <p>終了時間<FormInputTime v-model="inputTime" /></p>
    </div>
  </vue-modal-2>
</template>
<script>
import FormInputDate from "@/components/atoms/FormInputDate";
import FormInputTime from "@/components/atoms/FormInputTime";

export default {
  name: "ScheduleRegisterModal",
  components: {
    FormInputDate,
    FormInputTime,
  },
  methods: {
    closeModalAddSchedule() {
      this.$vm2.close("modal-add-schedule");
    },
  },
};
</script>
