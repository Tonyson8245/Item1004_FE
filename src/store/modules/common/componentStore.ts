import { defineStore } from "pinia";

const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const useComponentStore = defineStore("componentStore", {
  state: () => ({
    closeDropdown: false,
  }),

  getters: {
    //서버로 부터 가져오는 로직 나중에 axios 붙힐때 연동할 생각할 것
  },
  actions: {
    async toogleCloseDropdown(status: boolean) {
      this.closeDropdown = status;

      await delay(1);
    },
  },
});
