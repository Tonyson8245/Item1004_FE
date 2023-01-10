import * as contractCheckDto from "@/domain/payment/contractCheckDto.interface";
import { usepaymentStore } from "@/store/modules/payment/paymentStore";

//어떤 결제사(PG)으로 어떻게(충전,결제) 작동될지 결정한는 모듈
async function checkRouting<contractCheckResponseDto>(
  body: contractCheckDto.contractCheckBodyDto
) {
  //store 가져오기
  const paymentStore = usepaymentStore();
  //request DTo
  var payload = new contractCheckDto.contractCheckBodyDto(
    body.totalPrice,
    body.payMethod,
    body.type
  );
  //result 선언
  var result;

  await paymentStore
    .getContractCheck(payload) // 결제 내용 확인
    .then((res) => {
      result = res;
    })
    .catch((err) => {
      console.error("contract routing ERROR");
    });
  return result;
}

export { checkRouting };
