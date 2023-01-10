import axios from "axios";
import type * as cardDto from "@/domain/payment/card-PointandContractDto.interface";
import { UUID } from "uuid-generator-ts";
//ip 얻기
async function getIp() {
  var result;
  await fetch("https://api.ipify.org?format=json")
    .then((response) => response.json())
    .then((response) => {
      result = response;
    });
  return result;
}

//form 데이터 생성하기(이미 값이 있는 경우는 만들지 않는다.)
function createform() {
  var fomrmisExist = document.getElementsByName("payInitTest");
  console.log(fomrmisExist.length);

  if (fomrmisExist.length === 0) {
    var app = document.getElementById("app");
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
    inputUserIp.setAttribute("name", "userIp");
    inputTrxCd.setAttribute("name", "trxCd");
    inputMbsUsrId.setAttribute("name", "mbsUsrId");
    inputMbsReserved.setAttribute("name", "mbsReserved");
    inputCharSet.setAttribute("name", "charSet");
    inputAppMode.setAttribute("name", "appMode");

    //숨기기
    inputPaymethod.setAttribute("type", "hidden");
    inputMid.setAttribute("type", "hidden");
    inputGoodsNm.setAttribute("type", "hidden");
    inputOrdNo.setAttribute("type", "hidden");
    inputGoodsAmt.setAttribute("type", "hidden");
    inputOrdNm.setAttribute("type", "hidden");
    inputOrdTel.setAttribute("type", "hidden");
    inputOrdEmail.setAttribute("type", "hidden");
    inputReturnUrl.setAttribute("type", "hidden");
    inputNotiUrl.setAttribute("type", "hidden");
    inputEdiDate.setAttribute("type", "hidden");
    inputEncDate.setAttribute("type", "hidden");
    inputUserIp.setAttribute("type", "hidden");
    inputTrxCd.setAttribute("type", "hidden");
    inputMbsUsrId.setAttribute("type", "hidden");
    inputMbsReserved.setAttribute("type", "hidden");
    inputCharSet.setAttribute("type", "hidden");
    inputAppMode.setAttribute("type", "hidden");

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
async function setform(
  ordNm: string,
  actionUrl: string,
  merchantId: string,
  payPrice: string,
  ediDate: string,
  encData: string
) {
  var form = (<any>(
    document.getElementsByName("payInitTest").item(0)
  )) as HTMLFormElement;

  form.setAttribute("action", actionUrl);

  var ip = "";

  //아이피 가져오기
  await getIp().then((res) => {
    //@ts-ignore
    if (res != undefined) ip = res.ip;
  });

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

  console.log(ordNm);

  inputPaymethod.setAttribute("value", "card");
  inputMid.setAttribute("value", merchantId);
  inputGoodsNm.setAttribute("value", "PGTEST");
  inputOrdNo.setAttribute("value", ordNm);
  inputGoodsAmt.setAttribute("value", payPrice);
  inputOrdNm.setAttribute("value", "PGTEST");
  inputOrdTel.setAttribute("value", "01000000000");
  inputOrdEmail.setAttribute("value", "123123@sd.vom");
  inputReturnUrl.setAttribute(
    "value",
    "https://www.item1004.co.kr/mypage/mileage/charge/result"
  );
  inputNotiUrl.setAttribute("value", "");
  inputEdiDate.setAttribute("value", ediDate);
  inputEncDate.setAttribute("value", encData);
  inputUserIp.setAttribute("value", ip);
  inputTrxCd.setAttribute("value", "0");
  inputMbsUsrId.setAttribute("value", "user1234");
  inputMbsReserved.setAttribute("value", "MallReserved");
  inputCharSet.setAttribute("value", "UTF-8");
  inputAppMode.setAttribute("value", "1");
}

//1.paytus는 진행하기 전에 값을 먼저 넣어줘야 한다.
async function setFormControl(
  FormControlurl: string,
  payload: cardDto.payload,
  uuid: string
) {
  var requestUrl = import.meta.env.VITE_BASE_URL_PAYMENT_TEST + FormControlurl;

  await axios
    .post(
      requestUrl,
      {
        ordNm: uuid,
        sellerIdx: payload.sellerIdx,
        buyerIdx: payload.buyerIdx,
        fee: payload.fee,
        point: payload.point,
        productPrice: payload.productPrice,
        totalPrice: payload.totalPrice,
        postIdx: payload.postIdx,
      },
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    )
    .then((res) => {
      if (!res.data.meta.isSuccess) throw new Error("setForm Error");
    })
    .catch((err) => {
      console.log("setForm Network Error");
    });
}

//2.실제 결제가 이뤄지는 함수
//서버에서 가져온 여러 데이터를 가지고 실제 결제를 진행한다. 결제를 진행하기 전에 "createform"으로 폼을 만들고 "setform" 을 통해 값을 설정해야 한다.
async function goPayment(url: string, payPrice: string, ordNm: string) {
  createform(); // 폼 생성

  //서버에서 받아야 와야할 값
  var actionUrl = "";
  var merchantId = "";
  var ediDate = "";
  var encData = "";

  //라우팅할때 제공받은 경로
  var requestUrl =
    import.meta.env.VITE_BASE_URL_PAYMENT_TEST + url + "?goodsAmt=" + payPrice;

  // paytus-set-parameter-****.php
  await axios
    .get(requestUrl, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => {
      actionUrl = res.data.result.actionUrl;
      merchantId = res.data.result.merchantId;
      ediDate = res.data.result.ediDate;
      encData = res.data.result.encData;
    })
    .catch((err) => {
      console.log(err);
    });

  await setform(ordNm, actionUrl, merchantId, payPrice, ediDate, encData); // 값 설정
  doPaySubmit(); // 결제 실행
}

function doPaySubmit() {
  // 결제창 호출 함수
  //   @ts-ignore
  SendPay(document.payInitTest);
}

export { setFormControl, goPayment };
