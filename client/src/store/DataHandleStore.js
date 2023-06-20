import { defineStore } from "pinia";

export const useRightDataStore = defineStore("rightData", {
  state: () => ({
    data: [],
    saveData: [],
    isFirst: true,
  }),
  actions: {
    async fetchData(data) {
      try {
        const response = await fetch("http://localhost:3000/proxy", {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const result = await response.json();
          this.data = result.Data;
          this.saveData = JSON.parse(JSON.stringify(result.Data));
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
      let useData = this.isFirst ? this.saveData :this.data;
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
      console.log(this.data)
      this.isFirst = false;
      // console.log(`篩選後更新資料${[...gridData]}`);
    },
    resetSearchResult() {
      this.data = this.saveData
    },
    handleRowDelete(id) {
       this.data=this.data.filter(one=>one.m_id!==id)
       this.saveData=this.saveData.filter(one=>one.m_id!==id)
    },
    handleAddNewData() {
      this.data.unshift({})
      this.saveData.unshift({})
    },

    
  },
});
