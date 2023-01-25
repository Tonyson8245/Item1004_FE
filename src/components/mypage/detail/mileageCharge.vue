<template>
  <Modal v-if="showModal" @update:props-show-modal="setModal($event)" />
  <div>
    <div class="py-5 px-5 md:py-0 md:px-0 md:pl-8">
      <div class="hidden md:block pb-4 font-bold text-xl">마일리지 충전</div>
      <div class="md:flex">
        <div class="flex text-sm md:text-base items-center pr-1 md:pr-2">
          <span class="font-bold text-base md:text-xl pr-1 md:pr-2"
            >띠용떄용</span
          >님의 사용가능한 마일리지는
        </div>
        <div class="flex text-sm md:text-base items-center">
          <span class="font-bold text-base md:text-xl pr-1 md:pr-2">20,000</span
          >원 입니다.
        </div>
      </div>
      <div>
        <div class="text-sm md:text-base font-bold py-3 md:pt-8 md:pb-5">
          <span class="bg-everly-light_blue px-1 rounded font-normal mr-1"
            >1</span
          >
          충전 수단 선택
        </div>
        <!-- 결제 수단들 -->
        <div>
          <div class="grid grid-cols-3 sm:grid-cols-4 gap-3 md:gap-5">
            <PaymentMethodVue
              @get-value="setpaymentMethod($event)"
              :paymentMethod="paymentMethod"
              :title="`신용카드`"
              :active="true"
              :img-url="`/assets/icon/creditcardwithblue_black.svg`"
            />
            <PaymentMethodVue
              @get-value="setpaymentMethod($event)"
              :paymentMethod="paymentMethod"
              :title="`가상계좌`"
              :active="true"
              :img-url="`/assets/icon/virtualAccontwithblue_black.svg`"
            />
            <PaymentMethodVue
              @get-value="setpaymentMethod($event)"
              :paymentMethod="paymentMethod"
              :title="`계좌이체`"
              :active="true"
              :img-url="`/assets/icon/accountRealtimewithblue_black.svg`"
            />
            <PaymentMethodVue
              @get-value="setpaymentMethod($event)"
              :paymentMethod="paymentMethod"
              :title="`휴대폰`"
              :active="false"
              :img-url="`/assets/icon/cellphone_grey.svg`"
            />
            <PaymentMethodVue
              @get-value="setpaymentMethod($event)"
              :paymentMethod="paymentMethod"
              :title="`문화상품권`"
              :active="false"
              :img-url="`/assets/icon/culture_grey.svg`"
            />
            <PaymentMethodVue
              @get-value="setpaymentMethod($event)"
              :paymentMethod="paymentMethod"
              :title="`네이버페이`"
              :active="false"
              :img-url="`/assets/icon/naver_grey.svg`"
            />
            <PaymentMethodVue
              @get-value="setpaymentMethod($event)"
              :paymentMethod="paymentMethod"
              :title="`카카오페이`"
              :active="false"
              :img-url="`/assets/icon/kakaopay_grey.svg`"
            />
            <PaymentMethodVue
              @get-value="setpaymentMethod($event)"
              :paymentMethod="paymentMethod"
              :title="`페이코페이`"
              :active="false"
              :img-url="`/assets/icon/payco_grey.svg`"
            />
            <PaymentMethodVue
              @get-value="setpaymentMethod($event)"
              :paymentMethod="paymentMethod"
              :title="`엘페이`"
              :active="false"
              :img-url="`/assets/icon/lpay_grey.svg`"
            />
            <PaymentMethodVue
              @get-value="setpaymentMethod($event)"
              :paymentMethod="paymentMethod"
              :title="`핀페이`"
              :active="false"
              :img-url="`/assets/icon/pinpay_grey.svg`"
            />
            <PaymentMethodVue
              @get-value="setpaymentMethod($event)"
              :paymentMethod="paymentMethod"
              :title="`티머니`"
              :active="false"
              :img-url="`/assets/icon/tmoney_grey.svg`"
            />
          </div>
        </div>
      </div>
    </div>
    <div v-if="paymentMethod != ''">
      <hr
        class="border-everly-mid_grey md:border-[#707070] my-4 md:my-8 md:ml-8"
      />
      <div class="px-5 md:px-0 md:pl-8 text-sm md:text-base">
        <div class="py-3">신용카드 충전</div>
        <div class="space-y-2">
          <div class="flex">
            <div class="text-everly-dark_grey w-[5.688rem] md:w-[8.313rem]">
              마일리지 종류
            </div>
            <div class="flex-1">구매전용 마일리지(출금불가)</div>
          </div>
          <div class="flex">
            <div class="text-everly-dark_grey w-[5.688rem] md:w-[8.313rem]">
              충전 수수료
            </div>
            <div class="flex-1">5%</div>
          </div>
          <div class="flex">
            <div class="text-everly-dark_grey w-[5.688rem] md:w-[8.313rem]">
              충전 한도
            </div>
            <div
              class="px-4 md:hidden text-xs border-everly-mid_grey border flex items-center"
              @click="setModal(true)"
            >
              자세히보기
            </div>
            <div class="flex-1 hidden md:block">
              각 PG사에 따라 한도금액이 다르게 적용됩니다. 한도정책은 카드사
              사정에 따라 언제든지 변경될 수 있습니다
            </div>
          </div>
        </div>
      </div>
      <hr class="border-everly-mid_grey my-4 md:my-8 md:ml-8" />
      <div>
        <div class="px-5 md:py-0 md:px-0 md:pl-8">
          <div>
            <div class="text-sm md:text-base font-bold py-3 md:pb-5">
              <span class="bg-everly-light_blue px-1 rounded font-normal mr-1"
                >2</span
              >
              충전 금액 선택
            </div>
            <div
              class="grid grid-cols-3 sm:grid-cols-6 md:flex gap-2 text-sm md:text-base text-everly-dark_grey"
            >
              <div
                v-for="(item, index) in amountlist"
                :key="index"
                class="md:mr-4"
                @click="getamountInput('')"
              >
                <label>
                  <input
                    class="radioinput"
                    type="radio"
                    name="radio"
                    :id="item.toString()"
                    v-model="amount"
                    :value="item.toString()"
                  />
                  <span /> </label
                >{{ item.toLocaleString() }}
              </div>
            </div>
            <div class="pt-2 text-sm md:text-base flex items-center">
              <label class="align-middle">
                <input
                  class="radioinput"
                  type="radio"
                  name="radio"
                  :id="`직접입력`"
                  :value="`직접입력`"
                  v-model="amount"
                />
                <span />
              </label>
              <div class="relative">
                <input
                  type="text"
                  placeholder="직접입력하기"
                  v-model="amountInput"
                  @input="(event:Event) =>{getamountInput((event.target as HTMLInputElement).value)}"
                  class="text-right pr-8 py-1 border rounded-lg text-sm md:text-base md:w-[28.125rem]"
                  :disabled="amount != `직접입력`"
                />
                <div
                  class="absolute right-3 top-[0.3rem]"
                  v-if="amount == `직접입력`"
                >
                  원
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr class="border-everly-mid_grey my-4 md:my-8 md:ml-8 hidden md:block" />
      <div class="px-5 pt-4 md:pt-0 md:px-0 md:pl-8 md:flex md:justify-center">
        <div
          class="bg-white text-sm md:text-base md:w-[28.813rem] md:border rounded-lg py-3 md:p-3 relative"
        >
          충전 예정 마일리지
          <div
            class="absolute top-[0.7rem] md:top-[0.8rem] right-5 text-everly-main"
          >
            {{ finalamount.toLocaleString() }} 원
          </div>
        </div>
      </div>
      <div class="p-5 md:w-full md:px-0 md:pl-8 md:pt-20">
        <div
          class="md:px-72 sm:flex-row-reverse sm:flex gap-2 font-bold text-sm sm:text-base"
        >
          <div
            class="flex-1 rounded-lg border text-center py-2 sm:py-3 text-everly-white"
            :class="chargeButtonClass"
            @click="charge()"
          >
            충전하기
          </div>
          <div
            class="mt-3 sm:mt-0 flex-1 rounded-lg border text-center py-2 sm:py-3 text-everly-main bg-everly-light_blue"
          >
            취소
          </div>
        </div>
      </div>
    </div>
    <div v-else class="h-80"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import PaymentMethodVue from "../components/paymentMethod.vue";
