import type {
  chargeCompleteBody,
  chargeCompleteResult,
} from "@/domain/payment/chargeCompleteDto";
import type {} from "@/domain/payment/contractCompleteDto";
import http from "../paymentHTTPClient";

export async function getchargeResult<T>(
  payload: chargeCompleteBody
): Promise<chargeCompleteResult> {
  const url = "/complete/point-charge-complete.php";
  try {
    const result: chargeCompleteResult = await http.get(url, {
      params: {
        tid: payload.tid,
        payMethod: payload.payMethod,
        userIdx: payload.userIdx,
      },
    });
    return result;
  } catch (err) {
    return Promise.reject(err);
  }
}
