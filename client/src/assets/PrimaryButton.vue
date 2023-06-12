<template>
  <el-button type="primary" :class="[positionClasses, rightClasses]"
    >{{ buttonText }}
  </el-button>
</template>
<script>
export default {
  name: "PrimaryButton",
  props: {
    buttonText: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      default: "static",
    },
    right: {
      type: String,
      default: "0",
    },
  },
  // computed: {
  //   positionClasses() {
  //     console.log(this.position);
  //     return {
  //       absolute: this.position === "absolute",
  //       fixed: this.position === "fixed",
  //       // Add more classes if needed
  //     };
  //   },
  //   rightClasses() {
  //     console.log(this.right);
  //     return `right-${this.right}`;
  //   },
  // },
};
</script>