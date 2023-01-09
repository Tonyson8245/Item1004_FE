import { usepaymentStore } from "@/store/modules/payment/paymentStore";
import * as contractcheckDto from "@/domain/payment/contractCheckDto.interface";
import { onMounted, ref } from "vue";
import axios from "axios";
import { UUID } from "uuid-generator-ts";

const uuid = ref(new UUID());
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

//form 데이터 생성
function createform() {
  var form = document.createElement("form");
  form.setAttribute("method", "post");
  form.setAttribute("name", "payInit1");
  form.setAttribute("action", actionUrl.value);

  document.body.appendChild(form);
  //input
  //결제 수단
  var inputPaymethod = document.createElement("input");
  inputPaymethod.setAttribute("type", "text");
  inputPaymethod.setAttribute("name", "payMethod");
  inputPaymethod.setAttribute("value", "card");
  form.appendChild(inputPaymethod);
  //결제 방법 선택
  var inputMid = document.createElement("input");
  inputMid.setAttribute("type", "text");
  inputMid.setAttribute("name", "mid");
  inputMid.setAttribute("value", merchantId.value);
  form.appendChild(inputMid);
}

var getContractCheckResponse = new contractcheckDto.contractCheckResultDto();

//0. 어떤 PG 사로 결제를 진행할지 등 결제 사전 정보를 가져온다.
function startPayment(paymentMethod: string) {
  const paymentStore = usepaymentStore();

  uuid.value = new UUID();
  console.log(uuid.value);

  var payload = new contractcheckDto.contractCheckBodyDto(
    storeprice,
    paymentMethod
  );
  paymentStore
    .getContractCheck(payload) // 결제 내용 확인
    .then((res) => {
      //페이투스로 진행하는 경우
      if (res != undefined) {
        getContractCheckResponse = res;
        //formControl이 필요한 경우
        if (getContractCheckResponse.formControlUrl != undefined) {
          if (getContractCheckResponse.tag == `paytus`) {
            setFormControl(getContractCheckResponse.formControlUrl);
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
function setFormControl(url: string) {
  var result;
  var requestUrl = import.meta.env.VITE_BASE_URL_PAYMENT_TEST + url;
  axios
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
      goPayment(getContractCheckResponse.url);
    })
    .catch((err) => {
      console.log(`error`);
    });
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
  //@ts-ignore
  SendPay(document.payInit);
}

export { createform };
