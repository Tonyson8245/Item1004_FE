import {
  contractCheckBodyDto,
  contractCheckResultDto,
} from "@/domain/payment/contractCheckDto.interface";
import * as cardDto from "@/domain/payment/card-PointandContractDto.interface";
import * as routing from "./modules/paymentRounting";
import * as paytus from "./modules/paytusModule";
import { UUID } from "uuid-generator-ts";
import { pointonlyContract } from "./modules/pointonlycontract";

//payment(type: string, payMethod: string, buyerIdx: number, fee: number, productPrice: number, totalPrice: number, point?: number, sellerIdx?: number, postIdx?: number)

// payment("chargePoint", "card", 1, 10, 100, 110); // 충전 (신용카드)
// payment("contract", "card", 1, 10, 100, 110, 10, 1, 2); // 마일리지 + 결제 사용  (신용카드)
// payment("onlyPoint", "card", 1, 10, 100, 110, 110, 1, 2); // 마일리지만 사용

async function payment(
  router: any,
  type: string,
  payMethod: string,
  buyerIdx: number,
  fee: number,
  productPrice: number,
  totalPrice: number,
  point?: number,
  sellerIdx?: number,
  postIdx?: number
) {
  //포인트로만 결제가 아닌경우
  if (type != "onlyPoint") {
    var routingPayload = new contractCheckBodyDto(totalPrice, payMethod, type);

    var response = null;

    await routing
      .checkRouting(routingPayload)
      .then((res) => {
        response = res;
      })
      .catch((err) => {
        console.log(`Payment routing Error`);
        console.log(err);
      });

    //결과값이 정상적으로 돌아왔을 경우
    if (response != null) {
      var result = response as contractCheckResultDto;

      //페이투스로 결제 진행
      if (result.tag == "paytus" && result.formControlUrl != null) {
        var formUrl = result.formControlUrl;

        var payload = new cardDto.payload(
          buyerIdx,
          fee,
          productPrice,
          totalPrice,
          postIdx
        );

        // 거래에만 사용됨
        if (type == "contract") {
          payload.point = point;
          payload.sellerIdx = sellerIdx;
        }

        var uuid = new UUID().toString();

        await paytus.setFormControl(formUrl, payload, uuid).catch((err) => {
          console.log(`Paytus set parameter Error`);
          console.log(err);
          throw new Error("에러 ");
        });

        paytus.goPayment(result.url, totalPrice.toString(), uuid);
      }
    }
  }
  // 포인트로만 결제 할 경우 (페이투스 모듈을 사용할 필요가 없음)
  else {
    if (sellerIdx != undefined && point != undefined && postIdx != undefined) {
      pointonlyContract(
        sellerIdx,
        buyerIdx,
        point,
        productPrice,
        postIdx,
        totalPrice
      )
        .then((res) => {
          //결제 완료 페이지로 보내기
          // TODO 결제 완료 페이지 보내기 구현 필요
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
}

export { payment };