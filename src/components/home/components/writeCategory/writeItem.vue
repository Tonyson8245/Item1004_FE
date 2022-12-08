<template>
  <ModalWriteComfirm :showModal="showModal" @select="select($event)" />
  <div>
    <div
      class="grid w-full md:grid-cols-12 grid-cols-1 gap-2 md:gap-y-20 md:pt-10 text-sm md:text-base"
    >
      <!-- 판매/구매수량을 입력해주세요 -->
      <div class="col-span-2 md:pt-0">
        <div class="flex">
          {{ StoreBuy }}수량 <span class="hidden md:block">을</span>
        </div>
        <div class="hidden md:block">입력해주세요</div>
      </div>
      <div class="col-span-1 hidden md:block"></div>
      <div class="col-span-9 md:pr-10">
        <div class="flex items-center justify-center">
          <div class="flex-1">
            <inputwithClose
              :propsClass="`px-3 md:px-5 text-left py-2 shrink w-full`"
              :propsPlaceholder="itemQtyPlaceholder"
              :modelValue="itemQty"
              @getModel="itemQty = $event"
            />
          </div>
          <div class="flex-none mx-2 sm:mx-3">
            <dropdown :currency="currency" />
          </div>
          <div class="flex-none">개 {{ SellBuy }}</div>
          <div class="flex-none hidden md:block">를 희망합니다.</div>
        </div>
      </div>
      <!-- 최소수량을 입력해주세요 -->
      <div class="col-span-2 pt-4 sm:pt-8 md:pt-0">
        <div class="flex">최소수량 <span class="hidden md:block">을</span></div>
        <div class="hidden md:block">입력해주세요</div>
      </div>
      <div class="col-span-1 hidden md:block"></div>
      <div class="col-span-9 md:pr-10">
        <div class="flex items-center justify-center">
          <div class="flex-1">
            <inputwithClose
              :propsClass="`px-3 md:px-5 text-left py-2 shrink w-full`"
              :propsPlaceholder="SellBuy + minQtyPlaceholder"
              :modelValue="minQty"
              @getModel="minQty = $event"
            />
          </div>
          <div class="flex-none mx-2 sm:mx-3">
            <dropdown :currency="currency" />
          </div>
          <div class="flex-none">개 {{ SellBuy }}</div>
          <div class="flex-none hidden md:block">를 희망합니다.</div>
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
      <div class="col-span-9 md:pr-64">
        <div class="flex items-center justify-center gap-2 sm:gap-3">
          <inputwithClose
            :propsClass="`px-3 md:px-5 text-left py-2 shrink flex-1 w-full`"
            :propsPlaceholder="priceUnitPlaceholder"
            :modelValue="priceUnit"
            @getModel="priceUnit = $event"
          />
          <div class="flex-none">{{ currency }} 당</div>
          <inputwithClose
            :propsClass="`px-3 md:px-5 text-left py-2 shrink flex-1 w-full`"
            :propsPlaceholder="SellBuy + priceSellBuyPlaceholer"
            :modelValue="priceSellBuy"
            @getModel="priceSellBuy = $event"
          />
          <div class="flex-none">원</div>
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
          :modelValue="title"
          @getModel="title = $event"
        />
        <div class="pl-3 md:pl-5 md:text-sm text-xs pt-1">
          *거래제목은 한글,영어 숫자로만 작성이 가능합니다.
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
          <inputwithClose
            :propsClass="`px-3 md:px-5 text-left py-2 shrink w-full`"
            :propsPlaceholder="descriptionPlaceholder"
            :modelValue="description"
            @getModel="description = $event"
          />
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
            :modelValue="character"
            @getModel="character = $event"
          />
        </div>
      </div>
    </div>
    <div class="flex justify-center items-center w-full pb-3 pt-7 md:py-20">
      <div
        class="md:text-xl text-base border md:py-3 py-2 border-everly-mid_grey rounded-lg bg-everly-mid_grey font-bold text-everly-white w-full md:w-[490px] text-center cursor-pointer"
        @click="showModal = true"
      >
        거래 등록하기
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import inputwithClose from "@/components/common/inputwithClose.vue";
import dropdown from "@/components/common/dropdownGamemoney.vue";
import { useWriteStore } from "@/store/modules/home/writeStore";
import { storeToRefs } from "pinia";
import { watch, ref } from "vue";
import ModalWriteComfirm from "@/components/modal/modalWriteComfirm.vue";

const currency = "메소";
const writeStore = useWriteStore();
const { storeSellBuy } = storeToRefs(writeStore);

let SellBuy = ref("판매");
let StoreBuy = ref("보유");

watch(storeSellBuy, () => {
  if (storeSellBuy.value == "buy") {
    SellBuy.value = "구매";
    StoreBuy.value = "구매";
  } else {
    SellBuy.value = "판매";
    StoreBuy.value = "보유";
  }
});

let itemQtyPlaceholder = "금액을 입력해주세요.";
let minQtyPlaceholder = "해야하는 최소 수량";
let priceUnitPlaceholder = "최소 수량";
let priceSellBuyPlaceholer = " 금액";
let titlePlaceholder = "거래 제목을 입력해주세요";
let descriptionPlaceholder = "거래 상세정보를 입력해주세요";
let characterPlaceholder = "전달할 캐릭터명을 입력해주세요";

let itemQty = ref("");
let minQty = ref("");
let priceUnit = ref("");
let priceSellBuy = ref("");
let title = ref("");
let description = ref("");
let character = ref("");

//등록 확인 모달
const showModal = ref(false);
function select(value: string) {
  console.log(value);
  showModal.value = false;
}
</script>

<style scoped></style>
