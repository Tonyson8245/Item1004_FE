import http from "../paymentHTTPClient";
import type { TokenDto } from "@/domain/auth";
import type meta from "@/domain/common/meta.interface";

export async function putContractTake<T>(
  ordNm: string,
  otherUserIdx: number
): Promise<meta> {
  var accessTokenData = localStorage.getItem("accessToken");

  if (accessTokenData != null) {
    var token = (JSON.parse(accessTokenData) as TokenDto).token;
    const url =
      "/posts/contract-take.php?ordNm=" +
      ordNm +
      "&otherUserIdx=" +
      otherUserIdx;
    try {
      const result: meta = await http.put(
        url,
        {},
        {
          headers: {
            accesstoken: token,
          },
        }
      );
      return result;
    } catch (err) {
      return Promise.reject(err);
    }
  } else return Promise.reject("error");
}
