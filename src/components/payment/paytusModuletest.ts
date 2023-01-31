import { usepaymentStore } from "@/store/modules/payment/paymentStore";
import * as contractcheckDto from "@/domain/payment/contractCheckDto.interface";
import axios from "axios";
import { UUID } from "uuid-generator-ts";
import { loadScript } from "vue-plugin-load-script";
loadScript("https://api2.dangunpay.co.kr/js/pgAsistant.js");

var uuid = new UUID();
///결제 정보
var storeordNm = uuid.getDashFreeUUID();
var storesellerIdx = 1;
var storebuyerIdx = 2;
var storefee = 10;
var storepoint = 10;
var storeproductPrice = 110;
var storepostIdx = 1;
var storeprice = storeproductPrice + storefee;
var actionUrl = "";
var ediDate = "";
var encData = "";
var merchantId = "";

//form 데이터 생성
function createform() {
  var fomrmisExist = document.getElementsByName("payInitTest");
  console.log(fomrmisExist.length);

  if (fomrmisExist.length === 0) {
    var app = document.getElementById("sampleInput");
    var form = document.createElement("form");
    console.log(form);

    form.setAttribute("method", "post");
    form.setAttribute("name", "payInitTest");

    if (app != null) app.appendChild(form);

    var inputPaymethod = document.createElement("input"); //결제 수단
    var inputMid = document.createElement("input"); //결제 방법 선택
    var inputGoodsNm = document.createElement("input"); //상품명
    var inputOrdNo = document.createElement("input"); //상품주문번호명
    var inputGoodsAmt = document.createElement("input"); //결제금액
    var inputOrdNm = document.createElement("input"); //구매자명
    var inputOrdTel = document.createElement("input"); //구매자연락처
    var inputOrdEmail = document.createElement("input"); //구매자이메일
    var inputReturnUrl = document.createElement("input"); //returnUrl
    var inputNotiUrl = document.createElement("input"); //notiUrl
    var inputEdiDate = document.createElement("input"); //ediDate
    var inputEncDate = document.createElement("input"); //encData
    var inputUserIp = document.createElement("input"); //userIp
    var inputTrxCd = document.createElement("input"); //trxCd
    var inputMbsUsrId = document.createElement("input"); //mbsUsrId
    var inputMbsReserved = document.createElement("input"); //mbsReserved
    var inputCharSet = document.createElement("input"); //charSet
    var inputAppMode = document.createElement("input"); //appMod

    //set type and name
    inputPaymethod.setAttribute("type", "text");
    inputPaymethod.setAttribute("name", "payMethod");
    inputMid.setAttribute("type", "text");
    inputMid.setAttribute("name", "mid");
    inputGoodsNm.setAttribute("type", "text");
    inputGoodsNm.setAttribute("name", "goodsNm");
    inputOrdNo.setAttribute("type", "text");
    inputOrdNo.setAttribute("name", "ordNo");
    inputGoodsAmt.setAttribute("type", "text");
    inputGoodsAmt.setAttribute("name", "goodsAmt");
    inputOrdNm.setAttribute("type", "text");
    inputOrdNm.setAttribute("name", "ordNm");
    inputOrdTel.setAttribute("type", "text");
    inputOrdTel.setAttribute("name", "ordTel");
    inputOrdEmail.setAttribute("type", "text");
    inputOrdEmail.setAttribute("name", "ordEmail");
    inputReturnUrl.setAttribute("type", "text");
    inputReturnUrl.setAttribute("name", "returnUrl");
    inputNotiUrl.setAttribute("type", "text");
    inputNotiUrl.setAttribute("name", "notiUrl");
    inputEdiDate.setAttribute("type", "text");
    inputEdiDate.setAttribute("name", "ediDate");
    inputEncDate.setAttribute("type", "text");
    inputEncDate.setAttribute("name", "encData");
    inputUserIp.setAttribute("type", "hidden");
    inputUserIp.setAttribute("name", "userIp");
    inputTrxCd.setAttribute("type", "hidden");
    inputTrxCd.setAttribute("name", "trxCd");
    inputMbsUsrId.setAttribute("type", "hidden");
    inputMbsUsrId.setAttribute("name", "mbsUsrId");
    inputMbsReserved.setAttribute("type", "hidden");
    inputMbsReserved.setAttribute("name", "mbsReserved");
    inputCharSet.setAttribute("type", "hidden");
    inputCharSet.setAttribute("name", "charSet");
    inputAppMode.setAttribute("type", "hidden");
    inputAppMode.setAttribute("name", "appMode");
    //append
    form.appendChild(inputPaymethod);
    form.appendChild(inputMid);
    form.appendChild(inputGoodsNm);
    form.appendChild(inputOrdNo);
    form.appendChild(inputGoodsAmt);
    form.appendChild(inputOrdNm);
    form.appendChild(inputOrdTel);
    form.appendChild(inputOrdEmail);
    form.appendChild(inputReturnUrl);
    form.appendChild(inputNotiUrl);
    form.appendChild(inputEdiDate);
    form.appendChild(inputEncDate);
    form.appendChild(inputUserIp);
    form.appendChild(inputTrxCd);
    form.appendChild(inputMbsUsrId);
    form.appendChild(inputMbsReserved);
    form.appendChild(inputCharSet);
    form.appendChild(inputAppMode);
  } else console.log("이미있음");
}
//input 내용 넣기
function setform() {
  var form = (<any>(
    document.getElementsByName("payInitTest").item(0)
  )) as HTMLFormElement;
  console.log("123" + form);

  form.setAttribute("action", actionUrl);

  var inputPaymethod = <any>document.getElementsByName("payMethod").item(0); //결제 수단
  var inputMid = <any>document.getElementsByName("mid").item(0); //결제 방법 선택
  var inputGoodsNm = <any>document.getElementsByName("goodsNm").item(0); //상품명
  var inputOrdNo = <any>document.getElementsByName("ordNo").item(0); //상품주문번호명
  var inputGoodsAmt = <any>document.getElementsByName("goodsAmt").item(0); //결제금액
  var inputOrdNm = <any>document.getElementsByName("ordNm").item(0); //구매자명
  var inputOrdTel = <any>document.getElementsByName("ordTel").item(0); //구매자연락처
  var inputOrdEmail = <any>document.getElementsByName("ordEmail").item(0); //구매자이메일
  var inputReturnUrl = <any>document.getElementsByName("returnUrl").item(0); //returnUrl
  var inputNotiUrl = <any>document.getElementsByName("notiUrl").item(0); //notiUrl
  var inputEdiDate = <any>document.getElementsByName("ediDate").item(0); //ediDate
  var inputEncDate = <any>document.getElementsByName("encData").item(0); //encData
  var inputUserIp = <any>document.getElementsByName("userIp").item(0); //userIp
  var inputTrxCd = <any>document.getElementsByName("trxCd").item(0); //trxCd
  var inputMbsUsrId = <any>document.getElementsByName("mbsUsrId").item(0); //mbsUsrId
  var inputMbsReserved = <any>document.getElementsByName("mbsReserved").item(0); //mbsReserved
  var inputCharSet = <any>document.getElementsByName("charSet").item(0); //charSet
  var inputAppMode = <any>document.getElementsByName("appMode").item(0); //appMod

  //set

  inputPaymethod.setAttribute("value", "card");

  inputMid.setAttribute("value", merchantId);

  inputGoodsNm.setAttribute("value", "PGTEST");

  inputOrdNo.setAttribute("value", "123123");

  inputGoodsAmt.setAttribute(
    "value",
    (storeproductPrice + storefee - storepoint).toString()
  );

  inputOrdNm.setAttribute("value", "PGTEST");

  inputOrdTel.setAttribute("value", "01000000000");

  inputOrdEmail.setAttribute("value", "123123@sd.vom");

  inputReturnUrl.setAttribute("value", actionUrl);

  inputNotiUrl.setAttribute("value", "");

  inputEdiDate.setAttribute("value", ediDate);

  inputEncDate.setAttribute("value", encData);

  inputUserIp.setAttribute("value", "127.0.0.1");

  inputTrxCd.setAttribute("value", "0");

  inputMbsUsrId.setAttribute("value", "user1234");

  inputMbsReserved.setAttribute("value", "MallReserved");

  inputCharSet.setAttribute("value", "UTF-8");

  inputAppMode.setAttribute("value", "1");
}

