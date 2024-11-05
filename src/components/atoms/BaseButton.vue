<template>
  <button class="button" @click="$emit('click')" :type="type"><slot /></button>
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
};
</script>

<style scoped>
.button {
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(240, 240, 240);
  font-size: 15px;
  border-radius: 4px;
  border: 1px solid black;
}
</style>
