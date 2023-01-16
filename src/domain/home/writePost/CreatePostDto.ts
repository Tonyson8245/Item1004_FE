import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Matches,
  Min,
} from "class-validator";

export class CreatePostDtoBody {
  @IsString()
  @Matches(/^[a-zA-Z0-9ㄱ-힣()\[\]'",./\s]+$/)
  title: string;

  @IsString()
  @IsOptional()
  content?: string;

  @IsNumber()
  @Min(1)
  gameIdx: number;

  @IsNumber()
  @Min(1)
  serverIdx: number;

  productType: string;

  postType: string;

  @IsNumber()
  @Min(1)
  @IsOptional()
  saleUnit?: number;

  @IsNumber()
  @Min(1)
  pricePerUnit: number;

  @IsNumber()
  @Min(1)
  @IsOptional()
  maxAmount?: number;

  @IsNumber()
  @Min(1)
  @IsOptional()
  minAmount?: number;

  @IsString()
  @IsOptional()
  @Length(1, 20)
  characterName?: string;

  registration?: string;

  @IsNumber()
  @IsOptional()
  @Min(1)
  roleIdx?: number;

  @IsNumber()
  @IsOptional()
  @Min(1)
  level?: number;

  @IsBoolean()
  @IsOptional()
  hasPaymentHistory?: boolean;

  @IsBoolean()
  @IsOptional()
  isDuplicatedSync?: boolean;

  constructor(
    title: string,
    content: string,
    gameIdx: number,
    serverIdx: number,
    productType: string,
    postType: string,
    saleUnit: number,
    pricePerUnit: number,
    maxAmount: number,
    minAmount: number,
    characterName: string,
    registration: string,
    roleIdx: number,
    level: number,
    hasPaymentHistory: boolean,
    isDuplicatedSync: boolean
  ) {
    this.title = title;
    this.content = content;
    this.gameIdx = gameIdx;
    this.serverIdx = serverIdx;
    this.productType = productType;
    this.postType = postType;
    this.saleUnit = saleUnit;
    this.pricePerUnit = pricePerUnit;
    this.maxAmount = maxAmount;
    this.minAmount = minAmount;
    this.characterName = characterName;
    this.registration = registration;
    this.roleIdx = roleIdx;
    this.level = level;
    this.hasPaymentHistory = hasPaymentHistory;
    this.isDuplicatedSync = isDuplicatedSync;

    if (postType != "character") {
      delete this.characterName;
      delete this.registration;
      delete this.roleIdx;
      delete this.level;
      delete this.hasPaymentHistory;
      delete this.isDuplicatedSync;
    } else {
      delete this.maxAmount;
      delete this.minAmount;
      delete this.saleUnit;
    }
  }
}
