import type meta from "../common/meta.interface";

export class userInfoResult {
  idx: number;
  code: string;
  name: string;
  nickname: string;
  phone: string;
  email: string;
  birth: number;
  gender: string;
  image: string;
  bankName: string;
  bankAccount: string;
  contractLevelName: string;
  isVerified: boolean;
  isEmailValid: boolean;
  isPhoneValid: boolean;
  isAccountValid: boolean;
}
export class userInfowithScopeReponse {
  meta: meta;
  result: userInfoResult;
}
