
import http from "../paymentHTTPClient";
import type { accountVerifyResponce } from "@/domain/payment/accountVerifyDto.interface";
import  { accountVerifyRequestBody } from "@/domain/payment/accountVerifyDto.interface";

/**
* @description 1원 보낸 계좌 인증 API
* @author 이광호
* @sdoc VirtualAccount.vue
* @since 2023-02-10 15:05:29
*/
export async function accountVerify<T>(
    verifyTrDt:string, verifyTrNo:string, verifyVal:string
): Promise<accountVerifyResponce> {
  const requestBody = new accountVerifyRequestBody(verifyTrDt, verifyTrNo, verifyVal)
  const url = "/paytus/vbank/check-account-valid.php";
  try {   
    const result: accountVerifyResponce = await http.post(url, requestBody, 
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return result;
  } catch (err) {
    return Promise.reject(err);
  }
}