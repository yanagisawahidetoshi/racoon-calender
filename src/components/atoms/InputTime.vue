<template>
  <input
    type="time"
    :value="value"
    @input="$emit('input', $event.target.value)"
  />
</template>

<script>
export default {
  name: "InputTime",
  components: {},
  props: {
    value: {
      type: String,
    },
  },
};
</script>
