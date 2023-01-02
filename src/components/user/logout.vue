<template>
  <div></div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

router.push("/");
setTimeout(() => {
  router.go(0);
}, 100);
</script>

<style scoped></style>
