<template>
    <!-- 모바일 은행 선택 리스트 모달 -->
    <modalList
        :propsShowModal="isBankListModal"
        :propsType="''"
        :propsList="bankList"
        @update:propsShowModal="showBankListModal(false); getValue($event);"
    />
    <div
      class="w-full mt-10 md:mt-0 md:w-[51.875rem] space-y-3 bg-everly-light_grey md:bg-everly-white md:py-4 md:rounded-lg"
    >
        
      <div class="bg-everly-white py-5 md:py-1 px-4 md:px-5">
        
        <div
          class="text-sm md:text-xl font-bold flex items-center justify-between"
        >
          <h1 class="hidden md:flex items-center text-xl">
            가상계좌 발급
          </h1>
    
          <img
            src="@/assets/icon/close_grey.svg"
            alt=""
            class="hidden md:block cursor-pointer"
            @click="emit('update:propsShowModal', false)"
          />
        </div>
        <div class="flex flex-col gap-1 md:my-3 mb-4">
            <b class=" text-everly-red-buy text-sm">*기재하신 정보로만 입금 가능합니다</b>
            <b class=" text-everly-red-buy text-sm">*1회 이체한도 3,000,000원</b>
        </div>
        <span class="flex items-center">
            <b class=" rounded-md border w-5 h-5 flex 
                       justify-center items-center text-xs mr-2 bg-everly-light_blue">1 </b>
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
                    :class="isAccountVerified ? 'pointer-events-none' : 'pointer-events-auto'"                 
                />
                <!-- 모바일일때 -->
                <div :disabled="isAccountVerified" class="relative block md:hidden" @click="showBankListModal(true)">
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
              <input oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" v-model="accountNumber" :disabled="isAccountVerified" placeholder="(-) 없이 번호만 입력해주세요" class="border border-everly-mid_grey rounded-lg md:rounded-md flex-auto py-2 px-4 md:h-12 " type="text">
            </li>           

            <li class="flex flex-col gap-1 md:gap-0 md:flex-row md:items-center">
                <span class="flex w-28">
                    <p class="text-everly-red-buy">*</p>      
                    <p class="">예금주명</p> 
                </span>
                <span class="flex flex-auto">
                    <input  v-bind:value="accountOwner" :disabled="isAccountVerified" v-on:input="setAccountOwner" class="border border-everly-mid_grey rounded-lg md:rounded-md flex-auto py-2 px-4 md:h-12 mr-3 md:mr-0" type="text">
                    <!-- 모바일 인증 -->
                    <button 
                    :class="isSendVerifyWord ? 'bg-everly-main cursor-pointer hover:shadow-lg hover:opacity-75' : 'bg-everly-mid_grey cursor-not-allowed'"
                    :disabled="!isSendVerifyWord" 
                    class="md:hidden py-2 px-3 ml-auto border rounded-lg bg-everly-mid_grey text-white"
                    @click="sendVerifyWordButton"
                    >계좌인증</button>
                    <!-- :class="{'bg-everly-main cursor-pointer': isSendVerifyWord }"  -->
                    <button  :class="isSendVerifyWord ? 'bg-everly-main cursor-pointer hover:shadow-lg hover:opacity-75' : 'bg-everly-mid_grey cursor-not-allowed'"
                             class="hidden md:block h-12 w-48 ml-2 borde text-white text-sm rounded-md "
                             :disabled="!isSendVerifyWord"
                             @click="sendVerifyWordButton">1원 인증</button>          
                </span>
            </li>            
            <li v-if="verifyTrDt != ''" class="flex flex-col md:flex-row md:items-center">
                <span class="flex w-28">
                    <p class=" text-everly-red-buy">*</p>      
                    <p class="">인증단어</p>                   
                </span>                
                <span class="flex flex-auto ">
                    <div class="flex items-center border border-everly-mid_grey rounded-lg md:rounded-md flex-auto py-2 px-4 md:h-12">
                      <input :disabled="isAccountVerified" maxlength="4" v-bind:value="verifyWord" v-on:input="setVerifyWord"  class=" flex-auto focus:outline-none" type="text">
                    </div>
                    <!-- 모바일 인증 -->
                    <button 
                      :disabled="!isVerifyWord"
                      :class="isVerifyWord ? 'bg-everly-main cursor-pointer hover:shadow-lg hover:opacity-75' : 'bg-everly-mid_grey cursor-not-allowed'"
                      class="md:hidden py-2 px-3 ml-auto border rounded-lg text-white" 
                      @click="verifyAccount">인증하기</button>

                    <button 
                      :disabled="!isVerifyWord" 
                      :class="isVerifyWord ? 'bg-everly-main cursor-pointer hover:shadow-lg hover:opacity-75' : 'bg-everly-mid_grey cursor-not-allowed'"
                      class="hidden md:block h-12 w-48 ml-2 borde text-white text-sm rounded-md "                      
                      @click="verifyAccount">인증하기</button>  

                </span>

            </li>
            <li v-if="verifyTrDt != ''" class="flex flex-col md:flex-row md:items-center">
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
      <div class="bg-everly-white py-7 md:py-1 px-4 md:px-5 space-y-2">
        <span class="flex items-center">
            <b class=" rounded-md border w-5 h-5 flex 
                       justify-center items-center text-xs mr-2 bg-everly-light_blue">2</b>
            <h3 class=" font-bold">신청정보</h3>
        </span>
        <ul class="flex flex-col gap-2 mt-4">
            <li class="flex flex-col gap-1 md:gap-0 md:flex-row md:items-center">
                <span class="flex w-28">
                    <p class=" text-everly-red-buy">*</p>      
                    <p class="">입금 은행명</p> 
                </span>                
                <input class="border border-everly-mid_grey rounded-lg md:rounded-md flex-auto py-2 px-4 md:h-12 " value="경남은행" disabled type="text">
            </li>
            <li class="flex flex-col gap-1 md:gap-0 md:flex-row md:items-center">
                <span class="flex w-28">
                    <p class=" text-everly-red-buy">*</p>      
                    <p class="">입금 예정 금액</p> 
                </span>                
                <input disabled :value=" commonFunction.comma(storeVirtualAccountChargeAmount)" class="border border-everly-mid_grey rounded-lg md:rounded-md flex-auto py-2 px-4 md:h-12 " type="text">
            </li>
            
        </ul>
      </div>
      <hr class="border-everly-light_grey border hidden md:block mx-4" />
  
      <ul class="bg-everly-white py-7 md:py-1 px-4 md:px-5 space-y-3">
        <div class="font-bold">약관 동의</div>
        <li class="flex items-center cursor-pointer" @click="setIsCheckAllAgreement">
          <img :src="isCheckAllAgreement? '../../../assets/icon/check_circle_blue.svg':'../../../assets/icon/check_circle.svg'" class=" w-5 mr-1" alt="체크박스"/>
          <span class="md:pl-1">
            전체동의
          </span>
        </li>
        <li class="flex items-center cursor-pointer" @click="setIsCheckCustomerAgreement">
          <img :src="isCheckCustomerAgreement? '../../../assets/icon/check_circle_blue.svg':'../../../assets/icon/check_circle.svg'" class=" w-5 mr-1" alt="체크박스"/>
          <span class="md:pl-1">
            가상계좌 발급 고객동의 (필수)
          </span>
          <VirtualAccountAgreementCustomer />
          <!-- <button class=" text-sm ml-3"> 전문보기</button> -->
        </li>
        <li class="flex items-center cursor-pointer" @click="setIsCheckAcountAgreement">
          <img :src="isCheckAcountAgreement? '../../../assets/icon/check_circle_blue.svg':'../../../assets/icon/check_circle.svg'" class=" w-5 mr-1" alt="체크박스"/>
          <span class="md:pl-1">
            가상계좌 발급 확인 안내 (필수)
          </span>
          <VirtualAccountAgreementConfirm/>
        </li>
        <div class="md:px-56 space-y-2">
          <div
          :class="isRequireedAll ? 'bg-everly-main cursor-pointer hover:shadow-lg hover:opacity-75' : 'bg-everly-mid_grey cursor-not-allowed'"
            class="text-center py-2.5 rounded-lg border bg-everly-mid_grey text-white "
            @click="requestVirtualAccount"
          >
            발급받기
          </div>
          
        </div>
      </ul>
    </div>
  </template>
  
