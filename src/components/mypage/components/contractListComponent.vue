<template>
  <div
    class="md:w-[60rem] md:border-everly-dark_grey md:border-b cursor-pointer"
    @click="moveToCard"
  >
    <div
      class="flex w-full text-xs font-bold md:text-sm md:font-normal px-4 py-2 md:px-5 md:py-2 border-b border-everly-light_grey md:border-everly-mid_grey space-x-2 md:space-x-3"
    >
      <div>거래일자</div>
      <div>{{ props.card?.contract.createdAt }}</div>
    </div>
    <div class="flex items-center px-4 py-2 md:px-5 md:py-5">
      <div
        class="w-full md:w-[35rem] flex justify-between md:justify-start items-center md:items-start"
      >
        <div
          class="hidden md:flex flex-col items-center border border-everly-mid_grey rounded-lg p-2 w-16 h-16 mr-10"
        >
          <img
            :src="`/assets/icon/${imageSrcWeb(type)}.svg`"
            alt=""
            class="w-[2.2rem] h-[2.2rem]"
          />
          <div class="text-xs pt-0.5">{{ imgText(type) }}</div>
        </div>
        <div class="space-y-1 md:space-y-1">
          <div class="text-xs md:text-sm">
            {{ props.card?.post.gameName }} > {{ props.card?.post.serverName }}
          </div>
          <div class="text-sm md:text-sm">{{ props.card?.post.title }}</div>
          <div class="flex text-xs items-center py-2 md:py-0 space-x-1">
            <div class="font-bold md:text-sm md:font-normal">
              수량[{{ props.card?.contract.countBuyProduct }}]
            </div>
            <div class="flex md:hidden items-center space-x-1">
              <div class="text-sm flex">
                {{ props.card?.contract.purchaseTotalPrice.toLocaleString() }}
                <span class="md:hidden pl-1"> 원</span>
              </div>
            </div>
          </div>
        </div>
        <div
          class="md:hidden flex flex-col items-center border border-everly-mid_grey rounded-lg p-2 w-[3.75rem] h-[3.75rem]"
        >
          <img
            :src="`/assets/icon/${imageSrcMobile(type)}.svg`"
            alt=""
            class="w-[1.5rem] h-[1.5rem]"
          />
          <div class="text-xs">{{ imgText(type) }}</div>
        </div>
      </div>
      <div class="hidden md:flex text-sm flex-1 text-right">
        <div class="md:w-[11.625rem]">
          {{ props.card?.contract.purchaseTotalPrice.toLocaleString() }}
        </div>
        <div class="md:w-[13.375rem]">
          <div>{{ props.card?.otherUser.nickname }}</div>
          <div class="text-everly-dark_grey">
            #{{ props.card?.otherUser.code }}
          </div>
        </div>
      </div>
    </div>
    <div
      class="md:hidden flex justify-between text-xs px-4 py-2 md:px-5 md:py-3 bg-everly-wbg_grey border-[#c7c7c7] border-b"
    >
      <div>{{ props.card?.otherUser.nickname }}</div>
      <div>#{{ props.card?.otherUser.code }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import type { card } from "@/domain/payment/contracPostListDto.interface";
import { usemypageStore } from "@/store/modules/mypage/mypageStore";
import { storeToRefs } from "pinia";
import router from "@/router";
import { post } from "@/domain/payment/contractPostDetailDto.interaface";

const mypageStore = usemypageStore();
const { storeContractListTabType } = storeToRefs(mypageStore);
const props = defineProps({
  card: Object as PropType<card>,
  status: Number,
});

const type = props.card?.post.productType;
const status = storeContractListTabType.value == 2;

const imageSrcWeb = (category: string | undefined) => {
  switch (category) {
    case "gameMoney":
      return !status ? "gamemoney_active" : "gamemoney";
    case "item":
      return !status ? "item_active" : "item";

    case "character":
      return !status ? "character_active" : "character";

    case "etc":
      return !status ? "etc_active" : "etc";
  }
};

const imageSrcMobile = (category: string | undefined) => {
  switch (category) {
    case "gameMoney":
      return !status ? "gamemoney_active_mobile" : "gamemoney_mobile";
    case "item":
      return !status ? "item_active_mobile" : "item_mobile";

    case "character":
      return !status ? "character_active_mobile" : "character_mobile";

    case "etc":
      return !status ? "etc_active_mobile" : "etc_mobile";
  }
};

const imgText = (category: string | undefined) => {
  switch (category) {
    case "gameMoney":
      return "게임머니";
    case "item":
      return "아이템";
    case "character":
      return "캐릭터";
    case "etc":
      return "기타";
  }
};

function moveToCard() {
  var postIdx = props.card?.post.idx;
  var ordNm = props.card?.contract.ordNm;
  if (postIdx != undefined && ordNm != undefined) {
    router.push("/mypage/contractInfo?ordNm=" + ordNm + "&postIdx=" + postIdx);
  } else {
    alert("정보가 올바르지 않습니다.");
  }
}
</script>

<style scoped></style>
