<template>
  <div class="">
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
            <!-- 출금 계좌 인증 -->
            <WithdrawAccount
              v-if="props.propsType == 'withdrawPutAccount'"
              @update:propsShowModal="emit('update:propsShowModal', false)"
            />
            <div v-else-if="props.propsType == 'withdrawCheck'">
              <div
                class="w-11/12 min-w-[18rem] h-[10.9rem] sm:w-[30rem] md:w-[22.5rem] md:h-[18.3rem] p-4 text-xs text-center space-y-2 md:space-y-3.5 pt-5 md:text-base"
              >
                <div class="text-sm md:text-lg">
                  <div class="text-everly-main font-bold">
                    {{ (storewithdrawAmt - 1000).toLocaleString() }} 원
                  </div>
                  출금하시겠습니까?
                </div>
                <div>
                  {{ storeUserInfo.bankName }}
                  {{ storeUserInfo.bankAccount }} (예금주
                  {{ storeUserInfo.name }})
                </div>
                <div class="text-sm">
                  출금 계좌를 등록 실수로 발생하는 출금 오류는<br />
                  아이템천사에서 해결이 어려울 수 있습니다
                </div>
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
                    :class="
                      isConfirm ? 'bg-everly-main' : ' bg-everly-mid_grey'
                    "
                    class="flex-1 rounded-lg text-everly-white py-2 cursor-pointer"
                    @click="withdraw()"
                  >
                    확인완료
                  </div>
                </div>
              </div>
            </div>

            <!-- 가상 계좌 -->
            <ModalVirtualAccount
              v-else-if="props.propsType == 'virtualAccount'"
              @update:propsShowModal="emit('update:propsShowModal', false)"
            />

            <!-- TODO: 2023-02-12 18:53:15 동오야 이전에 쓰던거 일단 남겨놈 안 쓸거니깐 너가 확인하고 지워주라 -->
            <!-- <putBankAccount
              v-else-if="props.propsType == 'userinfoPutAccount'"
              @update:propsShowModal="emit('update:propsShowModal', false)"
            /> -->

            <!-- 출금 계좌 인증 -->

            <DeleteUserAccount
              v-else-if="props.propsType == 'deleteUserAccount'"
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
import WithdrawAccount from "@/components/mypage/modaldetail/WithdrawAccount.vue";
// import putBankAccount from "../modaldetail/putBankAccount.vue";
import putBankAccountWithdraw from "../modaldetail/putBankAccountInWithdraw.vue";
import { useVModel } from "@vueuse/core";
import { ref, watch } from "vue";
import { usemypageStore } from "@/store/modules/mypage/mypageStore";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import ModalVirtualAccount from "@/components/mypage/modaldetail/VirtualAccount.vue";
import DeleteUserAccount from "../modaldetail/deleteUserAccount.vue";
import * as paymentApi from "@/api/payment-service";
import { useMediaQuery } from "@vueuse/core";

const isConfirm = ref(true);

const router = useRouter();
const props = defineProps<{
  propsShowModal: boolean;
  propsType: string;
}>();

const emit = defineEmits(["update:propsShowModal"]);
const propsShowModal = useVModel(props, "propsShowModal", emit);

const mypageStore = usemypageStore();
const { storewithdrawAmt, storeUserInfo } = storeToRefs(mypageStore);

console.log("storewithdrawAmt : ", storewithdrawAmt);

function withdraw() {
  isConfirm.value = false;
  // 출금하기에 보내는 돈 원금 1만원
  paymentApi
    .withDrawSubmit(storewithdrawAmt.value.toString())
    // .then((res) => {
    //   console.log(res);
    //   if (res) router.push("/mypage/mileage/withdraw/result");
    //   else {
    //     alert("출금 신청이 실패되었습니다.");
    //     router.push("/mypage/mileage/withdraw");
    //   }
    //   mypageStore.setstorewithdrawAmt(0);
    // });
    .then((res) => {
      console.log(res);
      console.log("완료", res);
      alert("출금신청이 완료 됐습니다. 등록된 휴대폰의 문자를 확인해주세요.");
      pageReload();
    })
    .catch((err) => {
      console.log(err);
      // if (err.code === 404) {
      //   alert('계좌인증에 실패했습니다. 은행명, 계좌번호, 예금주명을 확인해주세요')
      // } else if (err.code === 400) {
      //   alert('요청값이 존재하지 않거나 형식이 올바르지 않습니다.')
      // }
      // else alert('알 수 없는 오류가 발생했습니다. 관리자에게 문의해주세요.')
      isConfirm.value = true;
      alert("오류가 발생했습니다. 고객센터로 문의해주세요");
    });
}

function pageReload() {
  // 모바일 뒤로가기
  if (useMediaQuery("(min-width: 768px)")) history.back();
  // 데스트탑 새로고침
  else location.reload();
}
</script>
<style scoped></style>
