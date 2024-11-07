<template>
  <div class="menu">
    <Button @click="$emit('changeMonth', -1)" className="arrow-left"></Button>
    <Button @click="$emit('currentMonth')" tagName="span">当月</Button>
    <Button @click="$emit('changeMonth', 1)" className="arrow-right"></Button>
    <span class="nowMonth">{{ dispDate }}</span>
    <Button @click="$emit('open')" tagName="a" className="regist">
      登録
    </Button>
  </div>
</template>

<script>
import Button from "./Button";

export default {
  name: "CalenderHeader",
  props: {
    dispDate: {
      type: String,
      default: "",
    },
  },
  components: {
    Button,
  },
};
</script>
<style scoped>
.menu {
  position: sticky;
  background: #fff;
  top: 0;
  border-bottom: 1px solid #d3d3d3;
  padding: 12px 0;
  display: flex;
  align-items: center;
}
.arrow-left {
  display: inline-block;
  width: 0.6rem;
  height: 0.6rem;
  margin: 0 10px;
  border-left: 2px solid #000;
  border-bottom: 2px solid #000;
  transform: rotate(45deg);
}
.arrow-right {
  display: inline-block;
  width: 0.6rem;
  height: 0.6rem;
  margin: 0 10px;
  border-top: 2px solid #000;
  border-right: 2px solid #000;
  transform: rotate(45deg);
}
.nowMonth {
  font-size: 18px;
  vertical-align: middle;
  font-weight: 500;
  display: inline-block;
  margin: 0 12px;
}
.regist {
  vertical-align: -4px;
  margin: 0 6px;
  cursor: pointer;
}
</style>
