import { IsNumber, IsString } from "class-validator";
import type meta from "../common/meta.interface";

export class userPersonalDataResult {
  @IsString()
  name: string;
  @IsString()
  phone: string;
  @IsString()
  contractLevelName: string;
  @IsString()
  code: string;

  constructor(
    name: string,
    phone: string,
    contractLevelName: string,
    code: string
  ) {
    this.name = name;
    this.phone = phone;
    this.contractLevelName = contractLevelName;
    this.code = code;
  }
}

export class userPersonalDataResponse {
  meta: meta;
  result: userPersonalDataResult;
}
