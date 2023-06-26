<template>
  <el-aside style="height: 100vh; width: 18%; position: fixed; top: 112px">
    <el-menu
      style="background-color: #f1f5f9; border-color: #f1f5f9"
      unique-opened="true"
      @open="handleOpen"
      @close="handleClose"
    >
      <el-menu-item index="2">
        <el-icon><document /></el-icon>
        <span>已儲存的分頁資料</span>
      </el-menu-item>
      <el-sub-menu index="1">
        <template #title>
          <el-icon><Search /></el-icon>
          <span>標題搜尋</span>
        </template>
        <el-sub-menu
          v-for="(eachObject, titleIndex) in titles"
          :index="eachObject.index"
          :key="titleIndex"
        >
          <template #title>{{ eachObject.name }}</template>
          <el-menu-item
            v-for="(eachSearchWordObject, index) in data[titleIndex]"
            :key="index"
            :index="`1-${index + 1}-${titleIndex + 1}`"
          >
            <div
              :key="index"
              class="grid grid-cols-10 place-items-center gap-6"
            >
              <div class="col-span-3">
                <p>{{ eachSearchWordObject.name }}</p>
              </div>
              <div class="grid grid-cols-10 place-items-center col-span-7">
                <el-button 
                @click="searchGoalByColumn(titleData[titleIndex].name, eachSearchWordObject.name)"
                class="col-span-5" type="primary" size="small"
                  >搜尋</el-button
                >
                <el-button
                  @click="deleteData(titleIndex, eachSearchWordObject.id)"
                  class="col-span-5"
                  size="small"
                  >刪除</el-button
                >
              </div>
            </div>
          </el-menu-item>
          <!-- <el-menu-item index="1-1-2">
            <div class="flex items-center">
              <p class="mr-20">陳</p>
              <el-button type="primary" size="small">搜尋</el-button>
              <el-button size="small">刪除</el-button>
            </div>
          </el-menu-item> -->
        </el-sub-menu>
        <!-- <el-sub-menu index="2-1">
          <template #title>姓名</template>
          <el-menu-item index="2-1-1">
            <div class="flex items-center">
              <p class="mr-20">林</p>
              <el-button type="primary" size="small">搜尋</el-button>
              <el-button size="small">刪除</el-button>
            </div>
          </el-menu-item>
          <el-menu-item index="2-1-2">
            <div class="flex items-center">
              <p class="mr-20">陳</p>
              <el-button type="primary" size="small">搜尋</el-button>
              <el-button size="small">刪除</el-button>
            </div>
          </el-menu-item>
        </el-sub-menu> -->
      </el-sub-menu>
    </el-menu>
  </el-aside>
</template>
  
<script>
// import {
//   Document,
//   Menu as IconMenu,
//   Location,
//   Setting,
// } from "@element-plus/icons-vue";
import { RouterLink } from "vue-router";
import { ref, provide,inject } from "vue";
import { useLeftDataStore } from "../store/LeftDataHandleStore";
import { useRightDataStore } from "../store/DataHandleStore";
import { storeToRefs } from "pinia";
export default {
  name: "LeftMenu",
  components: {},
  setup() {
    const leftDataStore = useLeftDataStore();
    const DataHandleStore =useRightDataStore()
    const { data, open } = storeToRefs(leftDataStore);
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
    const titles = ref([
      { name: "姓名", color: "grey", index: "1-1" },
      { name: "Email", color: "silver", index: "2-1" },
      { name: "服務單位", color: "grey", index: "3-1" },
      { name: "職稱", color: "silver", index: "4-1" },
      { name: "郵遞區號", color: "grey", index: "5-1" },
      { name: "地址", color: "silver", index: "6-1" },
    ]);
    const titleData = titles.value
    // provide("titles", titles);
    const handleOpen = (key, keyPath) => {};
    const handleClose = (key, keyPath) => {};
   
    return {
      handleClose,
      RouterLink,
      titles,
      data,
      open,
      // handleNewData,
      deleteData,
      handleOpen,
      searchGoalByColumn,
      // handleSelect,
      // clearSelectState,
      titleData
    };
  },
};
</script>
