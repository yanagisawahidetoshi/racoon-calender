<template>
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
</template>
<script>
import InputText from "@/components/atoms/InputText/";
import InputDate from "@/components/atoms/InputDate/";
import InputTime from "@/components/atoms/InputTime/";
export default {
  name: "CalenderRegisterModal",
  components: { InputText, InputDate, InputTime },
  props: {},
  data() {
    return {
      inputText: "",
      inputDate: "",
      inputTime: "",
    };
  },
  methods: {
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
