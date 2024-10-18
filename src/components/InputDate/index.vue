<template>
  <input
    type="date"
    :value="DateValue"
    @input="validate($event.target.value)"
    class="inputDate"
  />
</template>

<script>
export default {
  name: "InputDate",
  props: {
    DateValue: {
      type: String,
      default: "",
    },
  },
  methods: {
    validate(value) {
      //console.log(value);
      const datePattern = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
      if (datePattern.test(value)) {
        this.$emit("input", value);
      } else {
        console.log('日付フォーマットが違います。YYYY-MM-DD"');
      }
    },
  },
};
</script>
<style scoped>
.inputDate {
  padding: 6px 12px;
  border: 1px solid #333;
  border-radius: 6px;
}
</style>
