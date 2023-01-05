import {
  IsArray,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  isString,
  IsString,
  Length,
} from "class-validator";
import type meta from "../../common/meta.interface";

//발송하는 토큰
export class CreateSmsCodeBodyDto {
  @IsNumberString()
  @Length(11, 11)
  @IsNotEmpty()
  phone: string;

  @IsString()
  @Length(2, 44)
  @IsOptional()
  id?: string;
}

export class CreateSmsCodeResponseDto {
  @IsString()
  result: JSON | [];
}

export class checkSMSBodyDto {
  @IsString()
  authid: string;
  @IsString()
  mode: string;
  @IsString()
  code: string;
}