<script setup lang="ts">
import { useMediaQuery } from "@vueuse/core";
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { usemypageStore } from "@/store/modules/mypage/mypageStore";
import dropdownVue from "@/components/common/dropdown.vue";
import modalList from "../components/modalList.vue";
import * as paymentApi from "@/api/payment-service";
import { usePaymentStore } from "@/store/modules/home/paymentStore";
import { storeToRefs } from "pinia";
import commonFunction from "@/common";
import VirtualAccountAgreementCustomer from "@/components/teleport/VirtualAccountAgreementCustomer.vue";
import VirtualAccountAgreementConfirm from "@/components/teleport/VirtualAccountAgreementConfirm.vue"

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
// 검증 거래일자
const verifyTrDt = ref("")
// 검증 거래번호
const verifyTrNo = ref("")
// 4자리 인증 단어
const verifyWord = ref('')
// 계좌 인증 완료 여부 플래그
const isAccountVerified = ref(false)
// 전체 동의 여부 플래그
const isCheckAllAgreement = ref(false)
// 가상계좌 발급 고객동의 플래그
const isCheckCustomerAgreement = ref(false)
// 가상계좌 발급 확인 안내 플래그
const isCheckAcountAgreement = ref(false)
// 발급 받기 활성화를 위한 필수 입력변수들 충족 플래그
const isRequireedAll = ref(false)

