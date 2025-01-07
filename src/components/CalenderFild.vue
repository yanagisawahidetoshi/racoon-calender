<template>
  <div>
    <ol class="day-Week">
      <li v-for="(day, index) in daysOfWeek" :key="index">
        {{ day }}
      </li>
    </ol>
    <ol class="date-list">
      <li v-for="(n, index) in calendar" :key="index">
        <DateField
          v-show="isModalOpen"
          :date="n.date"
          :day="n.day"
          :schedules="getSchedule(n.date)"
          @editModalOpen="editModalOpen"
        />
      </li>
    </ol>
    <ScheduleRegistModal
      :isModalOpen="isModalOpen"
      :targetSchedule="targetSchedule"
      @onSubmit="updatedSchedule($event)"
      @modalClose="modalClose"
    />
  </div>
</template>

<script>
import DateField from "./DateField";
import ScheduleRegistModal from "./ScheduleRegistModal";
export default {
  name: "CalenderFild",
  components: {
    DateField,
    ScheduleRegistModal,
  },
  props: {
    daysOfWeek: {
      type: Array,
      required: true,
    },
    calendar: {
      type: Array,
      required: true,
    },
    schedules: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isModalOpen: false,
      isEditType: false,
      targetSchedule: null,
      scheduleId: "",
    };
  },
  methods: {
    getSchedule(date) {
      const schedules = this.schedules.filter((item) => item.date === date);
      return schedules.sort((a, b) => {
        const startTimeA = a.startTime;
        const startTimeB = b.startTime;

        // 文字列として比較
        if (startTimeA < startTimeB) return -1;
        if (startTimeA > startTimeB) return 1;
        return 0;
      });
    },
    editModalOpen(scheduleId) {
      this.targetScheduleId = scheduleId;
      this.targetSchedule = this.schedules.find(
        (schedule) => schedule.id === scheduleId
      );
      this.isModalOpen = true;
    },
    modalClose() {
      this.isModalOpen = false;
    },
    updatedSchedule(scheduleData) {
      this.$emit("updatedSchedule", scheduleData);
      this.modalClose();
    },
  },
};
</script>
