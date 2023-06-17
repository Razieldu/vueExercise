<template>
  <div class="ml-custom text-base py-4 bg-red-100">
    <div>
      <div class="pb-2 flex">
        <el-button @click="resetSearchResult()" type="primary">重置</el-button>
        <el-button type="primary">新增</el-button>
      </div>
    </div>
    <el-table
      highlight-current-row
      stripe
      :data="apiData"
      style="height: 82vh; width: 80vw"
      @row-click="handleRowEdit"
    >
      <el-table-column :key="0" label="姓名" prop="姓名" width="120" fixed ></el-table-column> 
      <el-table-column
        v-for="(eachObj, index) in contentTitle"
        :key="index"
        :label="eachObj"
        :prop="eachObj"
        :width="eachObj === 'Email' ? 250 : 150"
      />
      <el-table-column fixed="right" label="操作" width="140">
        <!-- <template #header>
          <el-input v-model="search" size="small" placeholder="搜尋" />
        </template> -->
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
import { onMounted, ref, watch } from "vue";
import { useRightDataStore } from "../store/DataHandleStore";
import { storeToRefs } from "pinia";
export default {
  setup() {
    const contentTitle = ref([
      // "姓名",
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
    const { fetchData, resetSearchResult } = useRightDataStore();
    const { data } = storeToRefs(useRightDataStore());
    console.log(data);
    const currentRow = ref();
    const handleRowEdit = (row )=>{
    console.log(row)
    }
    onMounted(async () => {
      await fetchData();
      apiData.value = data.value;
    });
    watch(data, (newData) => (apiData.value = newData));
    return {
      apiData,
      contentTitle,
      resetSearchResult,
      handleRowEdit
    };
  },
};
</script>
