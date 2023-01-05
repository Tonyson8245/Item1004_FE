import type { TokenDto } from "./TokenDto";

export class TokenSetResponseDto {
  accessToken: TokenDto;
  refreshToken: TokenDto;

  constructor(accessToken: TokenDto, refreshToken: TokenDto) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }
}
