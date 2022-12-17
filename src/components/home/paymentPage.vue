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
                {{ numberToKorean(storeUnitValue) }} {{ storeUnitName }} /
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
                      class="flex grow items-center space-x-2 md:space-x-10 md:mr-2 relative"
                    >
                      <div>사용</div>
                      <input
                        type="text"
                        placeholder="0"
                        :value="
                          commonFunction.comma(storeDiscountMileage.toString())
                        "
                        @input="(event: Event) => { setMileage((event.target as HTMLInputElement).value) }"
                        @keyup="(event: Event) => { commonFunction.inputNumberFormatWithLimit(event.target as HTMLInputElement,storeTotalMileage,storeProductPrice); }"
                        class="border-everly-mid_grey rounded-lg border p-2 pr-5 md:pr-6 text-sm md:text-base text-right md:grow"
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
              :class="setColorPaymentMethod(`card`)"
              @click="clickPaymentMethod(`card`)"
            >
              신용/ 체크카드
            </div>
            <div
              class="border-everly-mid_grey border text-everly-dark_grey text-center py-3 cursor-pointer"
              :class="setColorPaymentMethod(`account`)"
              @click="clickPaymentMethod(`account`)"
            >
              계좌이체
            </div>
            <div
              class="border-everly-mid_grey border text-everly-dark_grey text-center py-3 cursor-pointer"
              :class="setColorPaymentMethod(`virtual`)"
              @click="clickPaymentMethod(`virtual`)"
            >
              가상계좌
            </div>
            <div
              class="border-everly-mid_grey border text-everly-dark_grey text-center py-3 cursor-pointer"
              :class="setColorPaymentMethod(`phone`)"
              @click="clickPaymentMethod(`phone`)"
            >
              휴대폰결제
            </div>
            <div
              class="border-everly-mid_grey border text-everly-dark_grey text-center py-3 cursor-pointer"
              :class="setColorPaymentMethod(`naver`)"
              @click="clickPaymentMethod(`naver`)"
            >
              네이버페이
            </div>
            <div
              class="border-everly-mid_grey border text-everly-dark_grey text-center py-3 cursor-pointer"
              :class="setColorPaymentMethod(`kakao`)"
              @click="clickPaymentMethod(`kakao`)"
            >
              카카오페이
            </div>
            <div
              class="border-everly-mid_grey border text-everly-dark_grey text-center py-3 cursor-pointer"
              :class="setColorPaymentMethod(`payco`)"
              @click="clickPaymentMethod(`payco`)"
            >
              페이코페이
            </div>
            <div
              class="border-everly-mid_grey border text-everly-dark_grey text-center py-3 cursor-pointer"
              :class="setColorPaymentMethod(`lpay`)"
              @click="clickPaymentMethod(`lpay`)"
            >
              엘페이
            </div>
            <div
              class="border-everly-mid_grey border text-everly-dark_grey text-center py-3 cursor-pointer"
              :class="setColorPaymentMethod(`pinpay`)"
              @click="clickPaymentMethod(`pinpay`)"
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
                class="w-full rounded-lg text-everly-white bg-everly-mid_grey font-bold py-3 text-center hidden md:block"
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

    <div class="hidden">
      <form id="tranMgr" name="tranMgr" method="post" onsubmit="">
        <!-- 각 값들을 가맹점에 맞게 설정해 주세요. -->
        <input type="text" name="PayMethod" value="CARD" placeholder="" />
        <input
          type="text"
          name="GoodsCnt"
          maxlength="2"
          value="1"
          placeholder="123"
        />
        <input
          type="text"
          name="GoodsName"
          maxlength="40"
          value="상품명"
          placeholder=""
        />
        <input
          type="text"
          name="Amt"
          maxlength="12"
          value="1000"
          placeholder=""
        />
        <input
          type="text"
          name="Moid"
          maxlength="40"
          value="123456"
          placeholder="특수문자 포함 불가"
        />
        <input
          type="text"
          name="Mid"
          maxlength="10"
          value="t_2212121m"
          placeholder=""
        />
        <input
          type="text"
          name="ReturnUrl"
          size="100"
          class="input"
          value="http://everly.co.kr/smartro/smartro-payment-result.php"
        />
        <input
          type="text"
          name="StopUrl"
          size="100"
          class="input"
          value="http://everly.co.kr/smartro/smartro-payment-result.php"
          placeholder="Mobile 연동 시 필수"
        />
        <input
          type="text"
          name="BuyerName"
          maxlength="30"
          value="강문식"
          placeholder=""
        />
        <input
          type="text"
          name="BuyerTel"
          maxlength="30"
          value="01023451234"
          placeholder=""
        />
        <input
          type="text"
          name="BuyerEmail"
          maxlength="30"
          value="kiro@gmail.com"
          placeholder=""
        />
        <input
          type="text"
          name="UserIp"
          maxlength="20"
          value=""
          placeholder=""
        />
        <input
          type="text"
          name="VbankExpDate"
          maxlength="8"
          value=""
          placeholder="가상계좌 이용 시 필수"
        />
        <input
          type="text"
          name="EncryptData"
          :value="EncryptData"
          style="background-color: aqua"
          placeholder="위/변조방지 HASH 데이터"
        />
        <input
          type="text"
          name="GoodsCl"
          value="0"
          placeholder="가맹점 설정에 따라 0 또는 1, 핸드폰결제 시 필수"
        />
        <input
          type="text"
          name="EdiDate"
          maxlength="14"
          :value="EdiDate"
          placeholder=""
          style="background-color: red"
        />
        <!-- MID 기본 세팅시 부가세 직접계산으로 설정됩니다. -->
        <input
          type="text"
          name="TaxAmt"
          maxlength="12"
          value="910"
          placeholder="부가세 직접계산 가맹점 필수,숫자만 가능, 문장부호 제외"
        />
        <input
          type="text"
          name="TaxFreeAmt"
          maxlength="12"
          value="0"
          placeholder="부가세 직접계산 가맹점 필수,숫자만 가능, 문장부호 제외"
        />
        <input
          type="text"
          name="VatAmt"
          maxlength="12"
          value="90"
          placeholder="부가세 직접계산 가맹점 필수,숫자만 가능, 문장부호 제외"
        />
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePaymentStore } from "@/store/modules/home/paymentStore";
import { storeToRefs } from "pinia";
import dropdownVue from "../common/dropdown.vue";
import commonFunction from "@/common";
import { watch, onMounted, computed, ref } from "vue";
import { useRouter } from "vue-router";
import { numberToKorean } from "@/common";
import axios from "axios";
import { useAxios } from "@vueuse/integrations/useAxios";
import { loadScript } from "vue-plugin-load-script";

