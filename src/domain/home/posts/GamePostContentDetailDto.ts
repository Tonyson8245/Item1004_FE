import { GamePostContentSummaryDto } from "./GamePostContentSummaryDto";
import {
  IsBoolean,
  IsEnum,
  IsIP,
  IsOptional,
  IsString,
  Length,
} from "class-validator";
import { EnumGameRegistrationDto } from "../enum/EnumGameRegistrationDto";

export class GamePostContentDetailDto extends GamePostContentSummaryDto {
  /* 게임 거래글 공통 정보 */

  @IsString()
  @IsOptional()
  content?: string;

  @IsIP()
  @IsOptional()
  ip?: string;

  @IsBoolean()
  isWished: boolean;

  /* 게임 물품(캐릭터 제외) 정보 */

  @IsString()
  @Length(1, 20)
  @IsOptional()
  characterName?: string;

  /* 게임 캐릭터 정보 */

  @IsEnum(EnumGameRegistrationDto)
  @IsOptional()
  registration?: EnumGameRegistrationDto;

  @IsBoolean()
  @IsOptional()
  hasInGamePaymentHistory?: boolean;

  @IsBoolean()
  @IsOptional()
  isDuplicatedSync?: boolean;
}
