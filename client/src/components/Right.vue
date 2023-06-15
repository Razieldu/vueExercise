<template>
  <div class="w-350 h-full ml-custom text-base">
    <div v-for="(eachObj,index) in apiData" :key="index">
      <h1>{{ eachObj["姓名"]}}</h1>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { useRightDataStore } from "../store/DataHandleStore";
export default {
  setup() {
    const apiData = ref(null);
    const { fetchData } = useRightDataStore();
    onMounted(async () => {
      const data = await fetchData();
      console.log(data);
      apiData.value = data;
    });
    return {
      apiData,
    };
  },
};
</script>
