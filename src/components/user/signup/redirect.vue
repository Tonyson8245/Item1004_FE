<template>
  <div>redirect</div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();

let authId = route.query.authId;
let type = route.query.type;
let result = route.query.result;

// 회원가입 시 사용
if (type == "signup") {
  if (result == "success") {
    // let url = `http://localhost:5173/account/signUp/setinfo?authId=` + authId;
    let url =
      `https://www.item1004.co.kr/account/signUp/setinfo?authId=` + authId;
    window.opener.location.replace(url); //부모창 reload
    window.close(); //현재 팝업창 Close
  } else {
    failed();
  }
} else {
  failed();
}

function failed() {
  alert(
    "본인인증에 실패했습니다.\n아이폰 또는 사파리 사용 중이실 경우 웹사이트를 이용해주세요."
  );
  window.opener.location.reload(); //부모창 reload
  window.close(); //현재 팝업창 Close
}
</script>

<style scoped></style>
