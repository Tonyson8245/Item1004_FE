<template>
  <div class="mt-12 my-20 md:my-12 flex">
    <div class="grow"></div>
    <div class="w-[73.750rem] md:flex md:space-x-2 mt-5 md:mt-11">
      <div class="md:w-[42.5rem]">
        <div class="p-3 md:p-0">
          <div class="md:text-xl text-sm font-bold">주문 상품 정보</div>
          <div class="flex space-x-2 mt-3.5 md:mt-7">
            <div class="flex justify-center items-start">
              <div
                class="bg-everly-main rounded-lg text-everly-white md:text-base text-xs md:h-[2.124rem] p-1 md:px-3"
              >
                팔래요
              </div>
            </div>
            <div class="space-y-1 md:space-y-3">
              <div class="md:text-2xl">8억~580억 메이플 메소 판매합니다</div>
              <div
                class="md:flex md:text-xl text-sm font-bold md:justify-start"
              >
                <div class="md:pr-5">8억메소당 / 26,046원</div>
                <div>8개 (64억메소)</div>
              </div>
            </div>
          </div>
        </div>
        <hr
          class="border-everly-light_grey border-[3px] md:border-everly-mid_grey md:border mt-3 md:mt-7"
        />

        <div class="px-3 md:px-0">
          <div class="md:text-xl text-sm font-bold mt-5 md:mt-8">내 정보</div>
          <div class="text-sm mt-4 md:mt-8 space-y-4 md:space-y-6">
            <div class="flex">
              <div class="w-14 md:w-[8rem] md:text-base font-bold">이름</div>
              <div class="grow md:text-lg">김철수</div>
            </div>
            <div class="flex">
              <div class="w-14 md:w-[8rem] md:text-base font-bold">닉네임</div>
              <div class="grow md:text-lg">이런걸아이디라고짓다니말도안돼</div>
            </div>
            <div class="flex">
              <div class="w-14 md:w-[8rem] md:text-base font-bold">연락처</div>
              <div class="grow md:text-lg flex space-x-4">
                <div>010-1234-5678</div>
                <div class="flex space-x-1 items-center">
                  <img
                    src="@/assets/icon/safephone_grey.svg"
                    alt=""
                    class="w-3 md:w-4"
                  />
                  <div>안심번호 사용 중</div>
                </div>
              </div>
            </div>
            <div class="flex items-center">
              <div class="w-14 md:w-[8rem] md:text-base font-bold">
                구매자<br class="block md:hidden" />
                캐릭터명
              </div>
              <div class="flex grow items-center">
                <input
                  type="text"
                  placeholder="캐릭터명을 입력 해 주세요"
                  class="border-everly-mid_grey rounded-lg border p-2 text-sm md:text-base md:w-[17.25rem] w-full mr-4"
                />
              </div>
            </div>
          </div>
        </div>
        <hr
          class="border-everly-light_grey border-[3px] md:border-[#707070] md:border my-5 md:my-8"
        />
        <div class="px-3 md:px-0">
          <div class="text-sm md:text-xl font-bold">쿠폰 / 마일리지</div>
          <div
            class="text-sm md:text-base mt-5 md:mt-[1.875rem] space-y-3 md:space-y-8"
          >
            <div class="md:flex items-center">
              <div class="w-[8rem] font-bold">쿠폰</div>
              <div class="mt-[0.625rem] md:mt-0 space-x-2 grow flex">
                <dropdownVue
                  class="grow"
                  :propsClass="`w-full`"
                  :propsList="['a', 'b', 'c', 'd']"
                  :propsPlaceholder="`사용가능 쿠폰 3장 / 보유쿠폰 3장`"
                />
                <div
                  class="border-everly-main border rounded-lg text-everly-main flex justify-center items-center py-1 px-3 md:px-6 hover:bg-[#3f52fc] hover:text-[#ffffff]"
                >
                  <div>쿠폰등록</div>
                </div>
              </div>
            </div>
            <div class="md:flex mt-5 md:mt-8">
              <div class="w-[8rem] font-bold md:pt-3">마일리지</div>
              <div class="grow">
                <div class="flex">
                  <div class="flex grow justify-between items-center pr-2">
                    <div>보유</div>
                    <div>10,000,000원</div>
                  </div>
                  <div
                    class="border-everly-main border rounded-lg text-everly-main flex justify-center items-center py-3 px-3 md:px-6 hover:bg-[#3f52fc] hover:text-[#ffffff]"
                  >
                    <div>충전하기</div>
                  </div>
                </div>
                <div class="flex mt-4 md:mt-8">
                  <div
                    class="flex grow items-center space-x-3 md:space-x-6 mr-2"
                  >
                    <div>사용</div>
                    <input
                      type="text"
                      placeholder="0"
                      class="border-everly-mid_grey rounded-lg border p-2 text-sm md:text-base text-right grow"
                    />
                  </div>
                  <div
                    class="border-everly-main border rounded-lg text-everly-main flex justify-center items-center py-3 px-3 md:px-6 hover:bg-[#3f52fc] hover:text-[#ffffff]"
                  >
                    <div>전액사용</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr class="border-everly-light_grey border-[3px] md:hidden my-3" />
      <div class="flex flex-col justify-start md:pl-[1.875rem]">
        <div
          class="px-3 md:p-3 border-everly-main rounded-lg border-0 md:border space-y-3 md:space-y-5"
        >
          <div class="text-sm md:text-lg font-bold">결제상세</div>
          <div class="text-sm md:text-lg space-y-2 md:space-y-4">
            <div class="flex justify-between items-center">
              <div class="w-[7.5rem]">상품금액</div>
              <div class="font-bold">208,368원</div>
            </div>
            <div class="flex justify-between items-center">
              <div class="w-[7.5rem]">쿠폰사용</div>
              <div class="font-bold">-1,000원</div>
            </div>
            <div class="flex justify-between items-center">
              <div class="w-[7.5rem]">마일리지 사용</div>
              <div class="font-bold">-1,000원</div>
            </div>
            <div class="flex justify-between items-center">
              <div class="w-[7.5rem] text-base md:text-xl font-bold">
                최종 결제금액
              </div>
              <div class="text-everly-main font-bold text-lg md:text-2xl">
                208,368원
              </div>
            </div>
            <div>
              <hr class="border-everly-light_grey border my-3" />
            </div>
            <div class="space-y-2 md:space-y-1">
              <div class="flex text-xs md:text-base">
                <img
                  src="@/assets/icon/check_circle_blue.svg"
                  alt=""
                  class="w-3 md:w-4 mr-2"
                />
                <div>주문 내용을 확인했으며, 아래 내용에 모두 동의합니다.</div>
              </div>
              <div class="flex text-xs md:text-sm">
                <img
                  src="@/assets/icon/check_circle_blue.svg"
                  alt=""
                  class="w-3 md:w-4 mr-2"
                />
                <div>(필수) 개인정보 수집 / 이용 동의</div>
              </div>
              <div class="flex text-xs md:text-sm">
                <img
                  src="@/assets/icon/check_circle_blue.svg"
                  alt=""
                  class="w-3 md:w-4 mr-2"
                />
                <div>(필수) 개인정보 제 3자 제공 동의</div>
              </div>
            </div>
            <div
              class="w-full rounded-lg text-everly-white bg-everly-mid_grey font-bold py-3 text-center hidden md:block"
            >
              결제하기
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="grow"></div>
  </div>
</template>

<script setup lang="ts">
import { usePaymentStore } from "@/store/modules/home/paymentStore";
import { storeToRefs } from "pinia";
import dropdownVue from "../common/dropdown.vue";
</script>

<style scoped></style>
