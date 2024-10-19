<template>
  <input
    type="text"
    :value="input"
    @input="$emit('input', $event.target.value)"
  />
</template>
<script>
export default {
  data() {
    return {
      input: "",
    };
  },
};
</script>
<style scoped></style>
