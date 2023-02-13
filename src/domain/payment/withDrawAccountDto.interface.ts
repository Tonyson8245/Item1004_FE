import type meta from "../common/meta.interface"
/**
* @description 출금계좌 인증 시 1원 보내기 인증에 사용
* @author 이광호
* @sdoc withDrawAccountVerify.ts
* @since 2023-02-12 19:27:37
*/
export class sendWithdrawAccountVerifyWordRequestBody {
    bankName:string; //신한은행
    bankAccount:string;   //1103301412021
    // userName:string;   // 이광호
    constructor(
        bankName:string,
        bankAccount:string ,
        userName:string
    ){
        this.bankName = bankName;
        this.bankAccount = bankAccount;
        // this.userName = userName;
    }
}
/**
* @description 출금계좌 인증 시 1원 보내기 인증에 사용
* @author 이광호
* @sdoc withDrawAccountVerify.ts
* @since 2023-02-12 19:27:37
*/
export interface sendWithDrawAccountVerifyWordResponse {
    result: string
}

