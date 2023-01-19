<template>
  <div @click="setshowMileageGuide()">
    <div class="py-4 px-4 md:py-0 md:px-0 md:pl-8 bg-everly-wbg_grey">
      <div class="hidden md:block pb-4 font-bold text-xl">마일리지 출금</div>
      <div>
        <div class="text-sm md:text-base font-bold pb-3 md:pb-5">
          <span class="bg-everly-light_blue px-1 rounded font-normal mr-1"
            >1</span
          >
          출금 계좌 확인
        </div>
        <div
          class="sm:flex md:ml-6 justify-between items-center md:pr-96 text-xs md:text-base"
        >
          <div class="space-x-1 md:space-x-4 pb-4 sm:pb-4 sm:flex-1">
            <div v-if="accountCondition">
              <span>신한은행</span>
              <span>110-403-902006</span>
              <span>(예금주 : 오지윤)</span>
            </div>
            <div class="flex text-everly-dark_grey text-xs items-center">
              <div>
                <img
                  src="@/assets/icon/info_grey.svg"
                  alt=""
                  class="pr-1 w-4 sm:w-5"
                />
              </div>
              <div>마일리지 출금을 위해 계좌 인증을 해주세요</div>
            </div>
          </div>
          <div
            class="bg-everly-white border-everly-mid_grey border text-everly-dark_grey rounded-lg w-full md:w-auto px-2 py-2 md:py-2 md:px-3 flex justify-between items-center sm:flex-1 md:flex-none max-w-[17.5rem] sm:max-w-none"
          >
            <div>출금 계좌 변경하기</div>
            <img
              src="@/assets/icon/arrow_right.svg"
              alt=""
              class="w-1.5 md:w-2"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="px-4 md:py-0 md:px-0 md:pl-8" v-if="accountCondition">
      <div class="text-sm md:text-base font-bold py-3 md:pt-3 md:pb-5">
        <span class="bg-everly-light_blue px-1 rounded font-normal mr-1"
          >2</span
        >
        출금 마일리지 입력
      </div>
      <div
        class="md:ml-6 justify-between items-center text-xs md:text-base space-y-3"
      >
        <div class="md:pr-96 space-y-3">
          <div class="flex justify-between">
            <div class="md:w-[8.6rem]">총 마일리지</div>
            <div>100,250원</div>
          </div>
          <div class="flex justify-between relative z-10">
            <div class="md:w-[8.6rem] flex item-center">
              출금 가능 마일리지
              <img
                src="@/assets/icon/question_grey.svg"
                alt=""
                class="hidden md:block pl-1"
                @click.stop=""
                @click="setshowMileageGuide()"
              />
            </div>
            <div>47,250원</div>
            <div
              class="hidden md:block w-[20.75rem] h-[6.7rem] border border-everly-mid_grey bg-everly-white rounded-lg absolute top-5"
              v-if="showMilageGuide"
            >
              <img src="@/assets/img/mileage_logic.svg" alt="" class="p-3" />
            </div>
          </div>
        </div>
        <div class="flex justify-between items-center md:pr-[8.5rem]">
          <div class="hidden md:block md:w-[8.6em] whitespace-nowrap flex-none">
            출금 신청 마일리지
          </div>
          <InputwithCurreny
            :model-value="''"
            :propsPlaceholder="'출금할 금액을 입력해주세요'"
            :propsClass="'w-full '"
            :propsTextClass="''"
            :minLimit="0"
            :maxLimit="100000"
            @change-value="changeValue($event)"
          />
          <div
            class="hidden md:block text-sm text-everly-dark_grey md:w-[15.4rem] whitespace-nowrap md:pl-2 flex-none"
          >
            출금 수수료 : 1000원 / 무료 출금 잔여 0 원
          </div>
        </div>
        <div class="md:hidden">
          <div
            class="md:hiddn w-full border border-everly-mid_grey bg-everly-wbg_grey rounded-lg top-5"
          >
            <img
              src="@/assets/img/mileage_logic.svg"
              alt=""
              class="p-3 w-full"
            />
          </div>
        </div>
      </div>
    </div>
    <hr
      class="border-everly-mid_grey my-4 md:ml-8 hidden md:block border-dashed"
    />
    <div class="px-4 md:py-0 md:px-0 md:pl-8">
      <div class="text-sm md:text-base font-bold py-3 md:pt-0 md:pb-5">
        은행별 출금 불가 시간
      </div>

      <table
        class="table-auto border-collapse border border-everly-mid_grey text-everly-dark_grey w-full md:w-[29.2rem] text-xs md:text-base text-center bg-white"
      >
        <tr>
          <td class="border border-everly-mid_grey py-2 md:py-2">은행명</td>
          <td class="border border-everly-mid_grey py-2 md:py-2">
            출금불가시간
          </td>
        </tr>
        <tr>
          <td class="border border-everly-mid_grey py-2 md:py-2">국민은행</td>
          <td class="border border-everly-mid_grey py-2 md:py-2">
            23:30 ~ 00:20
          </td>
        </tr>
        <tr>
          <td class="border border-everly-mid_grey py-2 md:py-2">신한은행</td>
          <td class="border border-everly-mid_grey py-2 md:py-2">
            23:30 ~ 00:20
          </td>
        </tr>
        <tr>
          <td class="border border-everly-mid_grey py-2 md:py-2">대구은행</td>
          <td class="border border-everly-mid_grey py-2 md:py-2">
            23:30 ~ 00:20
          </td>
        </tr>
        <tr>
          <td class="border border-everly-mid_grey py-2 md:py-2">우리은행</td>
          <td class="border border-everly-mid_grey py-2 md:py-2">
            23:30 ~ 00:20
          </td>
        </tr>
        <tr>
          <td class="border border-everly-mid_grey py-2 md:py-2">부산은행</td>
          <td class="border border-everly-mid_grey py-2 md:py-2">
            23:30 ~ 00:20
          </td>
        </tr>
      </table>
    </div>

    <div>
      <div>취소</div>
      <div v-if="accountCondition">출금하기</div>
      <div v-else>출금안하기</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import InputwithCurreny from "@/components/common/inputwithCurreny.vue";
import commonFunction from "@/common";

const withdrawAmt = ref("");
const showMilageGuide = ref(false);
const accountCondition = ref(false);

function changeValue(value: string) {
  withdrawAmt.value = commonFunction.uncomma(value);
}
function setshowMileageGuide() {
  showMilageGuide.value = !showMilageGuide.value;
}
</script>

<style scoped>
input::placeholder {
  text-align: left;
  padding-left: 10px;
}

.radioinput {
  display: none;
}

label {
  display: inline-block;
  cursor: pointer;
}

label span {
  position: relative;
  line-height: 22px;
}

label span:before,
label span:after {
  content: "";
}

label span:before {
  border: 1px solid #c7c7c7;
  width: 20px;
  height: 20px;
  margin-right: 5px;
  border-radius: 5px;
  margin-bottom: 2.5px;
  display: inline-block;
  vertical-align: middle;
}
label span:after {
  background-image: url(@/assets/icon/checked_blue.svg);
  width: 20px;
  height: 20px;
  position: absolute;
  left: 0px;
  bottom: 0px;
  background-size: cover;
  opacity: 0;
  vertical-align: middle;
}
@media (max-width: 768px) {
  label span:before {
    width: 15px;
    height: 15px;
    vertical-align: middle;
  }
}
@media (max-width: 768px) {
  label span:after {
    top: 2px;
    width: 15px;
    height: 15px;
    vertical-align: middle;
  }
}

label input:checked + span:after {
  opacity: 1;
}
</style>
