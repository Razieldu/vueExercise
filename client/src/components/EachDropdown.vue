<template>
  <div
    class="flex justify-between items-center p-2 border-transparent border-2 rounded-5 mt-2"
  >
    <h4>{{ eachDataObjectFromMainArray.name }}</h4>
    <div class="flex items-center">
      <el-checkbox style="margin-right: 20px;" label="" size="small" />
      <el-button type="primary" size="small">搜尋</el-button>
      <el-button type="primary" size="small">刪除</el-button>
    </div>
  </div>
</template>

<script lang="js">
export default {
  name: "EachDropdown",
  props:{
    eachDataObjectFromMainArray:{
      type: Object,
      required: true,
    },
    // eachindex:{
    //   type:Number,
    //   required: true,
    // }
  }
};
</script>

