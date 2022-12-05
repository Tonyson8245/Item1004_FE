<template>
  <div
    @click="
      toggleSearchWeb();
      toggleSearch();
    "
  >
    <headerComponentVue class="w-full z-50 top-0 absolute md:sticky" />

    <router-view> </router-view>

    <!-- 모바일은 네비바가 항상있고, 웹은 푸터가 항상있다. -->
    <Navbar class="block md:hidden" />
    <FooterWeb class="hidden md:block" />
  </div>
</template>
<script lang="ts" setup>
import { useSearchStore } from "@/store/modules/home/searchStore";
import { useFilterStore } from "@/store/modules/home/filterStore";
import headerComponentVue from "../components/header/headerComponent.vue";
import { storeToRefs } from "pinia";
import Navbar from "@/components/footer/NavbarMobile.vue";
import FooterWeb from "@/components/footer/footerWeb.vue";

const filterStore = useFilterStore();

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
  filterStore.setstoreShowGameSimilar(false);
  filterStore.setstoreShowServerSimilar(false);
}
</script>
<style lang="scss"></style>
