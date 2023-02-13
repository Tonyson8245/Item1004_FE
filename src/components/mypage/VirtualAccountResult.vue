<template >
    <div class="pt-14 md:pt-0 w-full flex flex-col">
    <div class="flex">
      <div class="grow hidden md:block"></div>
      <div
        class="w-full md:flex-none md:w-[73.750rem] md:flex md:justify-center"
      >
        <div class="w-full md:w-[30.625rem] flex flex-col items-center py-10">
          <div>
            <img
              src="@/assets/icon/check_circle_green_full.svg"
              alt=""
              class="w-[1.875rem] md:w-[2.813rem]"
            />
          </div>
          <div class="text-base md:text-3xl font-bold mt-5 md:mt-7">
            가상계좌 발급 완료
          </div>
        </div>
      </div>
      <div class="grow hidden md:block"></div>
    </div>
    <div class="flex">
      <div
        class="grow bg-everly-light_grey border-t border-everly-mid_grey border-dashed"
      ></div>
      <div
        class="w-full md:flex-none md:w-[73.750rem] md:flex md:justify-center md:bg-[#f0f0f0] border-t border-everly-mid_grey border-dashed"
      >
        <div
          class="w-full md:w-[30.625rem] p-5 md:px-0 md:py-13  md:py-14 bg-everly-light_grey"
        >
          <div class="md:text-xl text-sm space-y-3 md:space-y-8">
            <div class="flex items-center">
              <div class="font-bold w-14 md:w-[9.6rem]">충전금액</div>

              <div class="grow text-right md:text-left md:ml-5">
                <div></div>
                <p class=" ml-auto">{{ commonFunction.comma(amount) }} 원</p>                
              </div>
            </div>


            <div class="flex items-center">
              <div class="font-bold w-14 md:w-[9.6rem]">충전예정 마일리지</div>

              <div class="grow text-right md:text-left md:ml-5">
                <div></div>
                <p class=" ml-auto">{{ commonFunction.comma(scheduledCharge) }} 원</p>                
              </div>
            </div>


            <div class="flex items-center">
              <div class="font-bold w-14 md:w-[9.6rem]">입금계좌</div>

              <div class="grow text-right md:text-left md:ml-5">
                <div></div>
                <p class=" ml-auto">({{ bankName }}) {{ bankAccount }}</p>                
              </div>
            </div>


            <div class="flex items-center">
              <div class="font-bold w-14 md:w-[9.6rem]">결제상태</div>

              <div class="grow text-right md:text-left md:ml-5">
                <div></div>
                <p class=" ml-auto">입금요청</p>                
              </div>
            </div>


            <div class="flex items-center">
              <div class="font-bold w-14 md:w-[9.6rem]">결제방법</div>

              <div class="grow text-right md:text-left md:ml-5">
                <div></div>
                <p class=" ml-auto">가상계좌</p>                
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="grow bg-everly-light_grey border-t border-everly-mid_grey border-dashed"
      ></div>
    </div>
    <div class="flex">
      <div class="grow hidden md:block border-t border-everly-mid_grey"></div>
      
      <div class="grow hidden md:block border-t border-everly-mid_grey"></div>
    </div>
    <div class="flex-grow"></div>
    <div>
      <div class="flex py-8 md:py-16">
        <div class="grow"></div>
        <div
          class="w-full md:flex-none md:w-[73.750rem] md:flex md:justify-center"
        >
          <div class="md:w-[30.625rem] p-4 md:p-0">
            <div
              class="bg-everly-main text-white text-base md:text-lg text-center p-3 rounded-lg cursor-pointer"
              @click="router.push('/')"
            >
              확인
            </div>
          </div>
        </div>
        <div class="grow"></div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import commonFunction from "@/common";
import { ref, onMounted } from "vue";

const route = useRoute();
const router = useRouter()

const amount = ref('')
const scheduledCharge = ref('')

const bankName = ref('')
const bankAccount = ref('')

onMounted(()=>{
    // 충전 할 금액
    if (route.query.amount !=null)      amount.value = route.query.amount?.toString()
    // 충전 예정 마일리지
    if(route.query.scheduledCharge !=null)    scheduledCharge.value = route.query.scheduledCharge?.toString()
    // 입금할 은행 명
    if(route.query.bankName !=null)   bankName.value = route.query.bankName?.toString()
    // 입금할 은행 계좌번호
    if(route.query.bankAccount !=null)    bankAccount.value = route.query.bankAccount?.toString()
    


})

</script>
<style >
    
</style>