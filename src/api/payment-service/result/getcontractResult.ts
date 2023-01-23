import type {
  contractCompleteBody,
  contractCompleteResult,
} from "@/domain/payment/contractCompleteDto";
import http from "../paymentHTTPClient";

export async function getcontractResult<T>(
  payload: contractCompleteBody
): Promise<contractCompleteResult> {
  const url = "/complete/contract-complete.php";
  try {
    const result: contractCompleteResult = await http.get(url, {
      params: {
        tid: payload.tid,
        payMethod: payload.payMethod,
        postIdx: payload.postIdx,
        userIdx: payload.userIdx,
      },
    });
    return result;
  } catch (err) {
    return Promise.reject(err);
  }
}
