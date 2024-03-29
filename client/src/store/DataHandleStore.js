import { defineStore } from "pinia";
import { reactive } from "vue";
import { useLeftDataStore } from "./LeftDataHandleStore";
import Fuse from "fuse.js";
export const useRightDataStore = defineStore("rightData", {
  state: () => ({
    data: [],
    saveData: [],
    isFirst: true,
    currentSelectedDataId: "",
    currentSelectedData: [],
    selectedData: [],
  }),
  actions: {
    async fetchData(getData) {
      try {
        const response = await fetch("http://localhost:3000/proxy", {
          method: "POST",
          body: JSON.stringify(getData),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const result = await response.json();
          this.data = JSON.parse(JSON.stringify(result.Data));
          this.saveData = JSON.parse(JSON.stringify(result.Data));
          // console.log(this.data);
          // console.log(this.saveData);
          return this.data;
        } else {
          throw new Error("Request failed.");
        }
      } catch (error) {
        console.log(error);
      }
    },
    async updateMemberData(memberNewData) {
      try {
        const response = await fetch("http://localhost:3000/proxy3", {
          method: "POST",
          body: JSON.stringify(memberNewData),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const result = await response.json();
          console.log(result);
          return result;
        } else {
          throw new Error("Request failed.");
        }
      } catch (error) {
        console.log(error);
      }
    },
    async addMemberData(memberNewData) {
      try {
        const response = await fetch("http://localhost:3000/proxy4", {
          method: "POST",
          body: JSON.stringify(memberNewData),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const result = await response.json();
          console.log(result);
          return result.m_id;
        } else {
          throw new Error("Request failed.");
        }
      } catch (error) {
        console.log(error);
      }
    },
    searchGoalByColumn(titieValue, value, ifRelated) {
      if (!ifRelated) {
        let searchResult = [];
        let useData = this.isFirst ? this.saveData : this.data;
        // console.log(useData["0"])
        let keyWord = new RegExp(value);
        for (let indexNum in useData) {
          for (let key in useData[indexNum]) {
            if (key !== titieValue) continue;
            let target = useData[indexNum][key];
            if (keyWord.test(target) === true) {
              searchResult.push(useData[indexNum]);
            }
          }
        }
        // console.log(searchResult);
        searchResult.length > 0 ? (this.data = searchResult) : null;
        // console.log(this.data);
        this.isFirst = false;
        // console.log(this.isFirst);
      } else if (ifRelated && !this.isFirst) {
        let searchResult = [];
        let useData = [...this.saveData];
        let keyWord = new RegExp(value);
        for (let indexNum in useData) {
          for (let key in useData[indexNum]) {
            if (key !== titieValue) continue;
            let target = useData[indexNum][key];
            if (keyWord.test(target) === true) {
              if (
                !this.data.some((one) => one.m_id === useData[indexNum].m_id)
              ) {
                // console.log(one)
                searchResult.push(useData[indexNum]);
                // console.log(searchResult)
              }
            }
          }
        }
        this.data = [...this.data, ...searchResult];
        this.isFirst = false;
        console.log(this.isFirst);
      }
      // console.log(`篩選後更新資料${[...gridData]}`);
    },
    resetSearchResult() {
      const leftDataStore = useLeftDataStore();
      const { clearSelectState } = leftDataStore;
      this.data = [...this.saveData];
      this.isFirst = true;
      this.currentSelectedDataId = "";
      clearSelectState();
      // console.log(this.data, "THIS.DATA");
      // console.log(this.saveData, "SAVEDATA");
    },
    handleRowDelete(id) {
      this.data = this.data.filter((one) => one.m_id !== id);
      this.saveData = this.saveData.filter((one) => one.m_id !== id);
    },
    async handleAddNewData() {
      console.log("添加");
      const newObj = {}; // 创建一个空对象

      this.data = [{ ...newObj }, ...this.data]; // 在数据列表开头添加新对象
      this.saveData = [{ ...newObj }, ...this.saveData]; // 在保存数据列表开头添加新对象

      try {
        const result = await this.addMemberData(newObj); // 发送添加数据的请求
        console.log(result);

        // 更新第一个对象的m_id属性
        this.data[0].m_id = result;
        this.saveData[0].m_id = result;
        console.log(this.data[0]);
        console.log(this.saveData[0]);
      } catch (error) {
        console.log(error);
      }
    },

    async handleUpdateData(row) {
      console.log(row);
      let objToServer = null;
      this.data = this.data.map((one) => {
        if (one.m_id === row.m_id) {
          let updateObj = { ...one, ...row };
          console.log(updateObj);
          return updateObj;
        }
        return one;
      });
      this.saveData = this.saveData.map((one) => {
        if (one.m_id === row.m_id) {
          let updateObj = { ...one, ...row };
          objToServer = updateObj;
          return updateObj;
        }
        return one;
      });
      console.log(objToServer, "給後端");
      let result = await this.updateMemberData(objToServer);
      console.log(result);
    },
    handleSelectedData(title, isDialogVisible, resetInput) {
      if (title === "") return;
      isDialogVisible(false);
      resetInput();
      let newId = Math.floor(100000*Math.random())
      let selectedObject = {
        title,
        content: [...this.data],
        id: `${newId}_${title}`,
      };
      this.selectedData.push(selectedObject);
    },
    showSelectedData(id) {
      // console.log(id);
      this.isFirst = false;
      let readyToShowData = this.selectedData.filter(
        (eachSelectedData) => eachSelectedData.id === id
      );
      this.data = [...readyToShowData[0].content];
      this.currentSelectedData = { ...readyToShowData[0] };
      // console.log(this.currentSelectedData)
      this.currentSelectedDataId = id;
    },
    updateSelectedData(id, isDialogVisible, newTitle) {
      this.selectedData = this.selectedData.map((eachSelectedData) => {
        if (eachSelectedData.id === id) {
          let newData = [...this.data];
          return { ...eachSelectedData, title: newTitle, content: newData };
        } else {
          return eachSelectedData;
        }
      });
      isDialogVisible(false);
    },
    fuzzySearch(value) {
      const options = {
        keys: [
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
        ],
      };
      const products = [...this.data];
      const fuse = new Fuse(products, options);
      const result = fuse.search(value);
      let useData = result.map((one) => one.item);
      this.data = [...useData];
    },
  },
});
