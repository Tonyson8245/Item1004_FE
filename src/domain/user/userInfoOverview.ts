import type meta from "../common/meta.interface";

export class userInfoOverviewResult {
  name: string;
  code: string;
  nickname: string;
  image: string;
  phone: string;
  email: string;
  bankName: string;
  bankAccount: string;
  id: string;
  naver: boolean;
  kakao: boolean;
  google: boolean;
  apple: boolean;
  constructor(
    name: string,
    code: string,
    nickname: string,
    image: string,
    phone: string,
    email: string,
    bankName: string,
    bankAccount: string,
    id: string,
    naver: boolean,
    kakao: boolean,
    google: boolean,
    apple: boolean
  ) {
    this.name = name;
    this.code = code;
    this.nickname = nickname;
    this.image = image;
    this.phone = phone;
    this.email = email;
    this.bankName = bankName;
    this.bankAccount = bankAccount;
    this.id = id;
    this.naver = naver;
    this.kakao = kakao;
    this.google = google;
    this.apple = apple;
  }
}
class userInfoOverviewResponse {
  meta: meta;
  result: userInfoOverviewResult;
}
