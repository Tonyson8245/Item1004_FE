import { defineStore } from "pinia";
import { getServiceTerm } from "@/api/user-serive/login";

export const useloginStore = defineStore("loginStore", {
  state: () => ({}),

  getters: {},
  actions: {
    // 액션 동작 예시
    async getServiceTerm() {
      await getServiceTerm()
        .then((response) => {})
        .catch((error) => {});
    },
  },
});
