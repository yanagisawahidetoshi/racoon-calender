<template>
  <div class="wrap_date">
    <div>{{ formatDate(date, "do（E）") }}</div>
    <template v-for="(schedule, index) in schedules">
      <div :key="index" class="schedule">
        <template v-if="!schedule.isEdit">
          <div class="time">
            {{ schedule.startTimeValue }} ～ {{ schedule.endTimeValue }}
          </div>
          <BaseButton @click="$emit('toggleEdit', schedule)">編集</BaseButton>
        </template>
        <template v-else-if="schedule.isEdit">
          <div class="time edit">
            <InputTime v-model="schedule.startTimeValue" />
            <InputTime v-model="schedule.endTimeValue" />
          </div>
          <BaseButton
            @click="
              completeEdit(
                schedule.startTimeValue,
                schedule.endTimeValue,
                schedule.id
              )
            "
            >完了</BaseButton
          >
        </template>
      </div>
    </template>
    <!-- 年月日が一致すれば該当オブジェクトの時間を表示 -->
  </div>
</template>

<script>
import { format } from "../../../libs/date-util";
import BaseButton from "@/components/atoms/BaseButton.vue";
import InputTime from "@/components/atoms/InputTime.vue";
export default {
  name: "CalenderDate",
  components: { BaseButton, InputTime },
  props: {
    date: {
      type: Date,
    },
    schedules: {
      type: Array,
    },
  },
  methods: {
    formatDate(date, f) {
      return format(date, f);
    },
    completeEdit(startTimeValue, endTimeValue, id) {
      this.$emit("updateSchedule", {
        dateValue: this.date,
        startTimeValue: startTimeValue,
        endTimeValue: endTimeValue,
        isEdit: false,
        id: id,
      });
    },
  },
};
</script>
<style scoped>
.wrap_date {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.time {
  margin-right: 5px;
}
.edit {
  display: flex;
  gap: 8px;
}
.schedule {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: 10px;
}
.schedule:before {
  content: "・";
}
</style>