function setAccountOwner(event:Event) {
  accountOwner.value = (event.target as HTMLInputElement).value
}

function setVerifyWord(event:Event) {
  verifyWord.value = (event.target as HTMLInputElement).value
}
// 전체 동의 버튼
function setIsCheckAllAgreement() {
  isCheckAllAgreement.value = !isCheckAllAgreement.value;
  if (isCheckAllAgreement.value) {
    isCheckCustomerAgreement.value=true
    isCheckAcountAgreement.value=true
  }else  {
    isCheckCustomerAgreement.value=false
    isCheckAcountAgreement.value=false
  }
}
function setIsCheckCustomerAgreement() {
  isCheckCustomerAgreement.value = !isCheckCustomerAgreement.value;
  // 전체 동의 체크 해제
  if (!isCheckCustomerAgreement.value && isCheckAllAgreement.value) {
    isCheckAllAgreement.value=false
  }
  if(isCheckCustomerAgreement.value && isCheckAcountAgreement.value) isCheckAllAgreement.value=true;
}
function setIsCheckAcountAgreement() {
  isCheckAcountAgreement.value = !isCheckAcountAgreement.value;
  // 전체 동의 체크 해제
  if (!isCheckAcountAgreement.value && isCheckAllAgreement.value) {
    isCheckAllAgreement.value=false
  }
  if(isCheckCustomerAgreement.value && isCheckAcountAgreement.value) isCheckAllAgreement.value=true;
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
  await paymentApi.sendVirtualAccountVerifyWord(bankName.value, accountNumber.value, accountOwner.value)
        .then((res) => {
          console.log(res);
            verifyTrDt.value = res.verifyTrDt
            verifyTrNo.value = res.verifyTrNo
        })
        .catch((err) => {
          console.log(err);
          isSendVerifyWord.value = true;
          if (err.code === 404) {
            alert('계좌인증에 실패했습니다. 은행명, 계좌번호, 예금주명을 확인해주세요')
          } else if (err.code === 400) {
            alert('요청값이 존재하지 않거나 형식이 올바르지 않습니다.')
          }
          else alert('알 수 없는 오류가 발생했습니다. 관리자에게 문의해주세요.')
        });
}

// 계좌 인증하기 버튼
async function verifyAccount() {
  await paymentApi.virtualAccountVerify(verifyTrDt.value,verifyTrNo.value, verifyWord.value)
        .then((res) => {
          console.log(res);
          // 계좌 인증 성공 시 인증버튼 비활성화 && 카운트다운 스탑
          isAccountVerified.value = true;
          isVerifyWord.value = false
        }).catch((err) => {
          console.log(err);
          if (err.code === 400) {
            alert('요청값이 존재하지 않거나 형식이 올바르지 않습니다.')
          }
        });
}

watch([verifyWord], ([vW])=> {  
  // 인증하기 4단어 입력 시 인증하기 활성화
  if (vW.length === 4) isVerifyWord.value = true;
  else isVerifyWord.value = false; 
})



watch([isAccountVerified, isCheckCustomerAgreement, isCheckAcountAgreement], ([iAV, iCCA, iCAA])=>{
  if (iAV && iCCA && iCAA)  {
    isRequireedAll.value=true
  }
  else isRequireedAll.value=false
})

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


//사이즈 확인
const minSize = computed(() => {
  return useMediaQuery("(min-width: 768px)");
});


function pageReload() {
   // 모바일 뒤로가기
  if (useMediaQuery("(min-width: 768px)")) history.back()
  // 데스트탑 새로고침
  else  location.reload();
}
//은행 명들
const bankList = [
    "산업은행",
    "기업은행",
    "KB국민은행",
    "수협은행",
    "NH농협은행",
    "농협중앙회",
    "우리은행",
    "SC제일은행",
    "한국씨티",
    "대구은행",
    "부산은행",
    "광주은행",
    "제주은행",
    "전북은행",
    "경남은행",
    "새마을금고중앙회",
    "신협중앙회",
    "산림조합중앙회",
    "우체국",
    "하나은행",
    "신한은행",
    "케이뱅크",
    "카카오뱅크",
    "토스뱅크",
]
</script>

<style scoped>

</style>
