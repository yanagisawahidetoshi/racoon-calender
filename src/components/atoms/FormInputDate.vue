<template>
  <input
    type="date"
    :value="date"
    @change="$emit('change', $event.target.value)"
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
