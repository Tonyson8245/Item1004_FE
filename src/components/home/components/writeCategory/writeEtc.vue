<template>
  <modalWriteComfirm
    :showModal="showModal"
    @select="select($event)"
    :postType="'etc'"
  />
  <ModalWriteFailed
    :showModal="showFailedModal"
    :failedType="failedType"
    @select="failedModaloff($event)"
  />
  <div class="">
    <div
      class="grid w-full md:grid-cols-12 grid-cols-1 gap-2 md:gap-y-20 md:pt-10 text-sm md:text-base"
    >
      <!-- 보유수량을 입력해주세요 -->
      <div class="col-span-2 md:pt-0">
        <div class="flex">
          {{ SellBuy }}수량 <span class="hidden md:block">을</span>
        </div>
        <div class="hidden md:block">입력해주세요</div>
      </div>
      <div class="col-span-1 hidden md:block"></div>
      <div class="col-span-9 md:pr-10">
        <div class="flex pb-1">
          <div
            v-for="(item, index) in unitListAmount"
            :key="index"
            class="mr-2 md:mr-3"
          >
            <label>
              <input
                class="radioinput"
                type="radio"
                name="radio"
                :id="item.toString()"
                v-model="unitAmount"
                :value="item.toString()"
              />
              <span /> </label
            >{{ item.toLocaleString() }}
          </div>
          (단위)
        </div>
        <div class="flex items-center justify-start">
          <div class="pr-3">
            <inputwithCloseNumber
              :propsClass="`px-3 md:px-5 text-left py-2 shrink w-full md:w-[17.5rem]`"
              :propsPlaceholder="minAmountPlaceholder"
              :modelValue="storeminAmount"
              @getModel="
                minAmount = $event;
                setStore('minAmount');
              "
              @clearContent="clear('minAmount')"
            />
          </div>
          <div class="pr-3 flex">
            <div class="hidden md:block md:pr-3">
              {{ unitAmount != "없음" ? unitAmount : "" }} {{ currency }}
            </div>
            ~
          </div>
          <div class="pr-3">
            <inputwithCloseNumber
              :propsClass="`px-3 md:px-5 text-left py-2 shrink w-full md:w-[17.5rem]`"
              :propsPlaceholder="maxAmountPlaceholder"
              :modelValue="storemaxAmount"
              @getModel="
                maxAmount = $event;
                setStore('maxAmount');
              "
              @clearContent="clear('maxAmount')"
            />
          </div>
          <div class="flex">
            <div class="hidden md:block">
              {{ unitAmount != "없음" ? unitAmount : "" }} {{ currency }}
            </div>
          </div>
        </div>
      </div>

      <!-- 판매/구매가격을 입력해주세요 -->
      <div class="col-span-2 pt-4 sm:pt-8 md:pt-0 w-full">
        <div class="flex">
          {{ SellBuy }}가격 <span class="hidden md:block">을</span>
        </div>
        <div class="hidden md:block">입력해주세요</div>
      </div>
      <div class="col-span-1 hidden md:block"></div>
      <div class="col-span-9 md:pr-10">
        <div class="flex pb-1">
          <div
            v-for="(item, index) in unitListPrice"
            :key="index"
            class="mr-2 md:mr-3"
          >
            <label>
              <input
                class="radioinput"
                type="radio"
                name="radio1"
                :id="item.toString()"
                v-model="unitPrice"
                :value="item.toString()"
              />
              <span /> </label
            >{{ item.toLocaleString() }}
          </div>
          (단위)
        </div>
        <div class="md:flex justify-start space-y-2 md:space-y-0">
          <div class="flex items-center">
            <div class="pr-3 flex-1 md:block">
              <inputwithCloseNumber
                :propsClass="`px-3 md:px-5 text-left py-2 shrink w-full md:w-[17.5rem]`"
                :propsPlaceholder="saleUnitPlaceholder"
                :modelValue="storesaleUnit"
                @getModel="
                  saleUnit = $event;
                  setStore('saleUnit');
                "
                @clearContent="clear('saleUnit')"
              />
            </div>
            <div class="pr-3 flex">
              <div class="block pr-2">
                {{ unitPrice != "없음" ? unitPrice : "" }} {{ currency }}
              </div>
              당
            </div>
          </div>
          <div class="flex items-center">
            <div class="pr-3 flex-1 md:block">
              <inputwithCloseNumber
                :propsClass="`px-3 md:px-5 text-left py-2 shrink w-full md:w-[17.5rem]`"
                :propsPlaceholder="SellBuy + pricePerUnitPlaceholder"
                :modelValue="storepricePerUnit"
                @getModel="
                  pricePerUnit = $event;
                  setStore('pricePerUnit');
                "
                @clearContent="clear('pricePerUnit')"
              />
            </div>
            <div class="flex">
              <div>원</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 제목을 입력해주세요 -->
      <div class="col-span-2 pt-4 sm:pt-8 md:pt-0">
        <div class="flex">제목 <span class="hidden md:block">을</span></div>
        <div class="hidden md:block">입력해주세요</div>
      </div>
      <div class="col-span-1 hidden md:block"></div>
      <div class="col-span-9 md:pr-10">
        <inputwithClose
          :propsClass="`px-3 md:px-5 text-left py-2 shrink w-full`"
          :propsPlaceholder="titlePlaceholder"
          :modelValue="storetitle"
          @getModel="storetitle = $event"
        />
        <div class="pl-3 md:pl-5 md:text-sm text-xs pt-1 text-everly-dark_grey">
          * 한글, 영어, 숫자, 기호로 작성 가능합니다. 기호 : () [] ’ ” , . /
        </div>
      </div>

      <!-- 상세설명을 입력해주세요 -->
      <div class="col-span-2 pt-4 sm:pt-8 md:pt-0">
        <div class="flex">
          상세설명 <span class="hidden md:block">을</span>
          <span class="block md:hidden text-everly-dark_grey">(선택)</span>
        </div>
        <div class="hidden md:flex">
          <div>입력해주세요</div>
          <div class="hidden md:block text-everly-dark_grey">(선택)</div>
        </div>
      </div>
      <div class="col-span-1 hidden md:block"></div>
      <div class="col-span-9 md:pr-10">
        <div class="flex items-center justify-center">
          <textarea
            id="message"
            rows="6"
            class="block p-3 w-full text-sm md:text-base rounded-lg border resize-none md:resize-y border-everly-mid_grey focus:border-[#3f52fc] h-full"
            :Placeholder="descriptionPlaceholder"
            v-model="storecontent"
            @input="(event: Event) => { storecontent = (event.target as HTMLInputElement).value }"
          ></textarea>
        </div>
      </div>

      <!-- 캐릭터명을 입력해주세요 -->
      <div class="col-span-2 pt-4 sm:pt-8 md:pt-0">
        <div class="flex">
          캐릭터명 <span class="hidden md:block">을</span>
          <span class="block md:hidden text-everly-dark_grey">(선택)</span>
        </div>
        <div class="hidden md:flex">
          입력해주세요<span class="hidden md:block text-everly-dark_grey"
            >(선택)</span
          >
        </div>
      </div>
      <div class="col-span-1 hidden md:block"></div>
      <div class="col-span-9 md:pr-10">
        <div class="flex items-center justify-center">
          <inputwithClose
            :propsClass="`px-3 md:px-5 text-left py-2 shrink w-full`"
            :propsPlaceholder="characterPlaceholder"
            :modelValue="storecharacterName"
            @getModel="storecharacterName = $event"
          />
        </div>
      </div>
    </div>
    <div class="flex justify-center items-center w-full pb-3 pt-7 md:py-20">
      <div
        class="md:text-xl text-base border md:py-3 py-2 border-everly-mid_grey rounded-lg font-bold w-full md:w-[490px] text-center"
        :class="buttonClass"
        @click="createPost()"
      >
        거래 등록하기
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import inputwithClose from "@/components/common/inputwithClose.vue";
import inputwithCloseNumber from "@/components/common/inputwithCloseNumber.vue";
import { useWriteStore } from "@/store/modules/home/writeStore";
import { storeToRefs } from "pinia";
import { watch, ref, onUnmounted } from "vue";
import modalWriteComfirm from "@/components/modal/modalWriteComfirm.vue";
import ModalWriteFailed from "@/components/modal/modalWriteFailed.vue";
import commonFunction from "@/common";

