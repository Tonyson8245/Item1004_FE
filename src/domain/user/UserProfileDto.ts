// 유저 프로필 dot

export class UserProfileDto {
  idx: number;
  nickname: string;
  image: string;

  constructor(idx: number, nickname: string, img: string) {
    this.idx = idx;
    this.nickname = nickname;
    this.image = img;
  }
}
