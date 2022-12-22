export class TokenDto {
  token: string;
  expireAt: number;

  constructor(token: string, expireAt: number) {
    this.token = token;
    this.expireAt = expireAt;
  }
}
