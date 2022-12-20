import { IsNumber, IsString, Min } from "class-validator";

export class GameDto {
  @IsNumber()
  @Min(1)
  idx: number;
  @IsString()
  name: string;
}
