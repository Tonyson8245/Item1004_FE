import { defineStore } from "pinia";
import type { modalSetting } from "@/interface/ui/modal.interface";

export const useModal = defineStore("modal", {
  state: () => ({
    showModalSmall: false,
    ModalSmallSetting: {} as modalSetting,
  }),

  getters: {
    //서버로 부터 가져오는 로직 나중에 axios 붙힐때 연동할 생각할 것
  },
  actions: {
    // 액션 동작 예시
    controlModalSmall(status: boolean) {
      this.showModalSmall = status;
    },
    setModalSmall(setting: modalSetting) {
      this.ModalSmallSetting.button_content = setting.button_content;
      this.ModalSmallSetting.detail_content = setting.detail_content;
    },
  },
});
