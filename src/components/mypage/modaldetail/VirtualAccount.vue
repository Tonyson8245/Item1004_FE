<template>
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
            class="hidden md:block"
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
            <h3 class=" font-bold"> 본인확인</h3>
        </span>
        <ul class="flex flex-col gap-2 mt-4">
            <li class="flex flex-col gap-1 md:gap-0 md:flex-row md:items-center">
                <span class="flex w-28">
                    <p class=" text-everly-red-buy">*</p>      
                    <p class="">은행명</p> 
                </span>                
                <input class="border border-everly-mid_grey rounded-lg md:rounded-md flex-auto py-2 px-4 md:h-12 " type="text">
            </li>
            <li class="flex flex-col gap-1 md:gap-0 md:flex-row md:items-center">
                <span class="flex w-28">
                    <p class=" text-everly-red-buy">*</p>      
                    <p class="">계좌번호</p> 
                </span>                
                <input class="border border-everly-mid_grey rounded-lg md:rounded-md flex-auto py-2 px-4 md:h-12 " type="text">
            </li>
            <li class="flex flex-col gap-1 md:gap-0 md:flex-row md:items-center">
                <span class="flex w-28">
                    <p class=" text-everly-red-buy">*</p>      
                    <p class="">예금주명</p> 
                </span>
                <span class="flex flex-auto">
                    <input class="border border-everly-mid_grey rounded-lg md:rounded-md flex-auto py-2 px-4 md:h-12 mr-3 md:mr-0" type="text">
                    <!-- 모바일 인증 -->
                    <button class="md:hidden py-2 px-3 ml-auto border rounded-lg bg-everly-mid_grey text-white">계좌인증</button>
                    <button class="hidden md:block h-12 w-48 ml-2 border bg-everly-main text-white text-sm rounded-md">1원 인증</button>          
                </span>
            </li>            
            <li class="flex flex-col md:flex-row md:items-center">
                <span class="flex w-28">
                    <p class=" text-everly-red-buy">*</p>      
                    <p class="">인증단어</p>
                </span>                
                <input class="border border-everly-mid_grey rounded-lg md:rounded-md flex-auto py-2 px-4 md:h-12 " type="text">                
                <button class="hidden md:block h-12 w-48 ml-2 border bg-everly-main text-white text-sm rounded-md">인증하기</button>
               
            </li>
            <li class="flex flex-col md:flex-row md:items-center">
                <span class="flex w-28">                               
                </span>       
                <p class=" text-sm text-everly-dark_grey">* 계좌에 1원을 보낸 4자리 단어를 입력해주세요</p>
                 <!-- 모바일 인증 -->
                 <button class="md:hidden mt-2 h-12 px-3 ml-auto border rounded-lg bg-everly-mid_grey text-white text-sm">인증하기</button>
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
                <input class="border border-everly-mid_grey rounded-lg md:rounded-md flex-auto py-2 px-4 md:h-12 " type="text">
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
            :class="buttonClass"
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
  
  const emit = defineEmits(["update:propsShowModal"]);
  const mypageStore = usemypageStore();
  const router = useRouter();
  const reasonList = [
    "서비스의 오류가 많음",
    "사용하기 불편함",
    "거래글 갯수가 적음",
    "다른 서비스가 더 좋음",
    "사용빈도가 낮음",
    "개인정보가 걱정됨",
    "물품이 안팔림",
    "사용 빈도가 너무 높음",
  ];
  
 
  
  //탈퇴하기 버튼 상태
  const buttonClass = ref(
    "bg-everly-mid_grey text-everly-white cursor-not-allowed"
  );
  
  //최종 탈퇴 선택지
  const withdrawlConfirm = ref(false);
  const checkedReason = ref([]); // 선택도니 탈퇴 사유 리스트
  
  const etcContent = ref(""); // 기타 내용
  const etcContentLength = ref(0); //기타 글 길이
  
  watch(etcContent, (text) => {
    etcContentLength.value = text.length;
  });
  const isActiveEtc = ref(false); // 기타 활성화 여부
  
  // 텍스트에어리어 색깔
  const textareaClass = (status: boolean) => {
    if (status) return "";
    else return "bg-everly-wbg_grey";
  };
  
  function inserttoetcContent(event: Event) {
    var limit = 200;
    if ((event.target as HTMLInputElement).value.length <= limit) {
      etcContent.value = (event.target as HTMLInputElement).value;
    } else etcContent.value = etcContent.value.substring(0, limit);
  }
  
  //탈퇴하기 활성화
  watch([withdrawlConfirm, checkedReason, etcContent, isActiveEtc], () => {
    if (
      withdrawlConfirm.value &&
      (checkedReason.value.length > 0 ||
        etcContent.value.length > 0 === isActiveEtc.value) //xnor 연산 둘다 true 거나 false 일때만 true
    ) {
      buttonClass.value = "bg-everly-main text-everly-white cursor-pointer";
    } else {
      buttonClass.value =
        "bg-everly-mid_grey text-everly-white cursor-not-allowed";
    }
  });
  
  
  </script>
  
  <style scoped>
  
  </style>
  