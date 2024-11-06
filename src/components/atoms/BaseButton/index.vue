<template>
  <button :type="type" @click="clickEvent">
    <slot></slot>
  </button>
</template>
<script>
export default {
  name: "BaseButton",
  props: {
    type: {
      type: String,
      default: "button",
    },
  },
  methods: {
    clickEvent() {
      this.$emit("click");
    },
  },
};
</script>
<style scoped>
button {
  padding: 0.5em;
  background-color: #ddd;
  border-radius: 3px;
}
</style>
