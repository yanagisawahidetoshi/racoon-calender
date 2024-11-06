<template>
  <header class="header">
    <ul class="btnArea">
      <li>
        <BaseButton @click="$emit('changeMonth', -1)"> &lt; </BaseButton>
      </li>
      <li>
        <BaseButton @click="$emit('currentMonth')"> 当月 </BaseButton>
      </li>
      <li><BaseButton @click="$emit('changeMonth', 1)">&gt;</BaseButton></li>
    </ul>
    <div>{{ formatMonth(activeDate) }}</div>
    <BaseButton @click="openModal">登録</BaseButton>
    <vue-modal-2
      name="scheduleRegister-modal"
      :header-options="{
        title: '予定を登録',
      }"
      :footer-options="{
        btn1: 'キャンセル',
        btn2: '登録',
        btn2Style: {
          backgroundColor: 'green',
        },
        btn2OnClick: () => {
          doDelete();
        },
        btn1OnClick: () => {
          $vm2.close('scheduleRegister-modal');
        },
      }"
      class="scheduleRegister-modal"
      @on-close="closeModal"
    >
      <div class="scheduleRegister-content">
        <div>
          <InputText v-model="inputText" />
        </div>
        <div><InputDate v-model="inputDate" /></div>
        <div class="scheduleRegister-startTime">
          <span>開始時間</span><InputTime v-model="inputTime" />
        </div>
        <div class="scheduleRegister-endTime">
          <span>終了時間</span>
          <InputTime v-model="inputTime" />
        </div>
      </div>
    </vue-modal-2>
  </header>
</template>
<script>
import { format } from "@/libs/date-util";
import BaseButton from "@/components/atoms/BaseButton/";
import InputText from "@/components/atoms/InputText/";
import InputDate from "@/components/atoms/InputDate/";
import InputTime from "@/components/atoms/InputTime/";
export default {
  name: "CalenderHeader",
  components: { BaseButton, InputText, InputDate, InputTime },
  props: {
    activeDate: {
      type: Date,
      required: true,
    },
  },
  data() {
    return {
      inputText: "",
      inputDate: "",
      inputTime: "",
    };
  },
  methods: {
    formatMonth(date) {
      return format(date, "yyyy年M月");
    },
    closeModal() {
      this.isModalVisible = false;
      this.$vm2.close("scheduleRegister-modal");
    },
    openModal() {
      this.isModalVisible = true;
      this.$vm2.open("scheduleRegister-modal");
    },
  },
};
</script>
<style scoped>
.header {
  padding: 10px;
  border-bottom: 2px solid #333;
  display: flex;
  align-items: center;
  gap: 10px;
}
.btnArea {
  display: flex;
  align-items: center;
  gap: 10px;
}
.scheduleRegister-content {
  padding: 0 20px 0.6rem;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}
.scheduleRegister-startTime,
.scheduleRegister-endTime {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
}
</style>
