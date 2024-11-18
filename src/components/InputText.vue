<template>
  <input
    type="text"
    :value="value"
    :placeholder="placeholder"
    class="inputText"
    @input="valueText($event.target.value)"
  />
</template>

<script>
export default {
  name: "InputText",
  props: {
    value: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
  },
  methods: {
    valueText(inputValue) {
      this.$emit("input", inputValue);
    },
  },
};
</script>
<style>
.inputText {
  padding: 6px 12px;
  border: 1px solid #333;
  border-radius: 6px;
}
</style>
