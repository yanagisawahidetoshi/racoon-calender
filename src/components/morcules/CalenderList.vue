<template>
  <div>
    <ol class="calendar-list">
      <li v-for="(date, index) in calendar" :key="index" class="calendar-item">
        <CalenderRow
          :date="date"
          :schedules="filterScheduleByDate(date)"
          @onEditingSchedule="editSchedule"
        />
      </li>
    </ol>
    <ScheduleRegisterModal
      :editingSchedule="editingSchedule"
      :isModalOpen="isModalOpen"
      @registeredSchedule="upDateSchedules"
      modalName="modal-edit-schedule"
      button2Name="編集"
      @clickCloseButton="closeModal"
    />
  </div>
</template>
<script>
import CalenderRow from "@/components/atoms/CalenderRow";
import { format } from "../../libs/dateUtil.js";
import ScheduleRegisterModal from "@/components/morcules/ScheduleRegisterModal";

export default {
  name: "CalenderList",
  data() {
    return {
      isModalOpen: false,
      editIndex: null,
      editingSchedule: {
        id: "",
        content: "",
        date: "",
        startTime: "",
        finishTime: "",
      },
    };
  },
  props: {
    calendar: {
      type: Array,
    },
    schedules: {
      type: Array,
    },
  },
  components: {
    CalenderRow,
    ScheduleRegisterModal,
  },
  methods: {
    formatDate(date, pattern) {
      return format(date, pattern);
    },
    filterScheduleByDate(date) {
      const target = this.formatDate(date, "yyyy-MM-dd");
      return this.schedules.filter((schedule) => {
        return target === schedule.date;
      });
    },
    editSchedule(editingSchedule) {
      console.log(editingSchedule);
      this.editingSchedule = editingSchedule;
      this.editIndex = editingSchedule.id;
      this.isModalOpen = true;
    },
    upDateSchedules(newSchedule) {
      const newSchedules = this.schedules.map((schedule) => {
        return schedule.id === this.editIndex
          ? { ...newSchedule, id: schedule.id }
          : { ...schedule };
      });
      this.$emit("onUpdate", newSchedules);
    },
    closeModal() {
      this.isModalOpen = false;
    },
  },
};
</script>
<style>
.calendar-list {
  padding-left: 0;
}
.calendar-item {
  border-bottom: 1px solid #dadce0;
  padding: 16px;
}
</style>
