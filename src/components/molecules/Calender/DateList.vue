<template>
  <section class="block">
    <ol class="list">
      <li class="detail" v-for="(date, index) in currentMonth" :key="index">
        <CalenderDate
          :date="date"
          :schedules="filterSchedules(date)"
          @onToggleModalEditSchedule="toggleModalEditSchedule"
        />
      </li>
    </ol>
    <ModalSchedule
      @onToggleModalSchedule="toggleModalEditSchedule"
      @onSchedule="(newSchedule) => $emit('onSchedule', newSchedule)"
      :schedule="
        schedules.find((schedule) => schedule.id === editingScheduleId)
      "
      :isModalOpen="isModalEditScheduleOpen"
      :modalName="'modalEditSchedule'"
      :modalTitle="'予定の編集'"
      :modalBtnName="'編集'"
    />
  </section>
</template>

<script>
import CalenderDate from "./Date.vue";
import ModalSchedule from "./ModalSchedule.vue";
import { isSameDay } from "../../../libs/date-util";
export default {
  name: "DateList",
  components: { CalenderDate, ModalSchedule },
  props: {
    currentMonth: Array,
    schedules: Array,
  },
  data() {
    return {
      isModalEditScheduleOpen: false,
      editingScheduleId: Number,
    };
  },
  methods: {
    filterSchedules(date) {
      const schedules = this.schedules.filter((v) => {
        return isSameDay(date, v.dateValue);
      });
      return schedules;
    },
    toggleModalEditSchedule(val, id) {
      this.isModalEditScheduleOpen = val;
      this.editingScheduleId = id;
    },
  },
};
</script>

<style>
.block {
  margin: 30px 0;
}
.list .detail {
  margin-bottom: 8px;
}
</style>
