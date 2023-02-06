<template>
  <div class="cursor-pointer">
    <div
      v-if="propsShowModal"
      class="opacity-25 fixed inset-0 z-50 bg-black"
    ></div>
    <div
      v-if="propsShowModal"
      class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 justify-center items-center flex text-lg"
    >
      <div class="relative md:w-[27.5rem] md:h-[12.8rem] w-[17.5rem] h-[9rem]">
        <!--content-->
        <div
          class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none p-4"
        >
          <div
            class="relative p-2 flex-auto text-everly-black flex flex-col items-center"
            v-if="props.propsType == `delete`"
          >
            <img src="@/assets/icon/warning_red.svg" alt="" class="w-6" />
            <p class="font-bold text-base md:text-lg text-center m-3 md:m-5">
              글을 삭제하시겠습니까?
            </p>
          </div>
          <div
            class="relative p-2 flex-auto text-everly-black flex flex-col items-center"
            v-else
          >
            <img
              src="@/assets/icon//check_circle_green.svg"
              alt=""
              class="w-6"
            />
            <p class="font-bold text-base md:text-lg text-center m-3 md:m-5">
              글이 정상적으로 삭제되었습니다.
            </p>
          </div>
          <!--footer-->
          <div class="flex gap-3" v-if="props.propsType == `delete`">
            <div class="flex grow items-center justify-center">
              <button
                class="text-everly-main font-bold bg-everly-light_blue w-full py-2 rounded-lg text-sm md:text-base"
                type="button"
                v-on:click="$emit('update:propsShowModal', false)"
              >
                취소
              </button>
            </div>
            <div class="flex grow items-center justify-center">
              <button
                class="text-everly-white font-bold bg-everly-main w-full py-2 rounded-lg text-sm md:text-base"
                type="button"
                v-on:click="deletePost()"
              >
                삭제
              </button>
            </div>
          </div>
          <div class="flex" v-else>
            <button
              class="text-everly-white font-bold bg-everly-main w-full py-2 rounded-lg text-sm md:text-base"
              type="button"
              v-on:click="
                $emit('update:propsShowModal', false);
                router.go(-1);
              "
            >
              확인
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { usePostStore } from "@/store/modules/home/postStore";
import { useVModel } from "@vueuse/core";
import { useRouter } from "vue-router";

const router = useRouter();
const postStore = usePostStore();
const props = defineProps<{
  propsShowModal: boolean;
  propsType: string;
}>();
const emit = defineEmits(["update:propsShowModal", "update:changeStatus"]);

const propsShowModal = useVModel(props, "propsShowModal", emit);

function deletePost() {
  postStore.deletePost().then((res) => {
    if (res) {
      emit("update:changeStatus", "success"); //성공했을때는 성공이라고 하고 끄게
    } else {
      emit("update:propsShowModal", false); // 실패했을 경우 바로 끄게
    }
  });
}
</script>
<style scoped></style>
