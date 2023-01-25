<template>
  <div class="hidden" @click="goPay">
    <form id="tranMgrWeb" name="tranMgrWeb" method="post" onsubmit="">
      <!-- 각 값들을 가맹점에 맞게 설정해 주세요. -->
      <input
        type="text"
        name="PayMethod"
        :value="storePaymentMethod"
        placeholder=""
      />
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
        :value="storeFinalPrice"
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
        :value="returnUrl"
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
        value="01026899609"
        placeholder=""
      />
      <input
        type="text"
        name="BuyerEmail"
        maxlength="30"
        value=""
        placeholder=""
      />
      <input type="text" name="UserIp" maxlength="20" value="" placeholder="" />
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
        :value="TaxAmt"
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
        :value="VatAmt"
        placeholder="부가세 직접계산 가맹점 필수,숫자만 가능, 문장부호 제외"
      />
    </form>
    <form id="tranMgrMobile" name="tranMgrMobile" method="post" onsubmit="">
      <!-- 각 값들을 가맹점에 맞게 설정해 주세요. -->
      <input
        type="text"
        name="PayMethod"
        :value="storePaymentMethod"
        placeholder=""
      />
      <input
        type="text"
        name="ReturnUrl"
        size="100"
        class="input"
        :value="returnUrl"
      />
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
        value="게임머니"
        placeholder=""
      />
      <input
        type="text"
        name="Amt"
        maxlength="12"
        :value="storeFinalPrice"
        placeholder=""
      />
      <input
        type="text"
        name="Moid"
        maxlength="40"
        value="483"
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
        id="StopUrl"
        type="text"
        name="StopUrl"
        size="100"
        class="input"
        value="https://www.test.item1004.co.kr/payment"
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
      <input type="text" name="UserIp" maxlength="20" value="" placeholder="" />
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
        :value="TaxAmt"
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
        :value="VatAmt"
        placeholder="부가세 직접계산 가맹점 필수,숫자만 가능, 문장부호 제외"
      />
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { storeToRefs } from "pinia";
import { usePaymentStore } from "@/store/modules/home/paymentStore";
import axios from "axios";
import { useRouter } from "vue-router";
import { useMediaQuery } from "@vueuse/core";
import { loadScript } from "vue-plugin-load-script";

const router = useRouter();
const paymentStore = usePaymentStore();

///결제 관련
const EncryptData = ref("");
const EdiDate = ref("");
const VatAmt = ref("");
const TaxAmt = ref("");
const BaseApiUrl =
  "https://4045zs3ccg.execute-api.ap-northeast-2.amazonaws.com/develop/smartro";
const returnUrl = BaseApiUrl + "/smartro-payment-result.php";

const { storePaymentMethod, storeFinalPrice } = storeToRefs(paymentStore);

//실행 버튼
const open = () => goPay();

defineExpose({
  open,
});

//스마트로 동작 관련
loadScript(
  `https://tpay.smartropay.co.kr/asset/js/SmartroPAY-1.0.min.js?version=20221214`
);

//사이즈 확인
const minSize = computed(() => {
  return useMediaQuery("(min-width: 768px)");
});

function goPay() {
  //사용될 폼
  var formName = "";
  if (minSize.value.value) formName = `tranMgrWeb`;
  else formName = `tranMgrMobile`;

  axios({
    method: "get",
    url: BaseApiUrl + "/smartro-set-parameter.php?Amt=" + storeFinalPrice.value,
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then((res: any) => {
      console.log(res.data.result.EncryptData);

      EncryptData.value = res.data.result.EncryptData;
      EdiDate.value = res.data.result.EdiDate;
      TaxAmt.value = res.data.result.TaxAmt;
      VatAmt.value = res.data.result.VatAmt;
      setTimeout(() => {
        // 스마트로페이 초기화
        //@ts-ignore
        smartropay.init({
          mode: "STG", // STG: 테스트, REAL: 운영
        });

        // 스마트로페이 결제요청
        // PC 연동시 아래와 같이 smartropay.payment 함수를 구현합니다.
        // @ts-ignore
        smartropay.payment({
          FormId: formName, // 폼ID
          Callback: function (res: any) {
            var bodyFormData = new FormData();
            bodyFormData.append("Tid", res.Tid);
            bodyFormData.append("TrAuthKey", res.TrAuthKey);

            axios({
              method: "post",
              url: BaseApiUrl + "/smartro-payment-result.php",
              data: bodyFormData,
              headers: { "Content-Type": "multipart/form-data" },
            })
              .then(function (response) {
                //handle success
                console.log(response);
                var result = response.data.result;
                // TODO 스마트로 쓸거면 처리하셈
                // paymentStore.setResult(
                //   result.Tid,
                //   result.Amt,
                //   result.PayMethod,
                //   result.AuthDate
                // );
                router.push("/payment/result");
              })
              .catch(function (response) {
                //handle error
                console.log(response);
                alert("결제에 실패했습니다. 메인으로 이동합니다.");
              });
          },
        });

        // Mobile 연동시 아래와 같이 smartropay.payment 함수를 구현합니다.
        //@ts-ignore
        smartropay.payment({
          FormId: formName, // 폼ID
        });
      }, 500);
    })
    .catch((err: any) => {
      console.log(err);

      alert("결제에 실패했습니다.");
    });
}
</script>

<style scoped></style>
