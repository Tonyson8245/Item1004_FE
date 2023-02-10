import http from "../paymentHTTPClient";
import type { sendAccountVerifyWordResponce } from "@/domain/payment/accountVerifyDto.interface";
import  { sendAccountVerifyWordRequestBody } from "@/domain/payment/accountVerifyDto.interface";

/**
* @description 1원 보내기 할때 사용하는 API
* @author 이광호
* @sdoc 
* @since 2023-02-10 13:43:36
*/
export async function sendAccountVerifyWord<T>(
    bankName:string, acctNo:string, custNm:string
): Promise<sendAccountVerifyWordResponce> {
  const requestBody = new sendAccountVerifyWordRequestBody(bankName, acctNo, custNm)
  const url = "/paytus/vbank/account-valid.php";
  try {   
    const result: sendAccountVerifyWordResponce = await http.post(url, requestBody, 
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return result;
  } catch (err) {
    return Promise.reject(err);
  }
}
