<template>
  <input type="time" :value="value" @input="updateTime($event)" />
</template>
<script>
export default {
  name: "InputTime",
  props: {
    value: {
      type: String,
    },
  },
  methods: {
    updateTime(e) {
      this.$emit("input", e.target.value);
    },
  },
};
</script>
<style scoped>
input {
  border: 1px solid #ccc;
  padding: 0.5em;
}
</style>
