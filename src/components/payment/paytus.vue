<template>
  <div style="text-align: center">
    <div
      id="sampleInput"
      class="paypop_con"
      style="
        padding: 20px 15px 35px 15px;
        display: inline-block;
        float: inherit;
      "
    >
      <p class="square_tit mt0" style="text-align: left">
        <strong>결제정보</strong>
      </p>

      <a
        href="#;"
        id="payBtn"
        class="btn_sty01 bg01"
        style="margin: 15px"
        @click="doPaySubmit()"
        >결제하기</a
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { usepaymentStore } from "@/store/modules/payment/paymentStore";
import * as contractcheckDto from "@/domain/payment/contractCheckDto.interface";
import { onMounted, ref } from "vue";
import axios from "axios";
import * as paytus from "./paytusModuletest";
import { UUID } from "uuid-generator-ts";
const uuid = ref(new UUID());
const paymentStore = usepaymentStore();

///결제 정보
const storeordNm = uuid.value.getDashFreeUUID();
const storesellerIdx = 1;
const storebuyerIdx = 2;
const storefee = 10;
const storepoint = 10;
const storeproductPrice = 110;
const storepostIdx = 1;
const storeprice = storeproductPrice + storefee;
const actionUrl = ref("");
const ediDate = ref("");
const encData = ref("");
const merchantId = ref("");

onMounted(() => {
  //하기값은 실제 결제되는 금액임 (수수료를 제외한 결제금액, 방식, 수수료)
  // startPayment(`card`);
});

//0. 어떤 PG 사로 결제를 진행할지 등 결제 사전 정보를 가져온다.
function startPayment(paymentMethod: string) {
  uuid.value = new UUID();
  console.log(uuid.value);

  var payload = new contractcheckDto.contractCheckBodyDto(
    storeprice,
    paymentMethod,
    "card"
  );
  paymentStore
    .getContractCheck(payload) // 결제 내용 확인
    .then((res) => {
      //페이투스로 진행하는 경우
      if (res != undefined) {
        //formControl이 필요한 경우
        if (res.formControlUrl != undefined) {
          if (res.tag == `paytus`) {
            setFormControl(res.formControlUrl)
              .then(() => {
                goPayment(res.url);
              })
              .catch(() => {
                console.log();
              });
          }
        }
        //formControl이 필요없는 경우
        else {
          if (res.tag == "smartro") {
            console.log("스마트로 결제");
          }
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

//페이투스 로직
//1. 암호와 데이터 받기 전 결제 정보를 서버에 저장한다.
async function setFormControl(url: string) {
  var result;
  var requestUrl = import.meta.env.VITE_BASE_URL_PAYMENT_TEST + url;
  await axios
    .post(
      requestUrl,
      {
        ordNm: storeordNm,
        sellerIdx: storesellerIdx,
        buyerIdx: storebuyerIdx,
        fee: storefee,
        point: storepoint,
        productPrice: storeproductPrice,
        totalPrice: storeproductPrice + storefee,
        postIdx: storepostIdx,
      },
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    )
    .then((res) => {
      result = true;
    })
    .catch((err) => {
      result = false;
    });
  return result;
}

//2.실제 결제가 이뤄지는 함수
//2-1 페이투스로 결제 될 경우, encrypt데이터르 가져와서 폼을 통해 모듈을 실행 시킨다.(개발 중)
//2-2 스마트로로 결제 될 경우, 여기서 폼을 통해 모듈에 값을 넣어서 실행 시킨다. (개발 예정)
//2-3 "마일리지로만" 결제 할 경우, 여기서 결제완료까지 진행시키다.(개발 예정)
//참고, 마일리지 + 결제일 경우 2-1 또는 2-2 방법으로 진행하되, 마일리지 사용정보를 서버로 보낸다.
async function goPayment(url: string) {
  var payPrice = storeproductPrice - storepoint + storefee;
  var requestUrl =
    import.meta.env.VITE_BASE_URL_PAYMENT_TEST + url + "?goodsAmt=" + payPrice;
  await axios
    .get(requestUrl, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => {
      actionUrl.value = res.data.result.actionUrl;
      merchantId.value = res.data.result.merchantId;
      ediDate.value = res.data.result.ediDate;
      encData.value = res.data.result.encData;
      //결제창 실행
    })
    .catch((err) => {
      console.log(err);
    });

  doPaySubmit();
}
//페이투스 제공 함수
function doPaySubmit() {
  // 결제창 호출 함수
  // @ts-ignore
  // SendPay(document.payInit);

  paytus.startPayment("card");
}
</script>

<style scoped></style>

<!DOCTYPE html>
