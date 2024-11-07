<template>
  <input
    type="text"
    :value="textValue"
    @input="$emit('input', $event.target.value)"
    :placeholder="placeholder"
    class="inputText"
  />
</template>

<script>
export default {
  name: "InputText",
  props: {
    textValue: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
  },
};
</script>
<style scoped>
.inputText {
  padding: 6px 12px;
  border: 1px solid #333;
  border-radius: 6px;
}
</style>
