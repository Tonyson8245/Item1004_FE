<template>
  <div class="opacity-25 fixed inset-0 z-40 bg-black md:hidden"></div>
  <div class="cursor-pointer md:hidden">
    <div
      class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 justify-center items-center flex"
    >
      <div class="relative w-auto my-6 mx-auto max-w-md p-5">
        <!--content-->
        <div
          class="border-0 shadow-lg relative flex flex-col bg-white outline-none focus:outline-none"
        >
          <div class="relative p-5 pb-8 flex-auto">
            <div class="flex justify-end">
              <img
                src="@/assets/icon/close_grey.svg"
                alt=""
                @click="emit(`update:propsShowModal`, false)"
              />
            </div>
            <div class="text-sm font-bold text-center pb-4">충전 한도 안내</div>
            <div class="flex text-xs mb-4">
              <div
                class="rounded-full bg-everly-dark_grey w-1.5 h-1.5 mr-2 mt-1"
              ></div>
              <div class="flex-1">
                각 신용카드사 및 PG사에 따라 한도 금액이 다르게 적용되며, 결제
                한도가 없는 신용카드의 경우 신용카드사의 개인 한도 금액이
                적용됩니다.
              </div>
            </div>
            <div class="flex text-xs">
              <div
                class="rounded-full bg-everly-dark_grey w-1.5 h-1.5 mr-2 mt-1"
              ></div>
              <div class="flex-1">
                위 카드사 한도 정책은 카드사 사정에 따라 언제든지 변경될 수
                있습니다.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useVModel } from "@vueuse/core";

const emit = defineEmits(["update:propsShowModal"]);
</script>

<style scoped></style>
