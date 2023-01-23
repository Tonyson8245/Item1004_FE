<template>
  <div class="cursor-pointer">
    <div
      v-if="propsShowModal"
      class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 justify-center items-center flex"
    >
      <div class="relative w-auto my-6 mx-auto">
        <!--content-->
        <div
          class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
        >
          <!-- emit 값을 다시 보냄 -->
          <div v-if="props.propsType != ''">
            <putBankAccountWithdraw
              v-if="props.propsType == 'withdrawPutAccount'"
              @update:propsShowModal="emit('update:propsShowModal', false)"
            />
            <div v-else-if="props.propsType == 'withdrawCheck'">
              <div
                class="w-11/12 min-w-[18rem] h-[10.9rem] sm:w-[30rem] md:w-[27.5rem] md:h-[15.3rem] p-4 text-xs text-center space-y-2 md:space-y-3.5 pt-5 md:text-base"
              >
                <div class="text-sm md:text-lg">
                  <div class="text-everly-main font-bold">
                    {{ amt.toLocaleString() }} 원
                  </div>
                  출금하시겠습니까?
                </div>
                <div>(신한) 110-403-9029006 (예금주 오지윤)</div>
                <hr class="border border-everly-mid_grey" />
                <div>
                  위 내용을 확인 후 <span>출금하기</span> 버튼을 눌러주세요
                </div>
                <div class="flex space-x-2 md:text-lg">
                  <div
                    class="flex-1 rounded-lg bg-everly-light_blue text-everly-main py-2 cursor-point"
                    @click="emit('update:propsShowModal', false)"
                  >
                    취소
                  </div>
                  <div
                    class="flex-1 rounded-lg bg-everly-main text-everly-white py-2 cursor-pointer"
                  >
                    출금하기
                  </div>
                </div>
              </div>
            </div>
            <putBankAccount
              v-else-if="props.propsType == 'userinfoPutAccount'"
              @update:propsShowModal="emit('update:propsShowModal', false)"
            />
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="propsShowModal"
      class="opacity-25 fixed inset-0 z-40 bg-black"
    ></div>
  </div>
</template>

<script lang="ts" setup>
import putBankAccount from "../modaldetail/putBankAccount.vue";
import putBankAccountWithdraw from "../modaldetail/putBankAccountInWithdraw.vue";
import { useVModel } from "@vueuse/core";
import { ref } from "vue";

const props = defineProps<{
  propsShowModal: boolean;
  propsType: string;
}>();

const amt = ref(40000);
const emit = defineEmits(["update:propsShowModal"]);
const propsShowModal = useVModel(props, "propsShowModal", emit);
</script>
<style scoped></style>
