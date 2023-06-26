<template>
  <div class="ml-custom text-base bg-red-100 py-0 my-0">
    <div>
      <div class="pb-2 flex">
        <el-button @click="resetSearchResult()" type="primary">重置</el-button>
        <el-button @click="handleAddNewData()" type="primary">新增</el-button>
        <el-button @click="exportFile()" type="primary"
          >Export</el-button
        >
      </div>
    </div>
    <el-table
      highlight-current-row
      stripe
      :data="mainContentData"
      style="height:auto; width: 80vw"
    >
      <el-table-column :key="'姓名'" label="姓名" prop="姓名" width="120" fixed>
        <template #default="{ row, $index }">
          <div
            v-if="
              currentEditCell[0] === '姓名' && currentEditCell[1] === $index
            "
          >
            <el-input
              ref="cellInput"
              v-model="row['姓名']"
              :placeholder="`请输入${'姓名'}`"
              @blur="currentEditCell.value = []"
              @change="handleUpdateData(row)"
            />
          </div>
          <div v-else @click="handleCellEdit('姓名', $index)">
            {{ row["姓名"] || "無" }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        v-for="eachObj in contentTitle"
        :key="eachObj.key"
        :label="eachObj.title"
        :prop="eachObj.title"
        :width="eachObj === 'Email' ? 250 : 150"
      >
        <template #default="{ row, $index }">
          <div
            v-if="
              currentEditCell[0] === eachObj.key &&
              currentEditCell[1] === $index
            "
          >
            <el-input
              ref="cellInput"
              v-model="row[eachObj.key]"
              :placeholder="`请输入${eachObj.title}`"
              @blur="currentEditCell.value = []"
              @change="handleUpdateData(row)"
            />
          </div>
          <div v-else @click="handleCellEdit(eachObj.key, $index)">
            {{ row[eachObj.key] || "無" }}
          </div>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template #default="scope">
          <el-button size="small" @click="handleEditMode">{{
            buttonContent
          }}</el-button>
          <el-button
            size="small"
            type="danger"
            @click="handleRowDelete(scope.row.m_id)"
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
import { utils, writeFileXLSX } from "xlsx";
export default {
  setup() {
    const contentTitle = ref([
      { title: "Email", key: "Email" },
      { title: "服務單位", key: "服務單位" },
      { title: "職稱", key: "職稱" },
      { title: "郵遞區號", key: "郵遞區號" },
      { title: "地址", key: "地址" },
      { title: "郵遞區號2", key: "郵遞區號2" },
      { title: "地址2", key: "地址2" },
      { title: "連絡電話_公司", key: "連絡電話_公司" },
      { title: "連絡電話_秘書", key: "連絡電話_秘書" },
      { title: "連絡電話_住宅", key: "連絡電話_住宅" },
      { title: "連絡電話_手機", key: "連絡電話_手機" },
      { title: "連絡電話1", key: "連絡電話1" },
      { title: "連絡電話2", key: "連絡電話2" },
      { title: "傳真電話", key: "傳真電話" },
      { title: "傳真2", key: "傳真2" },
    ]);
    const mainContentData = ref([]);
    const editMode = ref(false);
    const currentEditCell = ref([]);
    const buttonContent = ref("修改");
    const { fetchData, resetSearchResult, handleRowDelete, handleAddNewData,handleUpdateData } =
      useRightDataStore();
    const { data } = storeToRefs(useRightDataStore());
    const handleCellEdit = (colKey, rowIndex) => {
      if (!editMode.value) return;
      currentEditCell.value = [colKey, rowIndex];
      console.log(currentEditCell.value);
    };
    const handleEditMode = () => {
      let oldValue = editMode.value;
      editMode.value = !oldValue;
      if (editMode.value === false) {
        currentEditCell.value = [];
        buttonContent.value = "修改";
      } else {
        buttonContent.value = "儲存";
      }
      // console.log(editMode.value);
    };
    const exportFile = () => {
      const ws = utils.json_to_sheet(mainContentData.value);
      const wb = utils.book_new();
      utils.book_append_sheet(wb, ws, "Data");
      writeFileXLSX(wb, `會員資料_${new Date().toLocaleString()}.xlsx`);
    };
    onMounted(async () => {
      const mainData = await fetchData();
      mainContentData.value = mainData;
    });
    watch(data, (newData) => (mainContentData.value = newData));
    return {
      mainContentData,
      contentTitle,
      resetSearchResult,
      // handleRowEdit,
      handleRowDelete,
      editMode,
      handleCellEdit,   
      handleEditMode,
      handleAddNewData,
      exportFile,
      handleUpdateData,
      currentEditCell,
      buttonContent,
    };
  },
};
</script>
