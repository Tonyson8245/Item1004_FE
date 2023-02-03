import http from "../paymentHTTPClient";
import type { TokenDto } from "@/domain/auth";
import type meta from "@/domain/common/meta.interface";
import { checkTokenStatus } from "@/api/common";

export async function deleteContractCancel<T>(ordNm: string): Promise<meta> {

  // TODO 토큰 상태를 확인 하는 메서드, 나중에 정리 필요
  checkTokenStatus();

  var accessTokenData = localStorage.getItem("accessToken");

  if (accessTokenData != null) {
    var token = (JSON.parse(accessTokenData) as TokenDto).token;
    const url = `/posts/contract-cancel.php?ordNm=${ordNm}`;

    try {
      const result: meta = await http.delete(url, {
        headers: {
          accesstoken: token,
        },
      });      
      return result;
    } catch (err) {
      
      return Promise.reject(err);
    }
  } else return Promise.reject("error");
}
