<template>
  <input type="date" :value="value" @input="updateDate($event)" />
</template>
<script>
export default {
  name: "InputDate",
  props: {
    value: {
      type: String,
    },
  },
  methods: {
    updateDate(e) {
      this.$emit("input", e.target.value);
    },
  },
};
</script>
<style scoped>
input {
  border: 1px solid #ccc;
  padding: 5px;
}
</style>
