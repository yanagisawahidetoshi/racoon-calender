<template>
  <div>
    <input
      type="text"
      :value="inputValue"
      @input="$emit('input', $event.target.value)"
    />
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: String,
    },
  },
  data() {
    return {
      input: "",
    };
  },
  computed: {
    inputValue: {
      get() {
        return this.value;
      },
      set(newValue) {
        this.input = newValue;
      },
    },
  },
};
</script>
<style scoped></style>
