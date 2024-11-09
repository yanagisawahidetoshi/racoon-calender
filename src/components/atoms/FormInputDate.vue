<template>
  <input
    type="date"
    :value="inputDate"
    @input="$emit('input', $event.target.value)"
  />
</template>
<script>
export default {
  props: {
    value: {
      type: Date,
    },
  },
  data() {
    return {
      date: "",
    };
  },
  computed: {
    inputDate: {
      get() {
        return this.value;
      },
      set(newDate) {
        this.date = newDate;
      },
    },
  },
};
</script>
<style lang="scss"></style>
