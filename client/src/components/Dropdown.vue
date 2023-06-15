<template>
  <div class="p-15 h-full max-h-300">
    <el-input placeholder="請輸入..." class="mt-3" />
    <EachDropdown
      :eachindex="eachindex"
      v-for="(eachData, index) in data[eachindex]"
      :eachDataObjectFromMainArray="eachData"
      :key="index"
    />
  </div>
</template>

<script>
import { useLeftDataStore } from "../store/LeftDataHandleStore";
import { storeToRefs } from "pinia";
import EachDropdown from "./EachDropdown.vue";
export default {
  name: "Dropdown",
  props: {
    eachindex: {
      type: Number,
      required: true,
    },
  },
  components: {
    InputField,
    EachDropdown,
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
    console.log(data);
    return {
      data,
    };
  },
};
</script>

