<template>
  <div>redirect</div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();

let authId = route.query.authId;
let mode = route.query.mode;
let result = route.query.result;

if (result == "success") {
  // let url = `http://localhost:5173/account/signUp/setinfo?authId=` + authId;
  let url =
    `https://vue.d27plzynpw231y.amplifyapp.com/account/signUp/setinfo?authId=` +
    authId;
  window.opener.location.replace(url); //부모창 reload
  window.close(); //현재 팝업창 Close
} else {
  alert(
    "본인인증에 실패했습니다.\n아이폰 또는 사파리 사용 중이실 경우 웹사이트를 이용해주세요."
  );
  let url =
    `https://vue.d27plzynpw231y.amplifyapp.com/account/signUp/confirm` + authId;
  window.opener.location.replace(url); //부모창 reload
  window.close(); //현재 팝업창 Close
}
</script>

<style scoped></style>
