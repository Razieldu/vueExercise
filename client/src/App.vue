<template>
  <div class="bg-red-100">
    <Top />
    <Middle />
  </div>
</template>

<script>
import Middle from "./components/Middle.vue";
import Top from "./components/Top.vue";
export default { components: { Middle, Top } };
</script>
