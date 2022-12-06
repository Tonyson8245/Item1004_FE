<template>
  <div
    @click="
      toggleSearchWeb();
      toggleSearch();
    "
  >
    <headerComponentVue class="w-full z-50 top-0 absolute md:sticky" />

    <router-view></router-view>

    <!-- 모바일은 네비바가 홈에만 있고, 웹은 푸터가 항상있다. -->
    <Navbar
      class="block md:hidden text-center w-full fixed bottom-0"
      v-if="route.meta.name == `home`"
    />
    <FooterWeb class="hidden md:block" v-if="!storeinfiniteStatus" />
  </div>
</template>
<script lang="ts" setup>
import { useSearchStore } from "@/store/modules/home/searchStore";
import { useFilterStore } from "@/store/modules/home/filterStore";
import headerComponentVue from "../components/header/headerComponent.vue";
import { storeToRefs } from "pinia";
import Navbar from "@/components/footer/NavbarMobile.vue";
import FooterWeb from "@/components/footer/footerWeb.vue";
import { useMainStore } from "@/store/modules/home/mainStore";
import { useCommonStore } from "@/store/modules/common/commonStore";
import { useRoute } from "vue-router";

const mainStore = useMainStore();
const commonStore = useCommonStore();
const route = useRoute();

//검색창 활성화 값 가져오기
const searchStore = useSearchStore();
const { storeShowSearch_web } = storeToRefs(searchStore);
const { storeinfiniteStatus } = storeToRefs(mainStore);

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
</script>
<style lang="scss"></style>
