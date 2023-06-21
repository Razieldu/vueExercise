<template>
  <el-aside style="height: 100vh; margin-top: 3.5rem" >
    <el-menu
      style="background-color: #f1f5f9; border-color: #f1f5f9"
      default-active="2"
      @open="handleOpen"
      @close="handleClose"
    >
      <el-menu-item index="1">
        <el-icon><document /></el-icon>
        <span>已儲存的分頁資料</span>
      </el-menu-item>
      <!-- <el-menu-item index="3" disabled>
        <el-icon><document /></el-icon>
        <span>Navigator Three</span>
      </el-menu-item> -->
      <el-menu-item index="2">
        <el-icon><Search /></el-icon>
        <RouterLink to="/TitleSearch">標題搜尋</RouterLink>
      </el-menu-item>
      <el-sub-menu index="3">
        <template #title>
          <el-icon><Search /></el-icon>
          <span>標題搜尋</span>
        </template>
        <el-menu-item-group title="Group One">
          <el-menu-item index="3-1">item one</el-menu-item>
          <el-menu-item index="3-2">item two</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="Group Two">
          <el-menu-item index="3-3">item three</el-menu-item>
        </el-menu-item-group>
        <el-sub-menu index="3-4">
          <template #title>item four</template>
          <el-menu-item index="3-4-1">item one</el-menu-item>
        </el-sub-menu>
      </el-sub-menu>
    </el-menu>
  </el-aside>
</template>
  
<script>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from "@element-plus/icons-vue";
import { RouterLink } from "vue-router";
export default {
  name: "LeftMenu",
  components: {},
  setup() {
    const handleOpen = (key, keyPath) => {
      console.log(key, keyPath);
    };
    const handleClose = (key, keyPath) => {
      console.log(key, keyPath);
    };
    return {
      handleOpen,
      handleClose,
      RouterLink,
    };
  },
};
</script>
