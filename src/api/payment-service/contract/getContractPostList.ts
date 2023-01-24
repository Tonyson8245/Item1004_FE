import http from "../paymentHTTPClient";

import type { TokenDto } from "@/domain/auth";
import type {
  contracPostListResult,
  contractPostListBody,
} from "@/domain/payment/contracPostListDto.interface";

export async function getContractPostList<T>(
  payload: contractPostListBody
): Promise<contracPostListResult> {
  var accessTokenData = localStorage.getItem("accessToken");

  if (accessTokenData != null) {
    var token = (JSON.parse(accessTokenData) as TokenDto).token;
    const url = "/posts/contract-posts-list.php";
    try {
      const result: contracPostListResult = await http.get(url, {
        headers: {
          accesstoken: token,
        },
        params: {
          page: payload.page,
          pageUnit: payload.pageUnit,
          contractStage: payload.contractStage,
          postType: payload.postType,
        },
      });

      return result;
    } catch (err) {
      return Promise.reject(err);
    }
  } else return Promise.reject("error");
}
