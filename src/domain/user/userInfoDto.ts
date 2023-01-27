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
  constructor(payload: userInfoResult) {
    this.idx = payload.idx;
    this.code = payload.code;
    this.name = payload.name;
    this.nickname = payload.nickname;
    this.phone = payload.phone;
    this.email = payload.email;
    this.birth = payload.birth;
    this.gender = payload.gender;
    this.image = payload.image;
    this.bankName = payload.bankName;
    this.bankAccount = payload.bankAccount;
    this.contractLevelName = payload.contractLevelName;
    this.isVerified = payload.isVerified;
    this.isEmailValid = payload.isEmailValid;
    this.isPhoneValid = payload.isPhoneValid;
    this.isAccountValid = payload.isAccountValid;
  }

  public isAdult(): boolean {
    {
      const birthdate = new Date(
        this.birth.toString().replace(/^(\d{4})(\d{2})(\d{2})$/, `$1-$2-$3`)
      );
      const today = new Date();
      const yearDiff = today.getFullYear() - birthdate.getFullYear();
      const monthDiff = today.getMonth() - birthdate.getMonth();
      const dateDiff = today.getDate() - birthdate.getDate();

      const isBeforeBirthDay =
        monthDiff < 0 || (monthDiff === 0 && dateDiff < 0);

      const age = yearDiff + (isBeforeBirthDay ? -1 : 0);

      if (age < 19) return false;
      return true;
    }
  }
}
export class userInfowithScopeReponse {
  meta: meta;
  result: userInfoResult;
}