var getContractCheckResponse = new contractcheckDto.contractCheckResultDto();

//0. 어떤 PG 사로 결제를 진행할지 등 결제 사전 정보를 가져온다.
function startPayment(paymentMethod: string) {
  const paymentStore = usepaymentStore();

  uuid = new UUID();

  createform();

  var payload = new contractcheckDto.contractCheckBodyDto(
    storeprice,
    paymentMethod,
    "point"
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
  var requestUrl = import.meta.env.VITE_BASE_URL_PAYMENT_BASE + url;
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
    import.meta.env.VITE_BASE_URL_PAYMENT_BASE + url + "?goodsAmt=" + payPrice;
  await axios
    .get(requestUrl, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => {
      console.log(res.data.result.merchantId);
      actionUrl = res.data.result.actionUrl;
      merchantId = res.data.result.merchantId;
      ediDate = res.data.result.ediDate;
      encData = res.data.result.encData;

      setform();

      //@ts-ignore
      SendPay(document.payInitTest);

      //결제창 실행
    })
    .catch((err) => {
      console.log(err);
    });
}

//페이투스 제공 함수
function doPaySubmit() {
  // 결제창 호출 함수

  //@ts-ignore
  SendPay(document.payInit);
}

export { createform, startPayment, doPaySubmit };
