<template>
  <div></div>
</template>

<script setup lang="ts">
import type { TokenDto } from "@/domain/auth";
import { useauthStore } from "@/store/modules/auth/authStore";
import { usemypageStore } from "@/store/modules/mypage/mypageStore";
import { useRouter } from "vue-router";

const router = useRouter();
const mypageStore = usemypageStore();
const authstore = useauthStore();

mypageStore.$reset();
authstore.deleteToken();

setTimeout(() => {
  router.push("/");
}, 100);
</script>

<style scoped></style>
