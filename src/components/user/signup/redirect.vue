<template>
  <div>123132</div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();

let authId = route.query.authId;
let mode = route.query.mode;

// let url =
//   `http://localhost:5173/account/signUp/setinfo?authId=` + authId;
let url =
  `http://www.test.item1004.co.kr/account/signUp/setinfo?authId=` + authId;
window.opener.location.replace(url); //부모창 reload
window.close(); //현재 팝업창 Close
</script>

<style scoped></style>
