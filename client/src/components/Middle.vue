<template>
  <div class="mt-mt18 ml-3 flex">
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
