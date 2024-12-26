<template>
  <div>
    <ol>
      <DateRows :dates="dates" :schedules="schedules" />
    </ol>
  </div>
</template>
<script>
import DateRows from "./DateRows";

export default {
  name: "CalenderBody",
  props: {
    dates: {},
    schedules: {
      type: Array,
    },
  },
  components: {
    DateRows,
  },
};
</script>
