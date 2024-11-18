<template>
  <component
    :is="tagName"
    v-bind:type="tagName === 'button' ? 'button' : null"
    v-bind:class="className !== '' ? className : defaultClass"
    @click="$emit('click')"
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
    className: {
      type: String,
      default: "",
    },
    defaultClass: {
      type: String,
      default: "btn",
    },
  },
};
</script>
<style scoped>
.btn {
  padding: 6px 12px;
  border: 1px solid #8f8f8f;
  border-radius: 6px;
}
</style>
