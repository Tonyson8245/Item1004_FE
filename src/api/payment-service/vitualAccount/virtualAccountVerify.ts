
import http from "../paymentHTTPClient";
import type { accountVerifyResponce } from "@/domain/payment/virtualAccountVerifyDto.interface";
import  { accountVerifyRequestBody } from "@/domain/payment/virtualAccountVerifyDto.interface";

/**
* @description 입금전용 가상계좌발급 1원 보낸 계좌 인증 API
* @author 이광호
* @sdoc VirtualAccount.vue
* @since 2023-02-10 15:05:29
*/
export async function virtualAccountVerify<T>(
    verifyTrDt:string, verifyTrNo:string, verifyVal:string
): Promise<accountVerifyResponce> {
  const requestBody = new accountVerifyRequestBody(verifyTrDt, verifyTrNo, verifyVal)  
  console.log("계좌인증 바디 : ", requestBody);
  
  const url = "/paytus/vbank/check-account-valid.php";
  try {   
    const result: accountVerifyResponce = await http.post(url, requestBody, 
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    console.log("result : ",result);
    return result;
  } catch (err) {
    console.log("err : ",err);
    return Promise.reject(err);
  }
}

