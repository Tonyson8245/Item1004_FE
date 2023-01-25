import type {
  contractCompleteBody,
  contractCompleteResult,
} from "@/domain/payment/contractCompleteDto";
import { checkTokenStatus } from "@/api/common";
import http from "../paymentHTTPClient";
import type { TokenDto } from "@/domain/auth";

export async function getcontractResult<T>(
  payload: contractCompleteBody
): Promise<contractCompleteResult> {
  const url = "/complete/contract-complete.php";
  var token = "";

  // TODO 토큰 상태를 확인 하는 메서드, 나중에 정리 필요
  checkTokenStatus();

  var accessTokenData = localStorage.getItem("accessToken");
  if (accessTokenData != null) {
    token = (JSON.parse(accessTokenData) as TokenDto).token;
  } else {
    return Promise.reject("token error");
  }

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
