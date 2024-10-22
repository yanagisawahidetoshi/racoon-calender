<template>
  <input type="text" :value="value" @input="updateText($event)" />
</template>
<script>
export default {
  name: "InputText",
  props: {
    value: {
      type: String,
    },
  },
  methods: {
    updateText(e) {
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
