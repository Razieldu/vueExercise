import { defineStore } from "pinia";

export const useLeftDataStore = defineStore("leftData", {
  state: () => ({
    data: [
      [
        { id: "01", name: "劉11111111111111111111111111111111111111111111111111111111111111111111111111111111111111", select: false },
        { id: "02", name: "陳", select: false },
        { id: "03", name: "林", select: false },
      ],
      [
        { id: "11", name: "gmail", select: false },
        { id: "12", name: "hotmail", select: false },
      ],
      [
        { id: "21", name: "大學", select: false },
        { id: "22", name: "政府", select: false },
      ],
      [
        { id: "31", name: "董事長", select: false },
        { id: "32", name: "總監", select: false },
      ],
      [
        { id: "41", name: "242", select: false },
        { id: "42", name: "112", select: false },
      ],
      [
        { id: "51", name: "新北", select: false },
        { id: "52", name: "台北市", select: false },
      ],
    ],
    open: [false, false, false, false, false, false],
  }),

  actions: {
    handleNewData(index, newData) {
      if (newData === "") return;
      const newObject = {
        id: `${index}${this.data[index].length + 1}`,
        name: newData,
        select: false,
      };
      this.data[index].push(newObject);
      console.log(this.data[index])
    },

    deleteData(index, id) {
      this.data[index] = this.data[index].filter((item) => item.id !== id);
    },

    handleopen(index) {
      let currentOpenState = this.open[index];
      this.open = this.open.map((item, i) => {
        if (i === index) {
          return !currentOpenState;
        } else {
          return false;
        }
      });
      console.log(index,this.open);
    },

    handleSelect(id) {
      this.data.forEach((subArray) => {
        subArray.forEach((item) => {
          if (item.id === id) {
            item.select = !item.select;
          }
        });
      });
    },
    clearSelectState() {
      this.data.forEach((subArray) => {
        subArray.forEach((item) => {
          item.select = false;
        });
      });
    },
  },
});
