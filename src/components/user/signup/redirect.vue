<template>
  <div>redirect</div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();

const authId = route.query.authId;
const mode = route.query.mode;
const result = route.query.result;
const type = route.query.type;
const isAdult = route.query.type;

const baseurl = "https://www.item1004.co.kr";
const testurl = import.meta.env.VITE_BASE_URL_AUTH_TEST;
let url = "";
//API 경로 설정
if (import.meta.env.MODE == "production") {
  url = baseurl;
} else {
  url = testurl;
}

console.log("route는 : ", route);
console.log("location.host : ", location.host);

if (result === "success" && type === "signup") {
  // let url = `http://localhost:5173/account/signUp/setinfo?authId=` + authId;
  url = `${url}/account/signUp/setinfo?authId=` + authId;
  window.opener.location.replace(url); //부모창 reload
  window.close(); //현재 팝업창 Close
} else if (result === "success" && type === "adult") {
  url = `${url}/adult`;
  // 성인인증 완료 됐을 때만
  if (isAdult) {
    url = `${url}/home`;
  }
  window.opener.location.replace(url); //부모창 reload
  window.close(); //현재 팝업창 Close
} else {
  url = `${url}/account/signUp/confirm` + authId;
  if (type === "adult") {
    url = `${url}/adult`;
  }
  alert(
    "본인인증에 실패했습니다.\n아이폰 또는 사파리 사용 중이실 경우 웹사이트를 이용해주세요."
  );

  window.opener.location.reload(url); //부모창 reload
  window.close(); //현재 팝업창 Close
}
</script>

<style scoped></style>
