<template>
  <div class="w-1/5 bg-gray-200 h-screen fixed top-14 left-0 p-5 z-20">
    <div v-for="(title, index) in titles" :key="index">
      <div
        class="p-2 text-white flex justify-between"
        :style="{ backgroundColor: title.color }"
        @click="handleopen(index)"
      >
        <h4>{{ title.name }}</h4>
        <el-icon v-if="!open[index]"><ArrowDownBold /></el-icon>
        <el-icon v-if="open[index]"> <ArrowUpBold /></el-icon>
      </div>
      <Dropdown  v-if="open[index]" :eachindex="index"  :key="index" />
    </div>
  </div>
</template>

<script>
import { ref,provide} from "vue";
import { useLeftDataStore } from "../store/LeftDataHandleStore";
import { storeToRefs } from "pinia";
import Dropdown from "./Dropdown.vue";
export default {
  components: {
    Dropdown,
  },
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
      { name: "Email", color: "silver" },
      { name: "服務單位", color: "grey" },
      { name: "職稱", color: "silver" },
      { name: "郵遞區號", color: "grey" },
      { name: "地址", color: "silver" },
    ]);
    provide("titles",titles)
    return {
      titles,
      // data,
      open,
      // handleNewData,
      // deleteData,
      handleopen,
      // handleSelect,
      // clearSelectState,
    };
  },
};
</script>