const router = useRouter();
const paymentStore = usePaymentStore();
const {
  storePostTitle,
  storeUnitValue,
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
    numberToKorean(storeOrderQty.value * storeUnitValue.value) + ` 게임머니`
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

///결제 관련

const instance = axios.create({});

const EncryptData = ref("");
const EdiDate = ref("");

loadScript(
  `https://tpay.smartropay.co.kr/asset/js/SmartroPAY-1.0.min.js?version=20221214`
);

function goPay() {
  useAxios(
    "http://everly.co.kr/smartro/smartro-set-parameter.php?Amt=" +
      storeFinalPrice.value,
    instance
  ).then((res) => {
    EncryptData.value = res.data.value.result.EncryptData;
    EdiDate.value = res.data.value.result.EdiDate;
    setTimeout(() => {
      // 스마트로페이 초기화
      //@ts-expect-error
      smartropay.init({
        mode: "STG", // STG: 테스트, REAL: 운영
      });

      // 스마트로페이 결제요청
      // PC 연동시 아래와 같이 smartropay.payment 함수를 구현합니다.
      //@ts-expect-error
      smartropay.payment({
        FormId: "tranMgr", // 폼ID
        Callback: function (res: any) {
          console.log(res);

          var bodyFormData = new FormData();
          bodyFormData.append("Tid", res.Tid);
          bodyFormData.append("TrAuthKey", res.TrAuthKey);

          axios({
            method: "post",
            url: "http://everly.co.kr/smartro/smartro-payment-result.php",
            data: bodyFormData,
            headers: { "Content-Type": "multipart/form-data" },
          })
            .then(function (response) {
              //handle success
              console.log(response);
              router.push(`/`);
            })
            .catch(function (response) {
              //handle error
              console.log(response);
              router.push(`/`);
            });
        },
      });

      // Mobile 연동시 아래와 같이 smartropay.payment 함수를 구현합니다.
      //@ts-expect-error
      smartropay.payment({
        FormId: "tranMgr", // 폼ID
      });
    }, 1000);
  });
}
</script>

<style scoped>
@media (max-width: 768px) {
  input::placeholder {
    font-size: 0.875rem;
    line-height: 1.25rem;
  }
}
</style>
