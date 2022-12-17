<template>
  <div>
    <div class="hidden">
      <form id="tranMgr" name="tranMgr" method="post" onsubmit="">
        <!-- 각 값들을 가맹점에 맞게 설정해 주세요. -->
        <input type="text" name="PayMethod" value="CARD" placeholder="" />
        <input
          type="text"
          name="GoodsCnt"
          maxlength="2"
          value="1"
          placeholder="123"
        />
        <input
          type="text"
          name="GoodsName"
          maxlength="40"
          value="상품명"
          placeholder=""
        />
        <input
          type="text"
          name="Amt"
          maxlength="12"
          value="1000"
          placeholder=""
        />
        <input
          type="text"
          name="Moid"
          maxlength="40"
          value="123456"
          placeholder="특수문자 포함 불가"
        />
        <input
          type="text"
          name="Mid"
          maxlength="10"
          value="t_2212121m"
          placeholder=""
        />
        <input
          type="text"
          name="ReturnUrl"
          size="100"
          class="input"
          value="http://everly.co.kr/smartro/smartro-payment-result.php"
        />
        <input
          type="text"
          name="StopUrl"
          size="100"
          class="input"
          value="http://everly.co.kr/smartro/smartro-payment-result.php"
          placeholder="Mobile 연동 시 필수"
        />
        <input
          type="text"
          name="BuyerName"
          maxlength="30"
          value="강문식"
          placeholder=""
        />
        <input
          type="text"
          name="BuyerTel"
          maxlength="30"
          value="01023451234"
          placeholder=""
        />
        <input
          type="text"
          name="BuyerEmail"
          maxlength="30"
          value="kiro@gmail.com"
          placeholder=""
        />
        <input
          type="text"
          name="UserIp"
          maxlength="20"
          value=""
          placeholder=""
        />
        <input
          type="text"
          name="VbankExpDate"
          maxlength="8"
          value=""
          placeholder="가상계좌 이용 시 필수"
        />
        <input
          type="text"
          name="EncryptData"
          :value="EncryptData"
          style="background-color: aqua"
          placeholder="위/변조방지 HASH 데이터"
        />
        <input
          type="text"
          name="GoodsCl"
          value="0"
          placeholder="가맹점 설정에 따라 0 또는 1, 핸드폰결제 시 필수"
        />
        <input
          type="text"
          name="EdiDate"
          maxlength="14"
          :value="EdiDate"
          placeholder=""
          style="background-color: red"
        />
        <!-- MID 기본 세팅시 부가세 직접계산으로 설정됩니다. -->
        <input
          type="text"
          name="TaxAmt"
          maxlength="12"
          value="910"
          placeholder="부가세 직접계산 가맹점 필수,숫자만 가능, 문장부호 제외"
        />
        <input
          type="text"
          name="TaxFreeAmt"
          maxlength="12"
          value="0"
          placeholder="부가세 직접계산 가맹점 필수,숫자만 가능, 문장부호 제외"
        />
        <input
          type="text"
          name="VatAmt"
          maxlength="12"
          value="90"
          placeholder="부가세 직접계산 가맹점 필수,숫자만 가능, 문장부호 제외"
        />
      </form>

      <!-- PC 연동의 경우에만 아래 승인폼이 필요합니다. (Mobile은 제외) -->
      <!-- <form ref="approvalFormVue" name="approvalForm" method="post">
        <input type="text" id="Tid" name="Tid" />
        <input type="text" id="TrAuthKey" name="TrAuthKey" />
      </form> -->
    </div>
    <button
      type="button"
      class="btn btn-primary"
      id="contract-button"
      @click="goPay()"
    >
      결제하기
    </button>
  </div>
</template>

<script setup lang="ts">
import axios, { type GenericHTMLFormElement } from "axios";
import { ref } from "vue";
import { useAxios } from "@vueuse/integrations/useAxios";

const approvalFormVue: any = ref(null);

const instance = axios.create({});

const EncryptData = ref("");
const EdiDate = ref("");

function goPay() {
  useAxios("http://everly.co.kr/pay.php", instance).then((res) => {
    EncryptData.value = res.data.value.EncryptData;
    EdiDate.value = res.data.value.EdiDate;
    setTimeout(() => {
      // 스마트로페이 초기화
      //@ts-expect-error
      smartropay.init({
        mode: "STG", // STG: 테스트, REAL: 운영
      });

      // 스마트로페이 결제요청
      // PC 연동시 아래와 같이 smartropay.payment 함수를 구현합니다.
      //@ts-expect-error
      smartropay.payment({
        FormId: "tranMgr", // 폼ID
        Callback: function (res: any) {
          console.log(res);

          var bodyFormData = new FormData();
          bodyFormData.append("Tid", res.Tid);
          bodyFormData.append("TrAuthKey", res.TrAuthKey);

          axios({
            method: "post",
            url: "http://everly.co.kr/pay2.php",
            data: bodyFormData,
            headers: { "Content-Type": "multipart/form-data" },
          })
            .then(function (response) {
              //handle success
              console.log(response);
            })
            .catch(function (response) {
              //handle error
              console.log(response);
            });
        },
      });

      // Mobile 연동시 아래와 같이 smartropay.payment 함수를 구현합니다.
      //@ts-expect-error
      smartropay.payment({
        FormId: "tranMgr", // 폼ID
      });
    }, 1000);
  });
}
</script>

<style scoped></style>

<!-- <template>
  <div>
    <ModalSmall
      :propsShowModal="true"
      :propsButtonText="`메인으로 가기`"
      :propsContentText="`준비 중인 페이지입니다.`"
      :propsLink="`/`"
    />
  </div>
</template>

<script setup lang="ts">
import ModalSmall from "@/components/modal/modalSmall.vue";
</script>

<style scoped></style> -->
