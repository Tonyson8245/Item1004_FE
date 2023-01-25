<template>
  <div></div>
</template>

<script setup lang="ts">
import type { TokenDto } from "@/domain/auth";
import { usemypageStore } from "@/store/modules/mypage/mypageStore";
import { useRouter } from "vue-router";

const router = useRouter();
const mypageStore = usemypageStore();

const localData = localStorage.getItem("refreshtoken");
mypageStore.resetUserInfoOverview();

router.push("/");
setTimeout(() => {
  router.go(0);
}, 100);
</script>

<style scoped></style>
