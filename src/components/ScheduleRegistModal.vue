<template>
  <div>
    <vue-modal-2
      name="modalToRegistSchedule"
      @on-close="modalClose()"
      :headerOptions="{
        title: '予定を登録',
      }"
      :footerOptions="{
        btn1: 'キャンセル',
        btn2: '登録',
        btn1Style: {
          backgroundColor: '#cccccc',
        },
        btn2Style: {
          backgroundColor: 'green',
        },
        btn1OnClick: () => {
          this.modalClose();
        },
        btn2OnClick: () => {
          this.submitRegist();
        },
      }"
    >
      <div class="input-wrap">
        {{ /* input:text */ }}
        <p>
          <InputText v-model="inputSchedule" placeholder="予定を入力" />
        </p>
        {{ /* input:date */ }}
        <p>
          <InputDate v-model="inputDate" />
        </p>
        {{ /* input:time */ }}
        <p>開始時間：<InputTime v-model="inputStartTime" /></p>
        <p>終了時間：<InputTime v-model="inputEndTime" /></p>
      </div>
    </vue-modal-2>
  </div>
</template>

<script>
import InputDate from "./InputDate";
import InputTime from "./InputTime";
import InputText from "./InputText";

export default {
  name: "ScheduleRegistModal",
  components: {
    InputDate,
    InputTime,
    InputText,
  },
  data() {
    return {
      inputSchedule: "",
      inputDate: "",
      inputStartTime: "",
      inputEndTime: "",
    };
  },
  methods: {
    modalClose() {
      this.$emit("inputDate", {
        date: this.inputDate,
        startTime: this.inputStartTime,
        endTime: this.inputEndTime,
        schedule: this.inputSchedule,
      });
      this.clearInputs();
    },
    submitRegist() {
      this.$emit("registerSchedule", {
        date: this.inputDate,
        startTime: this.inputStartTime,
        endTime: this.inputEndTime,
        schedule: this.inputSchedule,
      });
      this.clearInputs();
    },
    clearInputs() {
      this.inputSchedule = "";
      this.inputDate = "";
      this.inputStartTime = "";
      this.inputEndTime = "";
    },
  },
};
</script>
