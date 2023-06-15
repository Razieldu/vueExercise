import { defineStore } from "pinia";

export const useRightDataStore = defineStore("rightData", {
  state: () => ({
    data: null,
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
          this.data = result.Data
          return this.data
        } else {
          throw new Error("Request failed.");
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
});
