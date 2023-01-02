<template>
  <div class="mt-12 my-20 md:my-12 flex">
    <div class="grow hidden md:block"></div>
    <div class="w-full md:w-[73.750rem] mt-5 md:mt-11">
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
            <div class="md:text-2xl">{{ storePostTitle }}</div>
            <div class="md:flex md:text-xl text-sm font-bold md:justify-start">
              <div class="md:pr-5">
                {{ numberToKorean(storeMinValue) }} {{ storeUnitName }} /
                {{ storePricePerUnit.toLocaleString() }} 원
              </div>
              <div>{{ storeOrderQty }}개 ({{ TotalQty }})</div>
            </div>
          </div>
        </div>
      </div>
      <hr
        class="border-everly-light_grey border-[3px] md:border-[#707070] md:border mt-3 md:mt-7 w-full md:w-[42.5rem]"
      />
      <div class="w-full md:w-[73.750rem] md:flex md:space-x-2">
        <div class="w-full md:w-[42.5rem]">
          <div class="px-3 md:px-0">
            <div class="md:text-xl text-sm font-bold mt-5 md:mt-8">내 정보</div>
            <div class="text-sm mt-4 md:mt-8 space-y-4 md:space-y-6">
              <div class="flex">
                <div class="w-14 md:w-[8rem] md:text-base font-bold">이름</div>
                <div class="grow md:text-lg">{{ storeName }}</div>
              </div>
              <div class="flex">
                <div class="w-14 md:w-[8rem] md:text-base font-bold">
                  닉네임
                </div>
                <div class="grow md:text-lg">
                  {{ storeNickname }}
                </div>
              </div>
              <div class="flex">
                <div class="w-14 md:w-[8rem] md:text-base font-bold">
                  연락처
                </div>
                <div class="grow md:text-lg flex space-x-4">
                  <div>{{ storePhonenumber }}</div>
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
                    @input="(event: Event) => { setCharacter((event.target as HTMLInputElement).value) }"
                    placeholder="캐릭터명을 입력 해 주세요"
                    class="border-everly-mid_grey rounded-lg border p-2 text-sm md:text-base md:w-[17.25rem] w-full mr-4"
                  />
                </div>
              </div>
            </div>
          </div>
          <hr
            class="border-everly-light_grey border-[3px] md:border-[#c7c7c7] md:border my-5 md:my-8"
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
                    :propsList="storeCouponList"
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
                    <div class="flex grow justify-between items-center pr-4">
                      <div>보유</div>
                      <div>{{ storeTotalMileage.toLocaleString() }} 원</div>
                    </div>
                    <div
                      class="border-everly-main border rounded-lg text-everly-main flex justify-center items-center py-2 px-3 md:px-6 hover:bg-[#3f52fc] hover:text-[#ffffff]"
                    >
                      <div>충전하기</div>
                    </div>
                  </div>
                  <div class="flex mt-4 md:mt-8">
                    <div
                      class="flex grow items-center space-x-2 md:space-x-10 mr-2 relative"
                    >
                      <div class="whitespace-nowrap">사용</div>
                      <input
                        type="text"
                        placeholder="0"
                        :value="
                          commonFunction.comma(storeDiscountMileage.toString())
                        "
                        @input="(event: Event) => { setMileage((event.target as HTMLInputElement).value) }"
                        @keyup="(event: Event) => { commonFunction.inputNumberFormatWithLimit(event.target as HTMLInputElement,storeTotalMileage,storeProductPrice); }"
                        class="border-everly-mid_grey rounded-lg border p-2 pr-8 md:pr-6 text-sm md:text-base text-right md:grow w-full"
                      />
                      <div class="absolute right-4 md:right-2">원</div>
                    </div>
                    <div
                      class="border-everly-main border rounded-lg text-everly-main flex justify-center items-center py-2 px-3 md:px-6 hover:bg-[#3f52fc] hover:text-[#ffffff]"
                    >
                      <div @click="setMileage(storeTotalMileage.toString())">
                        전액사용
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr
            class="border-everly-light_grey border-[3px] md:border-[#c7c7c7] md:border my-5 md:my-8"
          />
          <div class="px-3 md:px-0">
            <div class="text-sm md:text-xl font-bold">결제방법</div>
          </div>
          <div
            class="w-full grid grid-cols-3 sm:grid-cols-6 md:grid-cols-4 gap-4 text-sm md:text-base mt-5 md:mt-[1.875rem] px-3 md:px-0"
          >
            <div
              class="border-everly-mid_grey border text-everly-dark_grey text-center py-3 cursor-pointer"
              :class="setColorPaymentMethod(`CARD`)"
              @click="clickPaymentMethod(`CARD`)"
            >
              신용 / 체크카드
            </div>
            <div
              class="border-everly-mid_grey border text-everly-dark_grey text-center py-3 cursor-pointer"
              :class="setColorPaymentMethod(`BANK`)"
              @click="clickPaymentMethod(`BANK`)"
            >
              계좌이체
            </div>
            <div
              class="border-everly-mid_grey border text-everly-dark_grey text-center py-3 cursor-pointer"
              :class="setColorPaymentMethod(`VBANK`)"
              @click="clickPaymentMethod(`VBANK`)"
            >
              가상계좌
            </div>
            <div
              class="border-everly-mid_grey border text-everly-dark_grey text-center py-3 cursor-pointer"
              :class="setColorPaymentMethod(`CELLPHONE`)"
              @click="clickPaymentMethod(`CELLPHONE`)"
            >
              휴대폰결제
            </div>
            <div
              class="border-everly-mid_grey border text-everly-dark_grey text-center py-3 cursor-pointer"
              :class="setColorPaymentMethod(`NAVER`)"
              @click="clickPaymentMethod(`NAVER`)"
            >
              네이버페이
            </div>
            <div
              class="border-everly-mid_grey border text-everly-dark_grey text-center py-3 cursor-pointer"
              :class="setColorPaymentMethod(`KAKAO`)"
              @click="clickPaymentMethod(`KAKAO`)"
            >
              카카오페이
            </div>
            <div
              class="border-everly-mid_grey border text-everly-dark_grey text-center py-3 cursor-pointer"
              :class="setColorPaymentMethod(`PAYCO`)"
              @click="clickPaymentMethod(`PAYCO`)"
            >
              페이코페이
            </div>
            <div
              class="border-everly-mid_grey border text-everly-dark_grey text-center py-3 cursor-pointer"
              :class="setColorPaymentMethod(`LPAY`)"
              @click="clickPaymentMethod(`LPAY`)"
            >
              엘페이
            </div>
            <div
              class="border-everly-mid_grey border text-everly-dark_grey text-center py-3 cursor-pointer"
              :class="setColorPaymentMethod(`PINPAY`)"
              @click="clickPaymentMethod(`PINPAY`)"
            >
              핀페이
            </div>
            <div
              class="border-everly-mid_grey border text-everly-dark_grey text-center py-3 cursor-pointer"
              :class="setColorPaymentMethod(`cultureland`)"
              @click="clickPaymentMethod(`cultureland`)"
            >
              문화상품권
            </div>
            <div
              class="border-everly-mid_grey border text-everly-dark_grey text-center py-3 cursor-pointer"
              :class="setColorPaymentMethod(`tmoney`)"
              @click="clickPaymentMethod(`tmoney`)"
            >
              티머니
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
                <div class="font-bold">
                  {{ storeProductPrice.toLocaleString() }} 원
                </div>
              </div>
              <div class="flex justify-between items-center">
                <div class="w-[7.5rem]">쿠폰사용</div>
                <div class="font-bold">
                  {{ discountamount(storeDiscountCoupon) }} 원
                </div>
              </div>
              <div class="flex justify-between items-center">
                <div class="w-[7.5rem]">마일리지 사용</div>
                <div class="font-bold">
                  {{ discountamount(storeDiscountMileage) }} 원
                </div>
              </div>
              <div class="flex justify-between items-center">
                <div class="w-[7.5rem] text-base md:text-xl font-bold">
                  최종 결제금액
                </div>
                <div class="text-everly-main font-bold text-lg md:text-2xl">
                  {{ storeFinalPrice.toLocaleString() }} 원
                </div>
              </div>
              <div>
                <hr class="border-everly-light_grey border my-3" />
              </div>
              <!-- 약관 -->
              <div class="space-y-2 md:space-y-1">
                <div
                  class="flex text-xs md:text-base cursor-pointer"
                  @click="toggleStoreTermsAll()"
                  v-if="storeTermsAll"
                >
                  <img
                    src="@/assets/icon/check_circle_blue.svg"
                    alt=""
                    class="w-3 md:w-4 mr-2"
                  />
                  <div>
                    주문 내용을 확인했으며, 아래 내용에 모두 동의합니다.
                  </div>
                </div>
                <div
                  class="flex text-xs md:text-base cursor-pointer"
                  @click="toggleStoreTermsAll()"
                  v-else
                >
                  <img
                    src="@/assets/icon/check_circle.svg"
                    alt=""
                    class="w-3 md:w-4 mr-2"
                  />
                  <div>
                    주문 내용을 확인했으며, 아래 내용에 모두 동의합니다.
                  </div>
                </div>
                <div
                  class="flex text-xs md:text-sm cursor-pointer"
                  @click="toggleterms(`use`)"
                  v-if="storeTerms[0]"
                >
                  <img
                    src="@/assets/icon/check_circle_blue.svg"
                    alt=""
                    class="w-3 md:w-4 mr-2"
                  />
                  <div>(필수) 개인정보 수집 / 이용 동의</div>
                </div>
                <div
                  class="flex text-xs md:text-sm cursor-pointer text-everly-mid_grey"
                  @click="toggleterms(`use`)"
                  v-else
                >
                  <img
                    src="@/assets/icon/check_circle.svg"
                    alt=""
                    class="w-3 md:w-4 mr-2"
                  />
                  <div>(필수) 개인정보 수집 / 이용 동의</div>
                </div>
                <div
                  class="flex text-xs md:text-sm cursor-pointer"
                  @click="toggleterms(`provide`)"
                  v-if="storeTerms[1]"
                >
                  <img
                    src="@/assets/icon/check_circle_blue.svg"
                    alt=""
                    class="w-3 md:w-4 mr-2"
                  />
                  <div>(필수) 개인정보 제 3자 제공 동의</div>
                </div>
                <div
                  class="flex text-xs md:text-sm cursor-pointer text-everly-mid_grey"
                  @click="toggleterms(`provide`)"
                  v-else
                >
                  <img
                    src="@/assets/icon/check_circle.svg"
                    alt=""
                    class="w-3 md:w-4 mr-2"
                  />
                  <div>(필수) 개인정보 제 3자 제공 동의</div>
                </div>
              </div>
              <div
                class="w-full rounded-lg text-everly-white bg-everly-mid_grey font-bold py-3 text-center hidden md:block cursor-pointer"
                @click="goPay()"
              >
                결제하기
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="grow hidden md:block"></div>
  </div>
