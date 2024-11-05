<template>
  <header class="common_header">
    <div class="wrap_button">
      <BaseButton @click="changeDate(-1)">前月</BaseButton>
      <BaseButton @click="changeCurrentMonth()">当月</BaseButton>
      <BaseButton @click="changeDate(1)">翌月</BaseButton>
      <BaseButton @click="$vm2.open('registScheduleModal')">登録</BaseButton>
      <!--vue-modal-2はグローバルに提供されている-->
    </div>
    <vue-modal-2
      @on-close="$vm2.close('registScheduleModal')"
      name="registScheduleModal"
      :headerOptions="{
        title: '予定を登録',
      }"
      :footerOptions="{
        btn1: 'キャンセル',
        btn2: '登録',
        btn2Style: {
          backgroundColor: 'green',
        },
        btn1OnClick: () => {
          $vm2.close('registScheduleModal');
        },
      }"
    >
      <div class="wrap_input">
        <dl class="input_col">
          <dt class="input_title">日付</dt>
          <dd><InputDate v-model="dateValue" /></dd>
        </dl>
        <dl class="input_col">
          <dt class="input_title">開始時間</dt>
          <dd><InputTime v-model="startTimeValue" /></dd>
        </dl>
        <dl class="input_col">
          <dt class="input_title">終了時間</dt>
          <dd><InputTime v-model="endTimeValue" /></dd>
        </dl>
      </div>
    </vue-modal-2>
  </header>
</template>

<script>
import BaseButton from "@/components/atoms/BaseButton.vue";
import InputDate from "@/components/atoms/InputDate.vue";
import InputTime from "@/components/atoms/InputTime.vue";
export default {
  name: "CalenderHeader",
  components: { BaseButton, InputDate, InputTime },
  props: {
    changeDate: () => {},
    changeCurrentMonth: () => {},
  },
};
</script>

<style scoped>
.common_header {
  padding-bottom: 10px;
  border-bottom: 1px solid #999;
  margin-bottom: 20px;
}
.wrap_button {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
}
.wrap_input {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 0 10px;
}
.input_col {
  display: flex;
  align-items: center;
}
.input_title:after {
  content: "：";
}
</style>
