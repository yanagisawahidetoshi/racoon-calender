<template>
  <component
    :is="tagName"
    v-bind:type="tagName === 'button' ? 'button' : null"
    @click="$emit('click')"
    class="btn"
    ><slot></slot
  ></component>
</template>
<script>
export default {
  name: "BaseButton",
  props: {
    tagName: {
      type: String,
      default: "button",
      validator(value) {
        return ["button", "a", "div", "span"].includes(value);
      },
    },
    type: {
      type: String,
      required: false, //button以外の場合もあるため
      default: "button",
    },
  },
};
</script>
<style scoped>
.btn {
  padding: 6px 12px;
  border: 1px solid #333;
  border-radius: 6px;
}
</style>
