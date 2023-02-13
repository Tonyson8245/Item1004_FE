<template>
    <!-- 모바일 은행 선택 리스트 모달 -->
    <modalList
        :propsShowModal="isBankListModal"
        :propsType="''"
        :propsList="bankList"
        @update:propsShowModal="showBankListModal(false); getValue($event);"
    />
    <div
      class="w-full md:w-[51.875rem] space-y-3 bg-everly-light_grey md:bg-everly-white md:py-4 md:rounded-lg"
    >
        
      <div class="bg-everly-white py-5 md:py-1 px-4 md:px-5">
        
        <div
          class="text-sm md:text-xl font-bold flex items-center justify-between"
        >
          <h1 class="hidden md:flex items-center text-xl">
            출금계좌 인증
          </h1>
          
          
          <img
            src="@/assets/icon/close_grey.svg"
            alt=""
            class="hidden md:block cursor-pointer"
            @click="emit('update:propsShowModal', false)"
          />
        </div>
        <div class="flex flex-col gap-1 md:my-3 mb-4">
            <b class=" text-everly-red-buy text-sm">*기재하신 정보로만 출금 가능합니다</b>
            <b class=" text-everly-red-buy text-sm">*유저 본인의 이름과 동일한 명의의 계좌만 출금계좌로 등록가능합니다</b>
        </div>
        <span class="flex items-center">
            <!-- <b class=" rounded-md border w-5 h-5 flex 
                       justify-center items-center text-xs mr-2 bg-everly-light_blue">1 </b> -->
            <h3 class=" font-bold">본인확인</h3>
        </span>
        <ul class="flex flex-col gap-2 mt-4">
            <li class="flex flex-col gap-1 md:gap-0 md:flex-row md:items-center">
                <span class="flex w-28">
                    <p class="text-everly-red-buy">*</p>      
                    <p class="">은행명</p> 
                </span>                
                <dropdownVue
                    :propsClass="'w-full text-sm'"
                    :propsList="bankList"
                    :propsPlaceholder="'은행을 선택해주세요'"
                    :propsDropdown="'h-52 overflow-y-scroll'"
                    @getValue="getValue($event)"
                    class="flex-auto hidden md:block"
                />
                <!-- 모바일일때 -->
                <div class="relative block sm:hidden" @click="showBankListModal(true)">
                    <button
                        class="text-everly-dark_grey py-3 rounded-lg border border-everly-mid_grey text-xs md:text-sm bg-white text-left pl-3 pr-8 flex justify-between w-full"
                    >
                    {{ bankName == "" ? "은행명을 입력해주세요" : bankName }}
                    </button>
                    <i class="fas fa-chevron-down absolute right-3 top-3.5 text-everly-dark_grey"></i>
                </div>
                <!-- <input class="border border-everly-mid_grey rounded-lg md:rounded-md flex-auto py-2 px-4 md:h-12 " type="text"> -->
            </li>
            <li class="flex flex-col gap-1 md:gap-0 md:flex-row md:items-center">
                <span class="flex md:w-28">
                  <p class="text-everly-red-buy">*</p>      
                  <p class="">계좌번호</p>
              </span>                
              <input v-model="accountNumber" :disabled="isAccountVerified" placeholder="(-) 없이 번호만 입력해주세요" class="border border-everly-mid_grey rounded-lg md:rounded-md flex-auto py-2 px-4 md:h-12 " type="text">
            </li>           

            <li class="flex flex-col gap-1 md:gap-0 md:flex-row md:items-center">
                <span class="flex w-28">
                    <p class="text-everly-red-buy">*</p>      
                    <p class="">예금주명</p> 
                </span>
                <span class="flex flex-auto">
                    <input  v-bind:value="accountOwner" :disabled="isAccountVerified" v-on:input="setAccountOwner" class="border border-everly-mid_grey rounded-lg md:rounded-md flex-auto py-2 px-4 md:h-12 mr-3 md:mr-0" type="text">
                    <!-- 모바일 인증 -->
                    <button class="md:hidden py-2 px-3 ml-auto border rounded-lg bg-everly-mid_grey text-white">계좌인증</button>
                    <!-- :class="{'bg-everly-main cursor-pointer': isSendVerifyWord }"  -->
                    <button  :class="isSendVerifyWord ? 'bg-everly-main cursor-pointer hover:shadow-lg hover:opacity-75' : 'bg-everly-mid_grey cursor-not-allowed'"
                             class="hidden md:block h-12 w-48 ml-2 borde text-white text-sm rounded-md "
                             :disabled="!isSendVerifyWord"
                             @click="sendVerifyWordButton">1원 인증</button>          
                </span>
            </li>            
            <li  class="flex flex-col md:flex-row md:items-center">
                <span class="flex w-28">
                    <p class=" text-everly-red-buy">*</p>      
                    <p class="">인증단어</p>                   
                </span>                
                <span class="flex flex-auto ">
                    <div class="flex items-center border border-everly-mid_grey rounded-lg md:rounded-md flex-auto py-2 px-4 md:h-12 mr-3 md:mr-0">
                      <input :disabled="isAccountVerified" maxlength="4" v-bind:value="verifyWord" v-on:input="setVerifyWord"  class=" flex-auto focus:outline-none" type="text">
                      <p v-if="timer.isRunning.value" class="text-everly-red-buy">{{ timer.minutes }}:{{ timer.seconds }}</p>
                      <!-- <timer class=" text-everly-sub_blue"/> -->
                      <!-- <p>{{ time }}</p> -->
                    </div>
                    <!-- 모바일 인증 -->
                    <button class="md:hidden py-2 px-3 ml-auto border rounded-lg bg-everly-mid_grey text-white" >인증하기</button>
                    <button :class="isVerifyWord ? 'bg-everly-main cursor-pointer hover:shadow-lg hover:opacity-75' : 'bg-everly-mid_grey cursor-not-allowed'"
                             class="hidden md:block h-12 w-48 ml-2 borde text-white text-sm rounded-md "
                            :disabled="!isVerifyWord">인증하기</button>                
                </span>

            </li>
            <li  class="flex flex-col md:flex-row md:items-center">
                <span class="flex w-28">                               
                </span>     
                <p v-if="!isAccountVerified" class=" text-sm text-everly-dark_grey">* 가장 최근 계좌에 1원을 보낸 4자리 단어를 입력해주세요</p>
                <!-- isAccountVerified -->
               <p v-if="isAccountVerified" class=" text-sm text-everly-main font-bold">*계좌가 인증됐습니다</p>
                
            </li>
            <li>
            </li>
        </ul>
      </div>
      <hr class="border-everly-light_grey border hidden md:block mx-4" />
      
  
      <div class="bg-everly-white py-7 md:py-1 px-4 md:px-5 space-y-3">
       
        <div class="md:px-56 space-y-2">
          <div
          :class="isRequireedAll ? 'bg-everly-main cursor-pointer hover:shadow-lg hover:opacity-75' : 'bg-everly-mid_grey cursor-not-allowed'"
            class="text-center py-2.5 rounded-lg border bg-everly-mid_grey text-white "
            @click="requestVirtualAccount"
          >
            인증하기
          </div>
          
        </div>
      </div>
    </div>
  </template>
  
