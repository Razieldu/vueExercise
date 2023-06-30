import { defineStore } from "pinia";
import { reactive } from "vue";
import { useLeftDataStore } from "./LeftDataHandleStore";

export const useRightDataStore = defineStore("rightData", {
  state: () => ({
    data: [],
    saveData: [],
    isFirst: reactive({ value: true }),

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
        let useData = this.isFirst.value ? this.saveData : this.data;
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
        this.isFirst.value = false;
        console.log(this.isFirst.value);
      } else if (ifRelated && !this.first) {
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
        this.isFirst.value = false;
        console.log(this.isFirst.value);
      }
      // console.log(`篩選後更新資料${[...gridData]}`);
    },
    resetSearchResult() {
      const leftDataStore = useLeftDataStore();
      const { clearSelectState } = leftDataStore;
      this.data = [...this.saveData];
      this.isFirst.value = true;
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
      if(title==="") return
      isDialogVisible(false);
      resetInput();
      let selectedObject = {
        title,
        content: [...this.data],
        id: `${this.selectedData.length}_${title}`,
      };
      this.selectedData.push(selectedObject);
    },
    showSelectedData(id) {
      let readyToShowData = this.selectedData.filter(
        (eachSelectedData) => eachSelectedData.id === id
      );
      this.data = [...readyToShowData[0].content];
    },
  },
});
