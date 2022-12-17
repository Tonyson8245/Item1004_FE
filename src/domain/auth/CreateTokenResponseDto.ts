import type { UserProfileDto } from "@/domain/user/UserProfileDto";
import type { TokenDto } from "./TokenDto";
import { TokenSetResponseDto } from "./TokenSetResponseDto";

export class CreateTokenResponseDto extends TokenSetResponseDto {
  user: UserProfileDto;

  constructor(
    userProfile: UserProfileDto,
    accessToken: TokenDto,
    refreshToken: TokenDto
  ) {
    super(accessToken, refreshToken);
    this.user = userProfile;
  }
}

// export default class CreateTokenResponseDto {
//   meta: meta;
//   result?: CreateToken;

//   constructor(meta: meta, result: CreateToken) {
//     this.meta = meta;
//     this.result = result;
//   }
// }
