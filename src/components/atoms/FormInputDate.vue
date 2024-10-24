<template>
  <input
    type="date"
    :value="date"
    @input="$emit('input', $event.target.value)"
  />
</template>
<script>
export default {
  data() {
    return {
      date: "",
    };
  },
};
</script>
<style lang="scss"></style>
