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

  isAdult() {
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

      // if (age < 19) return false;
      return false;
    }
  }
}
export class userInfowithScopeReponse {
  meta: meta;
  result: userInfoResult;
}
