import http from "../paymentHTTPClient";
import type {
  contractPostDetailBody,
  contractPostDetailResult,
} from "@/domain/payment/contractPostDetailDto.interaface";
import type { TokenDto } from "@/domain/auth";
import { checkTokenStatus } from "@/api/common";

export async function getcontractPostDetail<T>(
  payload: contractPostDetailBody
): Promise<contractPostDetailResult> {
  // TODO 토큰 상태를 확인 하는 메서드, 나중에 정리 필요
  checkTokenStatus();
  var accessTokenData = localStorage.getItem("accessToken");

  if (accessTokenData != null) {
    var token = (JSON.parse(accessTokenData) as TokenDto).token;
    const url = "/posts/contract-posts-detail.php";
    try {
      const result: contractPostDetailResult = await http.get(url, {
        headers: {
          accesstoken: token,
        },
        params: {
          postIdx: payload.postIdx,
          ordNm: payload.ordNm,
        },
      });

      return result;
    } catch (err) {
      return Promise.reject(err);
    }
  } else return Promise.reject("error");
}
