<template>
  <BannerWeb class="hidden md:block" />
  <BannerMobile class="block md:hidden" />
  <div class="flex w-full z-0">
    <div class="flex-grow"></div>
    <div class="flex-none w-full md:w-[1180px] bg-[#f0f0f0] md:bg-white py-6">
      <div
        class="grid grid-cols-1 md:grid-cols-2 gap-4 px-3 md:px-0"
        v-show="!storeShowFilter_mobile"
      >
        <div
          v-for="card in storeProductCard"
          class="border rounded-xl shadow-md md:shadow-none bg-white"
        >
          <ProductCard :card="card" />
        </div>
      </div>
      <div class="w-full justify-center items-center flex pt-4">
        <div
          class="rounded-lg py-1 md:py-3 px-3 md:px-10 flex text-everly-drak_grey bg-everly-white text-sm md:text-base shadow-none md:shadow-xl border border-black md:border"
        >
          <span class="pr-2">전체보기</span
          ><img src="@/assets/icon/plus_grey.svg" alt="" />
        </div>
      </div>
    </div>
    <div class="flex-grow"></div>
  </div>
</template>

<script setup lang="ts">
import BannerWeb from "@/components/home/components/banner/bannerWeb.vue";
import BannerMobile from "@/components/home/components/banner/bannerMobile.vue";
import ProductCard from "./components/cards/productCard.vue";
import { useFilterStore } from "@/store/modules/home/filterStore";
import { storeToRefs } from "pinia";
import { useMainStore } from "@/store/modules/home/mainStore";

const filterStore = useFilterStore();
const { storeShowFilter_mobile } = storeToRefs(filterStore);

const mainStore = useMainStore();
const { storeProductCard } = storeToRefs(mainStore);
</script>

<style scoped></style>
