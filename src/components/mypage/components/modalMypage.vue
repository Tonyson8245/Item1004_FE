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
          <putBankAccountWithdraw
            v-if="props.propsType == 'withdraw'"
            @update:propsShowModal="emit('update:propsShowModal', false)"
          />
          <putBankAccount
            v-else
            @update:propsShowModal="emit('update:propsShowModal', false)"
          />
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

const props = defineProps<{
  propsShowModal: boolean;
  propsType: string;
}>();
const emit = defineEmits(["update:propsShowModal"]);
const propsShowModal = useVModel(props, "propsShowModal", emit);
</script>
<style scoped></style>
