<template>
  <div>
    <div
      class="invisible md:visible text-center text-sm text-everly-dark_grey cursor-pointer"
    >
      <div class="flex divide-xs w-full justify-center">
        <div class="text-center px-2 text-everly-dark_grey">
          <button class="text-sm" @click="moveExternalLink('서비스이용약관')">
            이용약관
          </button>
        </div>
        <div class="text-center px-2 text-everly-dark_grey">
          <button class="text-sm" @click="moveExternalLink('개인정보처리방침')">
            개인정보 처리방침
          </button>
        </div>
        <div class="text-center px-2 text-everly-dark_grey">
          <button class="text-sm" @click="moveExternalLink('문의하기')">
            고객센터
          </button>
        </div>
      </div>
    </div>
    <div
      class="md:invisible text-center text-sm text-everly-dark_grey cursor-pointr py-1 w-full"
      v-if="csShowLink"
    >
      고객센터 문의하기
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCommon } from "@/store/modules/ui/common";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { moveExternalLink } from "@/common";

const router = useRouter();

const { headerTitle, csShowLink } = storeToRefs(useCommon());

function backPress() {
  router.go(-1);
}
</script>

<style scoped></style>
