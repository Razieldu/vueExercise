<template>
  <div class="w-1/5 bg-gray-200 h-screen fixed top-14 left-0 p-5 z-20">
    <div
      class="p-2 text-white flex justify-between"
      v-for="(title, index) in titles"
      :key="index"
      :style="{ backgroundColor: title.color }"
      @click="handleopen(index)"
    >
      <h4>{{ title.name }}</h4>
      <el-icon><ArrowDownBold v-if="!open[index]" /></el-icon>
      <el-icon><ArrowUpBold v-if="open[index]" /></el-icon>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useLeftDataStore } from "../store/LeftDataHandleStore";
import { storeToRefs } from "pinia";
export default {
  setup() {
    const leftDataStore = useLeftDataStore();
    const { data, open } = storeToRefs(leftDataStore);
    const {
      handleNewData,
      deleteData,
      handleopen,
      handleSelect,
      clearSelectState,
    } = leftDataStore;
    const titles = ref([
      { name: "姓名", color: "grey" },
      { name: "電子郵件", color: "silver" },
      { name: "服務單位", color: "grey" },
      { name: "職稱", color: "silver" },
      { name: "郵遞區號", color: "grey" },
      { name: "地址", color: "silver" },
    ]);
    return {
      titles,
      data,
      open,
      handleNewData,
      deleteData,
      handleopen,
      handleSelect,
      clearSelectState,
    };
  },
};
</script>

