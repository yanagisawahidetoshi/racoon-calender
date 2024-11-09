<template>
  <input
    type="time"
    :value="inputTime"
    @input="$emit('input', $event.target.value)"
  />
</template>
<script>
export default {
  props: {
    value: {
      type: String,
    },
  },
  data() {
    return {
      time: "",
    };
  },
  computed: {
    inputTime: {
      get() {
        return this.value;
      },
      set(newValue) {
        this.time = newValue;
      },
    },
  },
};
</script>