</template>

<script setup lang="ts">
import { usePaymentStore } from "@/store/modules/home/paymentStore";
import { storeToRefs } from "pinia";
import dropdownVue from "../common/dropdown.vue";
import commonFunction from "@/common";
import { watch, onMounted, computed, ref, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { numberToKorean } from "@/common";
import { useMediaQuery } from "@vueuse/core";
import type smartroVue from "../payment/smartro.vue";

//결제 클릭
const emit = defineEmits([`goPay`]);
function goPay() {
  emit("goPay");
}

// 라우팅
const router = useRouter();
const paymentStore = usePaymentStore();
const {
  storePostTitle,
  storeMinValue,
  storeUnitName,
  storePricePerUnit,
  // 유저 정보
  storeName,
  storeNickname,
  storePhonenumber,
  storeCharaterName,

  // 쿠폰/마일리지
  storeCouponList,
  storeCouponEffect,
  storeTotalMileage,
  storeDiscountMileage,

  //여기서는 클라만 있는 정보
  storePaymentMethod,
  storeProductPrice,
  storeDiscountCoupon,
  storeFinalPrice,
  // 동의 내용
  storeTermsAll,
  storeTerms,

  storeTermsforUse,
  storeOrderQty,
  storeTotalQty,
} = storeToRefs(paymentStore);

const minSize = computed(() => {
  return useMediaQuery("(min-width: 768px)");
});

onMounted(() => {
  if (storePostTitle.value == "") router.go(-1);
  paymentStore.mountstoreProductPrice(
    storeOrderQty.value * storePricePerUnit.value
  );
  paymentStore.mountstoreFinalPrice(
    storeOrderQty.value * storePricePerUnit.value
  );
});

//전체 갯수
const TotalQty = computed(() => {
  return (
    numberToKorean(storeOrderQty.value * storeMinValue.value) + ` 게임머니`
  );
});

//동의 관련 로직
function toggleStoreTermsAll() {
  paymentStore.setstoreTermsAll(!storeTermsAll.value);
}

function toggleterms(type: string) {
  paymentStore.setstoreTerms(type);
}

//결제 방법 고른것
function clickPaymentMethod(type: string) {
  paymentStore.resetstorePaymentMethod();
  paymentStore.setstorePaymentMethod(type);
}

const setColorPaymentMethod = (type: string) => {
  if (type == storePaymentMethod.value)
    return `bg-everly-main text-everly-white`;
  else return "";
};

// 결제 상세 로직
watch(
  [storeDiscountMileage, storeCouponEffect],
  ([newDiscountMileage, newCoupon], [prevA, prevB]) => {
    paymentStore.setstoreFinalPrice(newCoupon, newDiscountMileage);
  }
);

//캐릭터 이름 설정
function setCharacter(name: string) {
  paymentStore.setstoreCharaterName(name);
}

//마일리지 설정
function setMileage(amount: string) {
  paymentStore.setstoreDiscountMileage(
    parseInt(commonFunction.uncomma(amount)) as number
  );
}
//결제 상세 쿠폰 사용 마일리지 사용
const discountamount = (amount: number) => {
  let word = "";
  if (amount > 0) word += "-";

  return (word += amount.toLocaleString());
};

//마일리지 사용 최대량
const useMileage = () => {
  return storeDiscountMileage > storeProductPrice
    ? storeProductPrice.toString()
    : storeDiscountMileage.toString();
};
</script>

<style scoped>
@media (max-width: 768px) {
  input::placeholder {
    font-size: 0.875rem;
    line-height: 1.25rem;
  }
}
</style>
