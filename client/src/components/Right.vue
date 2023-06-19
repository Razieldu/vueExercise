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
    >
      <el-table-column :key="'姓名'" label="姓名" prop="姓名" width="120" fixed>
        <!-- <el-input v-if="editMode"></el-input> -->
      </el-table-column>
      <el-table-column
        v-for="eachObj in contentTitle"
        :key="eachObj.key"
        :label="eachObj.title"
        :prop="eachObj.title"
        :width="eachObj === 'Email' ? 250 : 150"
      >
        <template #default="{ row, $index }">
          <div v-if="editCell[0] === eachObj.key && editCell[1] === $index">
            <el-input
              ref="cellInput"
              v-model="row[eachObj.key]"
              :placeholder="`请输入${eachObj.title}`"
              @blur="editCell.value = []"
              @change="handleAddressUpdate(editCell)"
            />
          </div>
          <div v-else @click="handleCellEdit(eachObj.key, $index)">
            {{ row[eachObj.key] || "無" }}
          </div>
        </template>
        <!-- <el-input></el-input> -->
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template #default="scope">
          <el-button size="small" @click="handleEditMode">{{
            buttonContent
          }}</el-button>
          <el-button
            size="small"
            type="danger"
            @click="handleRowDelete(scope.$index)"
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
    const apiData = ref(null);
    const editMode = ref(false);
    const editCell = ref([]);
    const buttonContent = ref("修改");
    const { fetchData, resetSearchResult, handleRowDelete } =
      useRightDataStore();
    const { data } = storeToRefs(useRightDataStore());
    const handleAddressUpdate = (editCell) => {
      console.log(`更新单元格：${editCell.value}`);
    };
    const handleCellEdit = (colKey, rowIndex) => {
      if (!editMode.value) return;
      editCell.value = [colKey, rowIndex];
      console.log(editCell.value);
    };
    const handleEditMode = () => {
      let oldValue = editMode.value;
      editMode.value = !oldValue;
      if (editMode.value === false) {
        editCell.value = [];
        buttonContent.value="修改"
      }else{
        buttonContent.value="編輯中"
      }
      console.log(editMode.value);
    };
    onMounted(async () => {
      await fetchData();
      apiData.value = data.value;
    });
    watch(data, (newData) => (apiData.value = newData));
    return {
      apiData,
      contentTitle,
      resetSearchResult,
      // handleRowEdit,
      handleRowDelete,
      editMode,
      handleCellEdit,
      handleAddressUpdate,
      handleEditMode,
      editCell,
      buttonContent,
    };
  },
};
</script>
