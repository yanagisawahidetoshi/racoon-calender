<template>
  <input
    type="date"
    :value="value"
    @input="$emit('input', $event.target.value)"
  />
</template>

<script>
export default {
  name: "InputDate",
  components: {},
  props: {
    value: {
      default: "",
    },
  },
};
</script>
