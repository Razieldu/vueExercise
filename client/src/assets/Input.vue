<template>
  <el-input v-model="input" placeholder="請輸入..." />
</template>
  
  <script >
import { ref } from "vue";

export default {
  name: "InputField",
  setup() {
    const input = ref("");

    return {
      input,
    };
  },
};
</script>
  
<style>
</style>
  