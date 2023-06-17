<template>
  <div
    class="flex justify-between items-center px-2 py-4 border-transparent border-2 rounded-5 mt-2"
  >
    <h4>{{ eachDataObjectFromMainArray.name }}</h4>
    <div class="flex items-center">
      <el-checkbox style="margin-right: 20px" label="" size="small" />
      <el-button
        @click="searchGoalByColumn(titleData[eachindex].name, eachDataObjectFromMainArray.name)"
        type="primary"
        size="small"
        >搜尋</el-button
      >
      <el-button
        @click="deleteData(eachindex, eachId)"
        type="primary"
        size="small"
        >刪除</el-button
      >
    </div>
  </div>
</template>

<script lang="js">
import { useLeftDataStore } from "../store/LeftDataHandleStore";
import { useRightDataStore } from "../store/DataHandleStore";
import {inject} from "vue"
export default {
  name: "EachDropdown",
  props:{
    eachDataObjectFromMainArray:{
      type: Object,
      required: true,
    },
    eachindex:{
      type:Number,
      required: true,
    },
    eachId:{
      type:String,
      required: true,
    }
  },
  setup(){
    const DataHandleStore =useRightDataStore()
    const leftDataStore = useLeftDataStore();
    const {
      handleNewData,
      deleteData,
      handleopen,
      handleSelect,
      clearSelectState,
    } = leftDataStore;
    const {
      searchGoalByColumn
    } = DataHandleStore
    const titleData = inject("titles")
    return{
    deleteData, 
    searchGoalByColumn,
    titleData 
    }
  }

};
</script>

