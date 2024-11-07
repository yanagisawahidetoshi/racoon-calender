<template>
  <input
    type="time"
    :value="timeValue"
    @input="validate($event.target.value)"
    class="inputTime"
  />
</template>

<script>
export default {
  name: "InputTime",
  props: {
    timeValue: {
      type: String,
      default: "",
    },
  },
  methods: {
    validate(value) {
      //console.log(value);
      const datePattern = /^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/;
      if (datePattern.test(value)) {
        this.$emit("input", value);
      } else {
        console.log("時間フォーマットが違います。HH:mm");
      }
    },
  },
};
</script>
<style scoped>
.inputTime {
  padding: 6px 12px;
  border: 1px solid #333;
  border-radius: 6px;
}
</style>
