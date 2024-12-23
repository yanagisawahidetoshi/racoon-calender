<template>
  <div>
    <vue-modal-2
      :name="modalName"
      :headerOptions="{
        title:
          targetSchedule && targetSchedule.id ? '予定を編集' : '予定を登録',
      }"
      :footerOptions="{
        btn1: 'キャンセル',
        btn2: targetSchedule && targetSchedule.id ? '更新' : '登録',
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
          this.handleSubmit();
        },
      }"
      @on-close="modalClose()"
    >
      <div class="input-wrap">
        {{ /* input:text */ }}
        <p>
          <InputText v-model="editSchedule.schedule" placeholder="予定を入力" />
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
      editSchedule: {
        id: "",
        date: "",
        startTime: "",
        endTime: "",
        schedule: "",
      },
      modalName: "",
    };
  },
  watch: {
    isModalOpen(isOpen) {
      this.modalName =
        this.targetSchedule && this.targetSchedule.id
          ? "editModal"
          : "registModal";
      this.debug(this.targetSchedule);
      if (isOpen) {
        // データが更新後に処理（$nextTick）
        this.$nextTick(() => {
          this.$vm2.open(this.modalName);
          if (this.targetSchedule) {
            this.editSchedule = { ...this.targetSchedule };
          }
        });
      } else {
        this.$vm2.close(this.modalName);
      }
    },
  },

  methods: {
    modalClose() {
      this.$emit("modalClose");
    },
    handleSubmit() {
      const scheduleData = { ...this.editSchedule };
      this.$emit("onSubmit", scheduleData);
    },
  },
};
</script>
