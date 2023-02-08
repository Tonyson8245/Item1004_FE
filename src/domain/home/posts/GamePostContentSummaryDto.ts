import {
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Min,
} from "class-validator";
import { EnumContractTypeDto } from "../enum/EnumContractTypeDto";
import { EnumProductTypeDto } from "../enum/EnumProductTypeDto";
import { EnumPostStatusDto } from "../enum/EnumPostStatusDto";

export class GamePostContentSummaryDto {
  /* 게임 거래글 공통 정보 */

  @IsNumber()
  @Min(1)
  idx: number;

  @IsEnum(EnumContractTypeDto)
  type: EnumContractTypeDto;

  @IsEnum(EnumProductTypeDto)
  productType: EnumProductTypeDto;

  @IsString()
  @Length(1, 20)
  gameName: string;

  @IsString()
  @Length(1, 20)
  serverName: string;

  @IsEnum(EnumPostStatusDto)
  status: EnumPostStatusDto;

  @IsString()
  @Length(1, 50)
  title: string;

  @IsNumber()
  @Min(0)
  wishCount: number;

  @IsNumber()
  @Min(0)
  chatCount: number;

  @IsNumber()
  @Min(1)
  pricePerUnit: number;

  @IsDate()
  createAt: Date;

  /* 게임 물품(캐릭터 제외) 정보 */

  @IsNumber()
  @Min(1)
  @IsOptional()
  minAmount?: number;

  @IsNumber()
  @Min(1)
  @IsOptional()
  maxAmount?: number;

  @IsNumber()
  @Min(1)
  @IsOptional()
  saleUnit?: number;

  /* 게임 캐릭터 정보 */

  @IsNumber()
  @Min(1)
  @IsOptional()
  level?: number;

  @IsString()
  @Length(1, 10)
  @IsOptional()
  roleName?: string;

  roleIdx: number;
  gameIdx: number;
  serverIdx: number;
}
