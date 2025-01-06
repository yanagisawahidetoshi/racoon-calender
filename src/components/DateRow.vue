<template>
  <div>
    <p>{{ formatDate(date) }}</p>
    <p v-for="schedule in schedules" :key="schedule.id">
      <button>
        {{ schedule.content }} ({{ schedule.startTime }} -
        {{ schedule.endTime }})
      </button>
    </p>
    <ScheduleModal
      v-if="false"
      :isModalOpen="isModalOpen"
      @close="closeScheduleModal"
      @onSubmit="$emit('onSubmit', $event)"
      modalName="editModal"
    />
  </div>
</template>
<script>
import { format } from "../libs/date-fns";
import ScheduleModal from "../components/ScheduleModal.vue";
export default {
  name: "DateRow",
  props: {
    date: { type: Date },
    schedules: {
      type: Array,
    },
  },
  components: { ScheduleModal },
  methods: {
    formatDate(date) {
      return format(date, "MM月dd日");
    },
  },
};
</script>
