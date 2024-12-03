<template>
  <header class="header">
    <ul class="btnArea">
      <li>
        <BaseButton @click="$emit('changeMonth', -1)">&lt;</BaseButton>
      </li>
      <li>
        <BaseButton @click="$emit('onChange')">当月</BaseButton>
      </li>
      <li><BaseButton @click="$emit('changeMonth', 1)">&gt;</BaseButton></li>
    </ul>
    <div>{{ formatMonth(currentDate) }}</div>
    <BaseButton @click="openModal">登録</BaseButton>
    <CalenderRegisterModal @register="handleRegisterSchedule" />
  </header>
</template>
<script>
import { format } from "@/libs/date-util";
import BaseButton from "@/components/atoms/BaseButton/";
import CalenderRegisterModal from "@/components/molecules/CalenderRegisterModal/";

export default {
  name: "CalenderHeader",
  components: { BaseButton, CalenderRegisterModal },
  props: {
    currentDate: {
      type: Date,
      required: true,
    },
  },
  methods: {
    formatMonth(date) {
      return format(date, "yyyy年M月");
    },
    openModal() {
      this.isModalVisible = true;
      this.$vm2.open("scheduleRegister-modal");
    },
    handleRegisterSchedule(scheduleData) {
      this.$emit("register", scheduleData);
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
</style>
