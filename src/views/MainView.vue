<template>
  <div
    @click="
      toggleSearchWeb();
      toggleSearch();
      toogleDropDown();
    "
    class="relative"
  >
    <!-- 모바일은 필터 + 헤더 / 웹은 헤더 -> 검색 -> 필터의 구조 -->
    <webHeader class="w-full z-10 top-0 hidden md:block sticky md:sticky" />
    <MobileHeader />

    <!-- 결제 테스트시  -->
    <!-- <router-view v-slot="{ Component }">
      <component :is="Component" @goPay="goPay()"
    /></router-view> -->

    <!-- 결제 테스트 안할시  -->
    <router-view></router-view>
    <!-- 모바일은 네비바가 홈에만 있고, 웹은 푸터가 항상있다. -->
    <Postbar
      class="block md:hidden text-center w-full fixed bottom-0"
      v-if="route.meta.name == `post`"
    />
    <!-- 결제 테스트 시 사용 -->
    <!-- <PaymentbarMobile
      class="block md:hidden text-center w-full fixed bottom-0"
      v-else-if="route.meta.name == `payment`"
      @goPay="goPay()"
    /> -->
    <!-- 결제 테스트 안할시 사용-->
    <ContractInfobar
      class="block md:hidden text-center w-full fixed bottom-0"
      v-else-if="route.meta.name == `contractInfo`"
    />
    <PaymentbarMobile
      class="block md:hidden text-center w-full fixed bottom-0"
      v-else-if="route.meta.name == `payment`"
    />
    <FooterLogin
      class="hidden md:block md:pb-20"
      v-else-if="route.meta.name == `paymentResult`"
    />
    <Navbar
      class="block md:hidden text-center w-full fixed bottom-0"
      style="z-index: 5"
      v-else-if="route.meta.navbar"
    />

    <FooterWeb
      class="hidden md:block w-full bottom-0"
      v-if="route.meta.name != `paymentResult`"
    />

    <!-- 스마트로 결제 / 결제 테스트 시 사용-->
    <!-- <smartroVue ref="childComponentRef" /> -->
  </div>
</template>
<script lang="ts" setup>
import { useSearchStore } from "@/store/modules/home/searchStore";
import webHeader from "../components/header/webHeader.vue";
import { storeToRefs } from "pinia";
import Navbar from "@/components/footer/NavbarMobile.vue";
import Postbar from "@/components/footer/PostbarMobile.vue";
import FooterWeb from "@/components/footer/footerWeb.vue";
import PaymentbarMobile from "@/components/footer/PaymentbarMobile.vue";
import { useMainStore } from "@/store/modules/home/mainStore";
import { useCommonStore } from "@/store/modules/common/commonStore";
import { useComponentStore } from "@/store/modules/common/componentStore";
import { useRoute } from "vue-router";
import FooterLogin from "@/components/footer/footerLogin.vue";
import ContractInfobar from "@/components/footer/ContractInfobarMobile.vue";
import { usemypageStore } from "@/store/modules/mypage/mypageStore";
import MobileHeader from "@/components/header/mobileHeader.vue";

// import smartroVue from "@/components/payment/smartro.vue";

// 결제 시작 버튼 // 결제시 사용
// const childComponentRef = ref<InstanceType<typeof smartroVue> | null>(null);
// const goPay = () => {
//   childComponentRef.value?.open();
// };

const mainStore = useMainStore();
const commonStore = useCommonStore();
const componentStore = useComponentStore();
const route = useRoute();

//검색창 활성화 값 가져오기
const searchStore = useSearchStore();
const { storeShowSearch_web } = storeToRefs(searchStore);

//웹 검색창 비활성화
function toggleSearchWeb() {
  if (storeShowSearch_web) {
    searchStore.setstoreShowSearch_web(false);
  }
}

//웹 필터 검색창 비활성화
function toggleSearch() {
  commonStore.setstoreShowGameSimilar(false);
  commonStore.setstoreShowServerSimilar(false);
}

async function toogleDropDown() {
  await componentStore.toogleCloseDropdown(true);
  await componentStore.toogleCloseDropdown(false);
}
</script>
<style lang="scss"></style>
