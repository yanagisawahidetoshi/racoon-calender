<template>
  <header>
    <ul>
      <li><button @click="$emit('changeMonth', -1)">prev</button></li>
      <li><button @click="$emit('changeToCurrentMonth')">current</button></li>
      <li><button @click="$emit('changeMonth', 1)">next</button></li>
    </ul>
  </header>
</template>

<script>
export default {
  name: "CalendarHeader",
  props: {
    baseDate: {
      type: Date,
      required: true,
    },
  },
}
</script>