const currency = "개";
const writeStore = useWriteStore();
const { storepostType } = storeToRefs(writeStore);

let SellBuy = ref("판매");

watch(storepostType, () => {
  if (storepostType.value == "buy") SellBuy.value = "구매";
  else SellBuy.value = "판매";
});

let minAmountPlaceholder = "최소 수량";
let maxAmountPlaceholder = "최대 수량";
let saleUnitPlaceholder = "최소 수량";
let pricePerUnitPlaceholder = " 금액";
let titlePlaceholder = "거래 제목을 입력해주세요";
let descriptionPlaceholder = "거래 상세정보를 입력해주세요";
let characterPlaceholder = "전달할 캐릭터명을 입력해주세요";

//등록 확인 모달
const showModal = ref(false);
function select(value: string) {
  console.log(value);
  showModal.value = false;
}

//글 작성
const {
  storetitle,
  storecontent,
  storesaleUnit,
  storepricePerUnit,
  storemaxAmount,
  storeminAmount,
  storecharacterName,
} = storeToRefs(writeStore);

const unitListAmount = ["없음", "만", "억"];
const unitAmount = ref("없음");
const unitListPrice = ["없음", "만", "억"];
const unitPrice = ref("없음");

const minAmount = ref(0);
const maxAmount = ref(0);
const saleUnit = ref(0);
const pricePerUnit = ref(0);

