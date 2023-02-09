<template>
    <!-- 모바일 은행 선택 리스트 모달 -->
    <!-- <modalList
        :propsShowModal="showModal"
        :propsType="''"
        :propsList="bankList"
        @update:propsShowModal="showList(false); getValue($event);"
    /> -->
    <div
      class="w-full md:w-[51.875rem] space-y-3 bg-everly-light_grey md:bg-everly-white md:py-4 md:rounded-lg"
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
                <span class="flex w-28">
                    <p class="text-everly-red-buy">*</p>      
                    <p class="">계좌번호</p> 
                </span>                
                <input v-model="accountNumber" class="border border-everly-mid_grey rounded-lg md:rounded-md flex-auto py-2 px-4 md:h-12 " type="text">
            </li>
            <li class="flex flex-col gap-1 md:gap-0 md:flex-row md:items-center">
                <span class="flex w-28">
                    <p class="text-everly-red-buy">*</p>      
                    <p class="">예금주명</p> 
                </span>
                <span class="flex flex-auto">
                    <input v-bind="accountOwner" v-on="accountOwner" class="border border-everly-mid_grey rounded-lg md:rounded-md flex-auto py-2 px-4 md:h-12 mr-3 md:mr-0" type="text">
                    <!-- 모바일 인증 -->
                    <button class="md:hidden py-2 px-3 ml-auto border rounded-lg bg-everly-mid_grey text-white">계좌인증</button>
                    <button class="hidden md:block h-12 w-48 ml-2 border bg-everly-mid_grey text-white text-sm rounded-md cursor-not-allowed">1원 인증</button>          
                </span>
            </li>            
            <li class="flex flex-col md:flex-row md:items-center">
                <span class="flex w-28">
                    <p class=" text-everly-red-buy">*</p>      
                    <p class="">인증단어</p>
                </span>                
                <span class="flex flex-auto">
                    <input class="border border-everly-mid_grey rounded-lg md:rounded-md flex-auto py-2 px-4 md:h-12 mr-3 md:mr-0" type="text">
                    <!-- 모바일 인증 -->
                    <button class="md:hidden py-2 px-3 ml-auto border rounded-lg bg-everly-mid_grey text-white">인증하기</button>
                    <button class="hidden md:block h-12 w-48 ml-2 border bg-everly-main text-white text-sm rounded-md">인증하기</button>          
                </span>

            </li>
            <li class="flex flex-col md:flex-row md:items-center">
                <span class="flex w-28">                               
                </span>       
                <p class=" text-sm text-everly-dark_grey">* 계좌에 1원을 보낸 4자리 단어를 입력해주세요</p>
                 <!-- 모바일 인증 -->
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
                <input class="border border-everly-mid_grey rounded-lg md:rounded-md flex-auto py-2 px-4 md:h-12 " type="text">
            </li>
            
        </ul>
      </div>
      <hr class="border-everly-light_grey border hidden md:block mx-4" />
  
      <div class="bg-everly-white py-7 md:py-1 px-4 md:px-5 space-y-3">
        <div class="font-bold">약관 동의</div>
        <div class="flex items-center cursor-pointer">
          <img src="@/assets/icon/check_circle.svg" class=" mr-1" alt="체크박스"/>
          <span class="md:pl-1">
            전체동의
          </span>
        </div>
        <div class="flex items-center cursor-pointer">
          <img src="@/assets/icon/check_circle.svg" class=" mr-1" alt="체크박스"/>
          <span class="md:pl-1">
            가상계좌 발급 고객동의 (필수)
          </span>
        </div>
        <div class="flex items-center cursor-pointer">
          <img src="@/assets/icon/check_circle.svg" class=" mr-1" alt="체크박스"/>
          <span class="md:pl-1">
            가상계좌 발급 확인 안내 (필수)
          </span>
        </div>
        <div class="md:px-56 space-y-2">
          <div
            class="text-center py-2.5 rounded-lg"
            
          >
            발급받기
          </div>
          
        </div>
      </div>
    </div>
  </template>
  
<script setup lang="ts">
import { useMediaQuery } from "@vueuse/core";
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { usemypageStore } from "@/store/modules/mypage/mypageStore";
import dropdownVue from "@/components/common/dropdown.vue";
import modalList from "../components/modalList.vue";


const emit = defineEmits(["update:propsShowModal"]);
const router = useRouter();

//은행이름
const bankName = ref("");
// 계좌번호
const accountNumber = ref("");
// 예금주명 , 계좌번호 주인
const accountOwner = ref("");
//은행 리스트 리스트 보여주기
const isBankListModal = ref(false);

function showBankListModal(status: boolean) {
  isBankListModal.value = status;
}
//드롭다운 데이터 가져오기
function getValue(event: string) {
  bankName.value = event;
}

watch([accountNumber,accountOwner], ([number,name])=>{
  console.log(number, name);  
})

// watch(accountOwner, (value)=>{
//   console.log(value);
// })

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
