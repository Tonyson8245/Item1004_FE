<template>
  <ModalWriteComfirm
    :showModal="showModal"
    @select="select($event)"
    :postType="`character`"
  />
  <ModalWriteFailed
    :showModal="showFailedModal"
    :failedType="failedType"
    @select="failedModaloff($event)"
  />
  <div>
    <div
      class="grid w-full md:grid-cols-12 grid-cols-1 gap-2 md:gap-y-20 md:pt-10 text-sm md:text-base"
    >
      <!-- 판매/구매 가격을 입력해주세요 -->
      <div class="col-span-2 md:pt-0">
        <div class="flex">
          {{ SellBuy }}가격 <span class="hidden md:block">을</span>
        </div>
        <div class="hidden md:block">입력해주세요</div>
      </div>
      <div class="col-span-1 hidden md:block"></div>
      <div class="col-span-9 md:pr-80">
        <div class="flex items-center justify-center">
          <div class="flex-1">
            <inputwithCloseNumber
              :propsClass="`px-3 md:px-5 text-left py-2 shrink w-full`"
              :propsPlaceholder="pricePlaceholder"
              :modelValue="storepricePerUnit"
              @getModel="storepricePerUnit = $event"
            />
          </div>
          <div class="px-2">원</div>
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
      <!-- 캐릭터 직업 -->
      <div class="col-span-2 pt-4 sm:pt-8 md:pt-0">
        <div class="flex">캐릭터 직업</div>
      </div>
      <div class="col-span-1 hidden md:block"></div>
      <div class="col-span-9">
        <dropdown
          class="md:hidden block"
          :propsRoleList="storeRoleList"
          :propsPlaceholder="`캐릭터 직업을 선택하세요`"
          :propsClass="`w-full`"
          :modelValue="storeroleName"
          @getValue="storeroleIdx = $event"
        />
        <dropdown
          class="hidden md:block"
          :propsRoleList="storeRoleList"
          :propsPlaceholder="`캐릭터 직업을 선택하세요`"
          :propsClass="`w-[480px]`"
          :modelValue="storeroleName"
          @getValue="storeroleIdx = $event"
        />
      </div>

      <!-- 캐릭터 레벨 -->
      <div class="col-span-2 pt-4 sm:pt-8 md:pt-0">
        <div class="flex">캐릭터 레벨</div>
      </div>
      <div class="col-span-1 hidden md:block"></div>
      <div class="col-span-9 md:pr-[370px]">
        <div class="flex items-center justify-center">
          <inputwithCloseNumber
            :propsClass="`px-3 md:px-5 text-left py-2 shrink w-full`"
            :propsPlaceholder="`캐릭터 레벨을 입력하세요`"
            :modelValue="storelevel.toString()"
            @getModel="storelevel = parseInt($event)"
          />
        </div>
      </div>
      <!-- 계정 종류 -->
      <div class="col-span-2 pt-4 sm:pt-8 md:pt-0">
        <div class="flex">계정 종류</div>
      </div>
      <div class="col-span-1 hidden md:block"></div>
      <div class="col-span-9">
        <dropdown
          class="md:hidden block"
          :propsList="[
            '구글',
            '게임사',
            '페이스북',
            '카카오',
            '네이버',
            '핸드폰',
            '기타',
          ]"
          :propsPlaceholder="`계정 종류을 선택하세요`"
          :propsClass="`w-full`"
          :modelValue="getstoreregistration"
          @getValue="storeregistration = changeregistraion($event)"
        />
        <dropdown
          class="hidden md:block"
          :propsList="[
            '구글',
            '게임사',
            '페이스북',
            '카카오',
            '네이버',
            '핸드폰',
            '기타',
          ]"
          :propsPlaceholder="`계정 종류을 선택하세요`"
          :propsClass="`w-[480px]`"
          :modelValue="getstoreregistration"
          @getValue="storeregistration = changeregistraion($event)"
        />
      </div>
      <!-- 결제내역 유무 -->
      <div class="col-span-2 pt-4 sm:pt-8 md:pt-0">
        <div class="flex">결제내역 유무</div>
      </div>
      <div class="col-span-1 hidden md:block"></div>
      <div class="col-span-9">
        <dropdown
          class="md:hidden block"
          :propsList="['O', 'X']"
          :propsPlaceholder="`결제내역 유무를 선택하세요`"
          :propsClass="`w-full`"
          :modelValue="getstorehasPaymentHistory"
          @getValue="storehasPaymentHistory = $event === 'O' ? true : false"
        />
        <dropdown
          class="hidden md:block"
          :propsList="['O', 'X']"
          :propsPlaceholder="`결제내역 유무를 선택하세요`"
          :propsClass="`w-[480px]`"
          :modelValue="getstorehasPaymentHistory"
          @getValue="storehasPaymentHistory = $event === 'O' ? true : false"
        />
      </div>
      <!-- 이중연동 유무를-->
      <div class="col-span-2 pt-4 sm:pt-8 md:pt-0">
        <div class="flex">이중연동 유무</div>
      </div>
      <div class="col-span-1 hidden md:block"></div>
      <div class="col-span-9">
        <dropdown
          class="md:hidden block"
          :propsList="['O', 'X']"
          :propsPlaceholder="`이중연동 유무를 선택하세요`"
          :propsClass="`w-full`"
          :modelValue="getstoreisDuplicatedSync"
          @getValue="storeisDuplicatedSync = $event === 'O' ? true : false"
        />
        <dropdown
          class="hidden md:block"
          :propsList="['O', 'X']"
          :propsPlaceholder="`이중연동 유무를 선택하세요`"
          :propsClass="`w-[480px]`"
          :modelValue="getstoreisDuplicatedSync"
          @getValue="storeisDuplicatedSync = $event === 'O' ? true : false"
        />
      </div>
    </div>

    <div class="flex justify-center items-center w-full pb-3 pt-7 md:py-20">
      <div
        class="md:text-xl text-base border md:py-3 py-2 border-everly-mid_grey rounded-lg font-bold w-full md:w-[490px] text-center"
        :class="buttonClass"
        @click="clickButton()"
      >
        {{ buttonContent }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import inputwithClose from "@/components/common/inputwithClose.vue";
import inputwithCloseNumber from "@/components/common/inputwithCloseNumber.vue";
import dropdown from "@/components/common/dropdown.vue";
import { useWriteStore } from "@/store/modules/home/writeStore";
import { storeToRefs } from "pinia";
import { watch, ref, onMounted, onUnmounted, computed } from "vue";
import ModalWriteComfirm from "@/components/modal/modalWriteComfirm.vue";
import ModalWriteFailed from "@/components/modal/modalWriteFailed.vue";
import commonFunction from "@/common";
import { useRoute } from "vue-router";
import { useCommonStore } from "@/store/modules/common/commonStore";
import { isNotEmpty } from "class-validator";
const commonStore = useCommonStore();
const { commonStoreServerKeywordIdx, commonStoreGameKeywordIdx } =
  storeToRefs(commonStore);
const writeStore = useWriteStore();
const {
  storepostType,
  storeRoleList,
  getstoreregistration,
  storeroleName,
  storetitle,
  storecontent,
  storepricePerUnit,
  storeregistration,
  storelevel,
  storehasPaymentHistory,
  storeisDuplicatedSync,
  storeroleIdx,
} = storeToRefs(writeStore);
let SellBuy = ref("판매");

watch(storepostType, () => {
  if (storepostType.value == "buy") {
    SellBuy.value = "구매";
  } else {
    SellBuy.value = "판매";
  }
});

let pricePlaceholder = "금액을 입력해주세요.";
let titlePlaceholder = "거래 제목을 입력해주세요";
let descriptionPlaceholder = "거래 상세정보를 입력해주세요";

//등록 확인 모달
const showModal = ref(false);
function select(value: string) {
  console.log(value);
  showModal.value = false;
}

//글작성

onMounted(() => {
  console.log("onMounter");
  writeStore.getGameRole();
});
onUnmounted(() => {
  writeStore.$reset();
});

//계정 종류 변환기
function changeregistraion(text: string) {
  switch (text) {
    case "구글":
      return "google";
    case "게임사":
      return "local";
    case "페이스북":
      return "facebook";
    case "카카오":
      return "kakao";
    case "네이버":
      return "naver";
    case "핸드폰":
      return "phone";
    case "기타":
      return "etc";
    default:
      return "etc";
  }
}

///거래등록
const buttonClass = ref("text-everly-white bg-everly-main cursor-pointer");
function clickButton() {
  //판매등록
  if (checkPost()) showModal.value = true;
}

function checkPost() {
  var roleIdx = storeroleIdx.value;
  var level = storelevel.value;
  var registration = storeregistration.value;
  var hasPaymentHistory = storehasPaymentHistory.value;
  var isDuplcationSync = storeisDuplicatedSync.value;
  var pricePerUnit = storepricePerUnit.value;
  var title = storetitle.value;

  if (parseInt(pricePerUnit) < 2000) {
    failedType.value = "minTotalPrice";
    showFailedModal.value = true;
    return false;
  }
  if (commonStoreGameKeywordIdx.value == 0) {
    failedType.value = "noGameIdx";
    showFailedModal.value = true;
    return false;
  }
  if (commonStoreServerKeywordIdx.value == 0) {
    failedType.value = "noServerIdx";
    showFailedModal.value = true;
    return false;
  }
  if (commonFunction.checkTitle(title)) {
    failedType.value = "title";
    showFailedModal.value = true;
    return false;
  }
  if (
    roleIdx == 0 ||
    level == 0 ||
    registration == "" ||
    hasPaymentHistory == null ||
    isDuplcationSync == null ||
    title == ""
  ) {
    failedType.value = "mandatory";
    showFailedModal.value = true;
    return false;
  }
  return true;
}

const showFailedModal = ref(false);
const failedType = ref("");

function failedModaloff(status: boolean) {
  showFailedModal.value = status;
}

//나갈때 초기화
onUnmounted(() => {
  writeStore.$reset();
});

////수정일 때
const route = useRoute();
const buttonContent = ref("거래등록하기");
onMounted(() => {
  if (route.meta.name == "edit") {
    buttonContent.value = "거래 수정하기";
  } else {
    buttonContent.value = "거래 등록하기";
  }
});
const getstoreisDuplicatedSync = computed(() => {
  // null 이 아닐때만 O,X 넣기
  var text = isNotEmpty(storeisDuplicatedSync.value)
    ? storeisDuplicatedSync.value
      ? "O"
      : "X"
    : null;
  return text;
});

const getstorehasPaymentHistory = computed(() => {
  // null 이 아닐때만 O,X 넣기
  var text = isNotEmpty(storehasPaymentHistory.value)
    ? storehasPaymentHistory.value
      ? "O"
      : "X"
    : null;
  return text;
});
</script>

<style scoped></style>
