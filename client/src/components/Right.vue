<template>
  <div class="ml-custom text-base bg-red-100 py-0 my-0 min-h-[89vh] mt-4">
    <div>
      <div class="pb-3 flex">
        <el-button @click="resetSearchResult()" type="primary">重置</el-button>
        <el-button @click="handleAddNewData()" type="primary">新增</el-button>
        <el-button @click="exportFile()" type="primary">Export</el-button>
      </div>
    </div>
    <el-table
      highlight-current-row
      stripe
      :data="mainContentData"
      style="height: 75vh; width: 80vw"
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
    <!-- <div class="example-pagination-block">
      <div class="example-demonstration">When you have few pages</div>
      <el-pagination layout="prev, pager, next" :total="50" />
    </div> -->
    <div class="flex justify-center pt-4 pb-2">
      <el-pagination
        class="bg-transparent"
        @size-change="handlePageSizeChange"
        @current-change="handleCurrentChange"
        @prev-click="handlePrevClick"
        @next-click="handleNextClick"
        :page-sizes="[10, 20, 30, 40]"
        small
        layout="sizes, prev, pager, next, jumper"
        :total="100"
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
      />
    </div>
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
    const {
      fetchData,
      resetSearchResult,
      handleRowDelete,
      handleAddNewData,
      handleUpdateData,
    } = useRightDataStore();
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
    // const exportFile = () => {
    //   const ws = utils.json_to_sheet(mainContentData.value);
    //   const wb = utils.book_new();
    //   utils.book_append_sheet(wb, ws, "Data");
    //   writeFileXLSX(wb, `會員資料_${new Date().toLocaleString()}.xlsx`);
    // };

    const exportFile = () => {
      // console.log(mainContentData.value);
      let deleteM_idData = mainContentData.value.map(
        ({ m_id, ...rest }) => rest
      );
      const ws = utils.json_to_sheet(deleteM_idData);
      const wb = utils.book_new();
      utils.book_append_sheet(wb, ws, "Data");

      const columnCount = utils.sheet_to_json(ws, { header: 1 })[0].length;

      for (let col = 0; col < columnCount; col++) {
        const columnName = utils.encode_col(col);
        const columnWidth = 30;
        ws["!cols"] = ws["!cols"] || [];
        ws["!cols"][col] = { wch: columnWidth };
      }

      writeFileXLSX(wb, `會員資料_${new Date().toLocaleString()}.xlsx`);
    };
    const currentPage = ref(1);
    const pageSize = ref(10);
    const handlePageSizeChange = (val) => {
      pageSize.value = val;
    };
    const handleCurrentChange = (val) => {
      currentPage.value = val;
    };
    const handlePrevClick = (val) => {
      console.log(val);
      currentPage.value = val - 1;
    };
    const handleNextClick = (val) => {
      currentPage.value = val + 1;
    };
    const handleShowData = (currentPage, pageSize, data) => {
      let pageStartIndex = (currentPage - 1) * pageSize;
      let pageEndIndex = currentPage * pageSize;
      let showData = data.slice(pageStartIndex, pageEndIndex);
      return showData;
    };
    onMounted(async () => {
      const mainData = await fetchData();
      // mainContentData.value = mainData;
      console.log(mainData)
      mainContentData.value = handleShowData(
        currentPage.value,
        pageSize.value,
        mainData
      );
      // console.log(mainContentData.value);
    });
    watch(data, (newData) => (mainContentData.value = newData));
    watch([currentPage, pageSize, data], ([curPage, size, newData]) => {
      mainContentData.value = handleShowData(curPage, size, newData);
    });
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
      handlePageSizeChange,
      handleCurrentChange,
      handlePrevClick,
      handleNextClick,
      handleShowData,
      currentPage,
      pageSize,
    };
  },
};
</script>
<style scoped>
/* .example-pagination-block + .example-pagination-block {
  margin-top: 10px;
}
.example-pagination-block .example-demonstration {
  margin-bottom: 16px;
} */
</style>