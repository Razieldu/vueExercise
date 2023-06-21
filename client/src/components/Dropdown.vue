<template>
  <div class="p-15 h-full max-h-300">
    <el-input
      @blur="handleAddData(eachindex, inputContent)"
      v-model="inputContent"
      placeholder="請輸入..."
      class="mt-3 mb-1"
    />
    <EachDropdown
      :eachindex="eachindex"
      v-for="(eachData, index) in data[eachindex]"
      :eachDataObjectFromMainArray="eachData"
      :key="index"
      :eachId="eachData.id"
    />
  </div>

</template>

<script>
import { useLeftDataStore } from "../store/LeftDataHandleStore";
import { storeToRefs } from "pinia";
import EachDropdown from "./EachDropdown.vue";
import { ref } from "vue";
export default {
  name: "Dropdown",
  props: {
    eachindex: {
      type: Number,
      required: true,
    },
  },
  components: {
    EachDropdown,
  },
  setup() {
    const inputContent = ref("");
    const leftDataStore = useLeftDataStore();
    const { data, open } = storeToRefs(leftDataStore);
    const {
      handleNewData,
      deleteData,
      handleopen,
      handleSelect,
      clearSelectState,
    } = leftDataStore;
    const handleAddData = (index, data) => {
      handleNewData(index, data);
      inputContent.value = "";
    };
    return {
      data,
      inputContent,
      handleAddData,
    };
  },
};
</script>

