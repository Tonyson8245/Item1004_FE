import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Min,
} from "class-validator";

import { EnumContractLevelDto } from "./enum/EnumContractLevelDto";

export class UserDto {
  @IsNumber()
  @Min(1)
  idx: number;

  @IsString()
  @IsNotEmpty()
  image: string;

  @IsString()
  @Length(2, 15)
  nickname: string;

  @IsBoolean()
  isVerified: boolean;

  // 필수가 아닌 정보. 작성자 상세 정보

  @IsString()
  @Length(10, 10)
  @IsOptional()
  code?: string;

  @IsBoolean()
  @IsOptional()
  isEmailValid?: boolean;

  @IsBoolean()
  @IsOptional()
  isPhoneValid?: boolean;

  @IsBoolean()
  @IsOptional()
  isAccountValid?: boolean;

  @IsEnum(EnumContractLevelDto)
  @IsOptional()
  contractLevelName?: EnumContractLevelDto;

  @IsNumber()
  @Min(0)
  @IsOptional()
  sellPostCount?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  buyPostCount?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  reviewCount?: number;
}
