<template>
  <el-button type="primary">{{ buttonText }} </el-button>
</template>
<script>
export default {
  name: "PrimaryButton",
  props: {
    buttonText: {
      type: String,
      required: true,
    },
  },
};
</script>