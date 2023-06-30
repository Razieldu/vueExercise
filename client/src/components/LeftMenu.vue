<template>
  <el-aside
    style="
      height: 100vh;
      width: 18%;
      position: fixed;
      top: 124px;
      padding-left: 4px;
      min-width: 300px;
    "
  >
    <el-menu
      style="background-color: #f1f5f9; border-color: #f1f5f9"
      unique-opened
      @open="handleOpen"
      @close="handleClose"
    >
      <el-sub-menu index="2">
        <template #title>
          <el-icon><document /></el-icon>
          <span>已儲存的分類資料</span>
        </template>
        <el-menu-item
          v-for="(eachSelectedData, index) in selectedData"
          :key="index"
          :id="eachSelectedData.id"
          @click="showSelectedData(eachSelectedData.id)"
        >
          <template #title>{{ eachSelectedData.title }}</template>
        </el-menu-item>
      </el-sub-menu>
      <!-- <RouterLink to="titleSearch">
        <el-menu-item index="2">
          <el-icon><document /></el-icon>
          <span>未套版標題搜尋</span>
        </el-menu-item>
      </RouterLink> -->
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
            <div :key="index" class="grid grid-cols-10 place-items-center">
              <div class="col-span-3 flex justify-center">
                <el-checkbox
                  v-model="eachSearchWordObject.select"
                  label="關聯"
                  size="small"
                  v-if="!isFirst.value"
                />
              </div>
              <div
                class="col-span-6 place-items-center"
                @click="
                  searchGoalByColumn(
                    titleData[titleIndex].name,
                    eachSearchWordObject.name,
                    eachSearchWordObject.select
                  )
                "
              >
                <p class="text-s">
                  {{ eachSearchWordObject.name }}
                </p>
              </div>
              <div class="col-span-1 place-items-center flex justify-end">
                <el-icon
                  class="customCheckbox"
                  @click="deleteData(titleIndex, eachSearchWordObject.id)"
                  type="primary"
                  size="small"
                  ><Delete
                /></el-icon>
              </div>
            </div>
          </el-menu-item>
        </el-sub-menu>
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
import { Delete, Edit, Search, Share, Upload } from "@element-plus/icons-vue";
import { RouterLink } from "vue-router";
import { ref, provide, inject } from "vue";
import { useLeftDataStore } from "../store/LeftDataHandleStore";
import { useRightDataStore } from "../store/DataHandleStore";
import { storeToRefs } from "pinia";
export default {
  name: "LeftMenu",
  components: {},
  setup() {
    const leftDataStore = useLeftDataStore();
    const DataHandleStore = useRightDataStore();
    const { data, open } = storeToRefs(leftDataStore);
    const {
      handleNewData,
      deleteData,
      handleopen,
      handleSelect,
      clearSelectState,
    } = leftDataStore;
    const { searchGoalByColumn, showSelectedData, selectedData, isFirst } =
      DataHandleStore;
    const titles = ref([
      { name: "姓名", color: "grey", index: "1-1" },
      { name: "Email", color: "silver", index: "2-1" },
      { name: "服務單位", color: "grey", index: "3-1" },
      { name: "職稱", color: "silver", index: "4-1" },
      { name: "郵遞區號", color: "grey", index: "5-1" },
      { name: "地址", color: "silver", index: "6-1" },
    ]);
    const titleData = titles.value;
    // provide("titles", titles);
    const handleOpen = (key, keyPath) => {};
    const handleClose = (key, keyPath) => {};
    // watch(data, (newData) => (data.value = newData));
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
      titleData,
      selectedData,
      showSelectedData,
      isFirst,
      Delete,
    };
  },
};
</script>
<style scope>
.el-icon svg {
  height: 0.7rem !important;
  width: 0.7rem !important;
}
</style>