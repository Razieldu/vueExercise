import { defineStore } from "pinia";

export const useRightDataStore = defineStore("rightData", {
  state: () => ({
    data: [],
    saveData: [],
    isFirst: true,
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
    searchGoalByColumn(titieValue, value) {
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
      console.log(searchResult);
      searchResult.length > 0 ? (this.data = searchResult) : null;
      console.log(this.data);
      this.isFirst = false;
      // console.log(`篩選後更新資料${[...gridData]}`);
    },
    resetSearchResult() {
      this.data = [...this.saveData];
      console.log(this.data, "THIS.DATA");
      console.log(this.saveData, "SAVEDATA");
    },
    handleRowDelete(id) {
      this.data = this.data.filter((one) => one.m_id !== id);
      this.saveData = this.saveData.filter((one) => one.m_id !== id);
    },
    handleAddNewData() {
      console.log("添加");
      const newId = Math.floor(Math.random() * 100000);
      const newObj = { m_id: newId };
      // this.data.splice(0, 0, { ...newObj });
      // this.saveData.splice(0, 0, { ...newObj });
      this.data = [{ ...newObj }, ...this.data];
      this.saveData = [{ ...newObj }, ...this.saveData];
      console.log(this.data);
      console.log(this.saveData);
    },

    handleUpdateData(row) {
      console.log(row);
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
          console.log(updateObj);
          return updateObj;
        }
        return one;
      });
    },
  },
});
