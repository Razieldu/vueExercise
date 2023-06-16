<template>
  <div class="w-350 ml-custom text-base py-4 bg-red-100">
    <div>
      <div class="pb-2">
        <el-button type="primary">新增</el-button>
      </div>
    </div>
    <el-table stripe :data="apiData" style="width: 100%">
      <el-table-column
        v-for="(eachObj, index) in contentTitle"
        :key="index"
        :label="eachObj"
        :prop="eachObj"
        width="180"
      />
      <el-table-column align="right" width="150">
        <template #header>
          <el-input
            v-model="search"
            size="small"
            placeholder="搜尋"
          />
        </template>
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
            >修改</el-button
          >
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >刪除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { useRightDataStore } from "../store/DataHandleStore";
export default {
  setup() {
    const contentTitle = ref([
      "姓名",
      "Email",
      "服務單位",
      "職稱",
      "郵遞區號",
      "地址",
      "郵遞區號2",
      "地址2",
      "連絡電話_公司",
      "連絡電話_秘書",
      "連絡電話_住宅",
      "連絡電話_手機",
      "連絡電話1",
      "連絡電話2",
      "傳真電話",
      "傳真2",
    ]);
    const apiData = ref(null);
    const { fetchData } = useRightDataStore();
    onMounted(async () => {
      const data = await fetchData();
      console.log(data);
      apiData.value = data;
    });
    return {
      apiData,
      contentTitle,
    };
  },
};
</script>
