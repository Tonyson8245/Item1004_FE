import http from "../paymentHTTPClient";
import type {
  contractPostDetailBody,
  contractPostDetailResult,
} from "@/domain/payment/contractPostDetailDto.interaface";
import type { TokenDto } from "@/domain/auth";

export async function getContractPostList<T>(
  payload: contractPostDetailBody
): Promise<contractPostDetailResult> {
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
