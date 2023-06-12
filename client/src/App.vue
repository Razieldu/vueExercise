<template>
  <div class="flex flex-col h-screen bg-red">
    <Top />
    <Middle />
  </div>
</template>

<script>
export default { components: { Middle, Top } };
import Middle from "./components/Middle.vue";
import Top from "./components/Top.vue";
</script>
<style>
</style>