//// 판매 수량 및 가격 정규식
//값을 스토어에 저장하는 함수
function setStore(state: string) {
  const amountunit = texttoNumber(unitAmount.value);
  const priceunit = texttoNumber(unitPrice.value);

  switch (state) {
    case "minAmount":
      storeminAmount.value =
        minAmount.value.toString() != ""
          ? (minAmount.value * amountunit).toString()
          : "";
      break;
    case "maxAmount":
      storemaxAmount.value =
        maxAmount.value.toString() != ""
          ? (maxAmount.value * amountunit).toString()
          : "";
      break;
    case "saleUnit":
      storesaleUnit.value =
        saleUnit.value.toString() != ""
          ? (saleUnit.value * priceunit).toString()
          : "";
      break;
    case "pricePerUnit":
      storepricePerUnit.value = pricePerUnit.value.toString();
      break;
  }
}
function texttoNumber(text: string) {
  switch (text) {
    case "없음":
      return 1;
    case "만":
      return 10000;
    case "억":
      return 100000000;
    default:
      return 1;
  }
}
// 체크박스 관측
watch(unitAmount, () => {
  var unit = texttoNumber(unitAmount.value);
  if (maxAmount.value > 0)
    storemaxAmount.value = (maxAmount.value * unit).toString();
  if (minAmount.value > 0)
    storeminAmount.value = (minAmount.value * unit).toString();
});
watch(unitPrice, () => {
  var unit = texttoNumber(unitPrice.value);
  if (pricePerUnit.value > 0)
    storepricePerUnit.value = (pricePerUnit.value * unit).toString();
  if (saleUnit.value > 0) storesaleUnit.value = saleUnit.value.toString();
});
//최대를 최소가 못넘게하는 것
watch(minAmount, (before, after) => {
  console.log(minAmount.value + " " + maxAmount.value);
});

//초기화 시키기
function clear(state: string) {
  switch (state) {
    case "minAmount":
      minAmount.value = 0;
      storeminAmount.value = "";
      break;
    case "maxAmount":
      maxAmount.value = 0;
      storemaxAmount.value = "";
      break;
    case "saleUnit":
      saleUnit.value = 0;
      storesaleUnit.value = "";
      break;
    case "pricePerUnit":
      pricePerUnit.value = 0;
      storepricePerUnit.value = "";
      break;
  }
}

///거래등록
const buttonClass = ref("text-everly-white bg-everly-main cursor-pointer");
function createPost() {
  //판매등록
  if (checkPost()) showModal.value = true;
}

function checkPost() {
  var minAmount = storeminAmount.value;
  var maxAmount = storemaxAmount.value;
  var saleUnit = storesaleUnit.value;
  var pricePerUnit = storepricePerUnit.value;
  var title = storetitle.value;

  if (commonFunction.checkMinMax(minAmount, maxAmount)) {
    console.log("minmax실패");
    failedType.value = "minMax";
    showFailedModal.value = true;
    return false;
  }
  if (commonFunction.checkMinMax(saleUnit, maxAmount)) {
    failedType.value = "wrongPrice";
    showFailedModal.value = true;
    return false;
  }
  if (commonFunction.checkTitle(title)) {
    failedType.value = "title";
    showFailedModal.value = true;
    return false;
  }
  if (
    minAmount == "" ||
    maxAmount == "" ||
    saleUnit == "" ||
    pricePerUnit == "" ||
    title == ""
  ) {
    failedType.value = "mandatory";
    showFailedModal.value = true;
    return false;
  }
  return true;
}
//정규식 확인
const showFailedModal = ref(false);
const failedType = ref("");

function failedModaloff(status: boolean) {
  showFailedModal.value = status;
}
// 상태에 따라 버튼색 다르게 하기
// watch(
//   [
//     storeminAmount,
//     storemaxAmount,
//     storesaleUnit,
//     storepricePerUnit,
//     storetitle,
//   ],
//   () => {
//     if (checkPost())
//       buttonClass.value = "text-everly-white bg-everly-main cursor-pointer";
//     else buttonClass.value = "text-everly-white bg-everly-mid_grey";
//   }
// );

//나갈때 초기화
onUnmounted(() => {
  writeStore.$reset();
});
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
