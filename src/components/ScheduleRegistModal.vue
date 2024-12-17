<template>
  <div>
    <vue-modal-2
      name="modalToRegistSchedule"
      :headerOptions="{
        title: isEditType ? '予定を編集' : '予定を登録',
      }"
      :footerOptions="{
        btn1: 'キャンセル',
        btn2: isEditType ? '更新' : '登録',
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
      @on-close="modalClose()"
    >
      {{ /* 新規 */ }}
      <div class="input-wrap" v-show="!isEditType">
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
      {{ /* 編集 */ }}
      <div class="input-wrap" v-show="isEditType">
        {{ /* input:text */ }}
        <p>
          <InputText v-model="editSchedule.schedule" />
        </p>
        {{ /* input:date */ }}
        <p>
          <InputDate v-model="editSchedule.date" />
        </p>
        {{ /* input:time */ }}
        <p>開始時間：<InputTime v-model="editSchedule.startTime" /></p>
        <p>終了時間：<InputTime v-model="editSchedule.endTime" /></p>
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
  props: {
    isModalOpen: {
      type: Boolean,
      required: true,
    },
    isEditType: {
      type: Boolean,
      required: true,
    },
    targetSchedule: {
      type: Object,
      default: () => ({
        id: "",
        date: "",
        startTime: "",
        endTime: "",
        schedule: "",
      }),
    },
  },
  data() {
    return {
      inputSchedule: "",
      inputDate: "",
      inputStartTime: "",
      inputEndTime: "",
      editSchedule: {
        id: "",
        date: "",
        startTime: "",
        endTime: "",
        schedule: "",
      },
    };
  },
  watch: {
    isModalOpen(isOpen) {
      if (isOpen) {
        this.$vm2.open("modalToRegistSchedule");
        if (this.isEditType) {
          this.editSchedule = { ...this.targetSchedule };
        }
      } else {
        this.$vm2.close("modalToRegistSchedule");
      }
    },
  },
  methods: {
    modalClose() {
      this.clearInputs();
      this.$emit("modalClose");
    },
    submitRegist() {
      const scheduleData = this.isEditType
        ? { ...this.editSchedule }
        : {
            date: this.inputDate,
            startTime: this.inputStartTime,
            endTime: this.inputEndTime,
            schedule: this.inputSchedule,
          };
      if (this.isEditType) {
        this.$emit("updatedSchedule", scheduleData);
      } else {
        console.log(scheduleData);
        this.$emit("registerSchedule", scheduleData);
      }
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
