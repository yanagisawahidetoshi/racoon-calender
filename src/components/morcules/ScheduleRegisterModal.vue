<template>
  <vue-modal-2
    name="modal-add-schedule"
    @on-close="closeModalAddSchedule"
    :headerOptions="{
      title: '予定を登録',
    }"
    :footerOptions="{
      btn1: 'キャンセル',
      btn2: '登録',
      btn1OnClick: () => {
        $vm2.close('modal-add-schedule');
      },
      btn2OnClick: () => {
        register();
      },
    }"
  >
    <div>
      <p class="schedule-text"><FormInput v-model="schedule.content" /></p>
      <p><FormInputDate v-model="schedule.inputDate" /></p>
      <p>開始時間<FormInputTime v-model="schedule.inputStartTime" /></p>
      <p>終了時間<FormInputTime v-model="schedule.inputFinishTime" /></p>
    </div>
  </vue-modal-2>
</template>
<script>
import FormInput from "@/components/atoms/FormInput";
import FormInputDate from "@/components/atoms/FormInputDate";
import FormInputTime from "@/components/atoms/FormInputTime";

export default {
  name: "ScheduleRegisterModal",
  components: {
    FormInput,
    FormInputDate,
    FormInputTime,
  },
  data() {
    return {
      schedule: {
        content: "",
        inputDate: "",
        inputStartTime: "",
        inputFinishTime: "",
      },
    };
  },
  methods: {
    closeModalAddSchedule() {
      this.$vm2.close("modal-add-schedule");
    },
    register() {
      this.$emit("registered", {
        content: this.schedule.content,
        inputDate: this.schedule.inputDate,
        inputStartTime: this.schedule.inputStartTime,
        inputFinishTime: this.schedule.inputFinishTime,
      });
      this.$vm2.close("modal-add-schedule");
      // モーダル閉じたときに入力値をリセットしたいが下層コンポーネントの値が変わらなかった
      // リセットしないとchangeイベントが発火せず、前回と同じ値の項目は入力されない。11/7で登録→再度11/7が入力されたまま→登録ボタン押すと、日付は空扱いされる
      Object.keys(this.schedule).forEach((key) => {
        this.schedule[key] = "";
      });
    },
  },
};
</script>
