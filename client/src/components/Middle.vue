<template>
  <div class="mt-20 flex flex-wrap">
    <Left/>
    <Right/>
  </div>
</template>

<script lang="js">
import Left from "./Left.vue";
import Right from "./Right.vue";
export default {
  components: {
    Left,
    Right
  },
};
</script>
