<template>
  <header>
    <ul>
      <li><button @click="$emit('changeMonth', -1)">prev</button></li>
      <li><button @click="$emit('changeToCurrentMonth')">current</button></li>
      <li><button @click="$emit('changeMonth', 1)">next</button></li>
      <li>
        <button type="button" @click="openScheduleModal">登録</button>
      </li>
    </ul>

    <!-- <p>{{ scheduleDate }}{{ scheduleContent }}</p> -->
    
    <ScheduleModal
      :isModalOpen="isModalOpen"
      @close="closeScheduleModal"
      @onSubmit="$emit('onSubmit', $event)"
    />
  </header>
</template>

<script>
import ScheduleModal from "../ScheduleModal/ScheduleModal.vue";
export default {
  name: "CalendarHeader",
  components: { ScheduleModal },
  data() {
    return {
      isModalOpen: false,
      scheduleDate: "",
      scheduleContent: "",
    };
  },
  methods: {
    openScheduleModal() {
      this.isModalOpen = true;
    },
    closeScheduleModal() {
      this.isModalOpen = false;
    },
    // setScheduleDate(date) {
    //   this.scheduleDate = date;
    // },
    // setScheduleContent(content) {
    //   this.scheduleContent = content;
    // },
    // onSubmit() {
    //   console.log(this.onSubmit);
    //   console.log(this.scheduleContent);
    // },
  },
};
</script>