import Modal from "../components/chargeLimitInfoModal.vue";
import { payment } from "@/api/payment-module";
import { useRouter } from "vue-router";
import { usePaymentStore } from "@/store/modules/home/paymentStore";
import { storeToRefs } from "pinia";
import type { user } from "@/domain/user/user.interface";
const router = useRouter();

const paymentMethod = ref("card");
const paymentStore = usePaymentStore();

function setpaymentMethod(string: string) {
  if (string != "") paymentMethod.value = string;
}

const showModal = ref(false);
function setModal(value: boolean) {
  showModal.value = value;
}
//가격 리스트
const amountlist = [
  10000, 30000, 50000, 100000, 150000, 200000, 250000, 300000, 350000,
];

// 가격 정보
const amount = ref("0");
//직접입력
const amountInput = ref("");
function getamountInput(input: string) {
  if (amount.value == "직접입력") {
    if (input != "") {
      amountInput.value = input;
    }
  } else amountInput.value = "";
}

// 최종가격
const finalamount = ref(0);
watch([amount, amountInput], () => {
  if (amount.value == "직접입력") {
    if (isNaN(parseInt(amountInput.value))) finalamount.value = 0;
    else finalamount.value = parseInt(amountInput.value) * 0.95;
  } else finalamount.value = parseInt(amount.value) * 0.95;
});

// 충전하기 번튼 활성하
const chargeButtonClass = ref("bg-everly-mid_grey");
watch(finalamount, () => {
  if (finalamount.value > 0) chargeButtonClass.value = `bg-everly-main`;
  else chargeButtonClass.value = `bg-everly-mid_grey`;

  paymentStore.chargestoreProductPrice(finalamount.value);
  paymentStore.chargestoreFinalPrice(finalamount.value);
  paymentStore.setPostTitle("마일리지충전");
});

//충전(결제)
// const fee = ref(0.1);
// const
const { storefeePrice, storeFinalPrice, storeProductPrice } =
  storeToRefs(paymentStore);

function charge() {
  //유저 정보 가져오기
  const localData = localStorage.getItem("user");
  if (localData != null) {
    const userIdx = (JSON.parse(localData) as user).idx;

    // payment(router, "contract", "card", 1, 10, 100, 110, 0, 1, 2); // 거래 (신용카드)
    payment(
      router,
      "chargePoint",
      "card",
      userIdx,
      storefeePrice.value,
      storeProductPrice.value,
      storeFinalPrice.value
    ); // 충전 (신용카드)
    // payment(router, "onlyPoint", "card", 1, 10, 100, 110, 110, 1, 2); // 마일리지만 사용
  } else console.log("유저 정보가 없습니다.");
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
