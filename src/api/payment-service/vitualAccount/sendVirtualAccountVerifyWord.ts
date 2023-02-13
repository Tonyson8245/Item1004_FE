import http from "../paymentHTTPClient";
import type { sendAccountVerifyWordResponce } from "@/domain/payment/virtualAccountVerifyDto.interface";
import  { sendAccountVerifyWordRequestBody } from "@/domain/payment/virtualAccountVerifyDto.interface";

/**
* @description  입금전용 가상계좌발급  1원 보내기 할때 사용하는 API
* @author 이광호
* @sdoc 
* @since 2023-02-10 13:43:36
*/
export async function sendVirtualAccountVerifyWord<T>(
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