<script setup lang="ts">
import { useMediaQuery } from "@vueuse/core";
import { ref, computed, watch, onMounted, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { usemypageStore } from "@/store/modules/mypage/mypageStore";
import dropdownVue from "@/components/common/dropdown.vue";
import modalList from "../components/modalList.vue";
import * as paymentApi from "@/api/payment-service";
import { useTimer } from 'vue-timer-hook';
import { usePaymentStore } from "@/store/modules/home/paymentStore";
import { storeToRefs } from "pinia";



// 모달 끄고 닫기 에밋
const emit = defineEmits(["update:propsShowModal"]);

const paymentStore = usePaymentStore();

const {  storeVirtualAccountChargeAmount } = storeToRefs(paymentStore);
const router = useRouter()

//은행이름
const bankName = ref("");
// 계좌번호
const accountNumber = ref("");
// 예금주명, 계좌번호 주인
const accountOwner = ref("");
//은행 리스트 보여주기 플래그
const isBankListModal = ref(false);
// 1원 인증 단어 보내기 플래그
const isSendVerifyWord = ref(false);
// 인증단어 4자리 입력 시 계좌 인증하기 플래그
const isVerifyWord = ref(false)
// 인증ID
const authId = ref("")

// 4자리 인증 단어
const verifyWord = ref('')
// 계좌 인증 완료 여부 플래그
const isAccountVerified = ref(false)
// 발급 받기 활성화를 위한 필수 입력변수들 충족 플래그
const isRequireedAll = ref(false)

// const time = ref(300);


// 카운트 시간
const time = new Date();
// console.log("시간은 : ", time.getSeconds());

time.setSeconds(time.getSeconds() + 200); // 5분
//@ts-ignore
// 인증 카운터
const timer =  useTimer(time);


timer.pause();


function setAccountOwner(event:Event) {
  accountOwner.value = (event.target as HTMLInputElement).value
}

function setVerifyWord(event:Event) {
  verifyWord.value = (event.target as HTMLInputElement).value
}


function showBankListModal(status: boolean) {
  isBankListModal.value = status;
}
//드롭다운 데이터 가져오기
function getValue(event: string) {
  bankName.value = event;
}

// TODO: 계좌번호랑 예금주 하나라도 입력 되면은 1원 인증 버튼 active 해라이!
watch([accountNumber,accountOwner,bankName], ([aN, aO, bN])=>{  
  if (aN!=='' && aO!=='' &&  bN!=='') isSendVerifyWord.value=true      
  else isSendVerifyWord.value=false;
})

// 1원인증 전송 버튼
async function sendVerifyWordButton() {
  // if (!isSendVerifyWord.value) return
  // api 1원인증코드 보내기
  isSendVerifyWord.value = false;
  await paymentApi.sendWithDrawAccountVerifyWord(bankName.value, accountNumber.value, accountOwner.value)
  // await paymentApi.sendWithDrawAccountVerifyWord('신한은행', '110374495753', '이광호')
        .then((res) => {
          console.log(res);
          // authId.value = res
            // 타이머 동작
            timer.restart();          
        })
        .catch((err) => {
          console.log(err);
          isSendVerifyWord.value = true;
          if (err.code === 400) {
            alert('계좌인증에 실패했습니다. 은행명, 계좌번호, 예금주명을 확인해주세요')
          } else if (err.code === 404) {
            alert('토큰 오류가 발생했습니다. 다시 로그인 후 진행해주세요')
          }
          else {
            alert('알 수 없는 오류가 발생했습니다. 관리자에게 문의해주세요.')

          }
        });
}

// 계좌 인증하기 버튼
// async function verifyAccount() {
//   await paymentApi.accountVerify(verifyTrDt.value,verifyTrNo.value, verifyWord.value)
//         .then((res) => {
//           console.log(res);
//           // 계좌 인증 성공 시 인증버튼 비활성화 && 카운트다운 스탑
//           isAccountVerified.value = true;
//           isVerifyWord.value = false
//           timer.pause()
//         }).catch((err) => {
//           console.log(err);
//           if (err.code === 400) {
//             alert('요청값이 존재하지 않거나 형식이 올바르지 않습니다.')
//           }
//         });
// }

watch([verifyWord], ([vW])=> {  
  // 인증하기 4단어 입력 시 인증하기 활성화
  if (vW.length === 4) isVerifyWord.value = true;
  else isVerifyWord.value = false; 
})



// watch(timer.isExpired, (tIE)=>{
//    // 타이머 시간 초과 시 새로고침
//    if(tIE) {
//     alert("계좌인증시간이 초과하였습니다. 다시 시도해주세요.");
//     location.reload();
//   }  
// })




async function requestVirtualAccount() {

  if (isRequireedAll.value ) {
    // 버튼 비활성화
    isRequireedAll.value = false
    await paymentApi.requestVirtualAccount(accountOwner.value, storeVirtualAccountChargeAmount.value, bankName.value, accountNumber.value)
        .then((res) => {
          console.log(res);
          router.push(`/mypage/mileage/charge/virtualAccountResult?amount=${res.amount}&scheduledCharge=${res.scheduledCharge}&bankName=${res.bankName}&bankAccount=${res.bankAccount}`)          
        }).catch((err) => {
          console.log(err);
          if (err.code === 400) {
            alert('요청값이 존재하지 않거나 형식이 올바르지 않습니다.')
          }
        });
  }
}






//은행 명들
const bankList = [
    "산업은행",
    "기업은행",
    "국민은행",
    "외환은행",
    "수협중앙회",
    "농협",
    "우리은행",
    "SC은행",
    "한국씨티은행",
    "대구은행",
    "부산은행",
    "광주은행",
    "제주은행",
    "전북은행",
    "경남은행",
    "새마을금고중앙회",
    "신협중앙회",
    "BOA은행",
    "우체국",
    "하나은행",
    "신한은행",
    "카카오은행",
    "유안타증권",
    "미래대우증권",
    "삼성증권",
    "NH투자증권",
    "키움증권",
    "대신증권",
    "한화투자증권",
    "신한금융투자",
    "유진투자증권",
    "메리츠증권",
]



</script>

<style scoped>

</style>
