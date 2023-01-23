import type * as Dto from "@/domain/payment/contractCheckDto.interface";
import http from "../paymentHTTPClient";

export async function getContractCheck<T>(
  payload: Dto.contractCheckBodyDto
): Promise<Dto.contractCheckResultDto> {
  const url = "/point/contract-check-routing.php";
  try {
    const result: Dto.contractCheckResultDto = await http.get(url, {
      params: {
        totalPrice: payload.totalPrice,
        payMethod: payload.payMethod,
        type: payload.type,
      },
    });
    return result;
  } catch (err) {
    return Promise.reject(err);
  }
}
